// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";

contract Fixed_Betting is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;
    using Math for uint256;

    // state that never changes
    uint8 private _tokenDecimals;
    IERC20 private _token;
    
    struct Bet {
        uint256 stake;
        uint16 odds;
        uint32 selectionId;
        address user;
    }

    // manipulatable state
    mapping (uint32 => Bet) public bets;
    mapping (uint32 => uint8) public selectionPositions; // consider switching to enum Outcome { Unset, Win, Lose, Void } for clarity.

    // Events
    event SelectionOutcomeUpdated(uint32 selectionId, uint8 position);
    event BetPlaced(address indexed user, uint32 betId, uint256 stake, uint16 odds, uint32 selectionId);
    event BetSettled(uint32 indexed betId, address user, string result);

    
    constructor(address initialOwner, address _tokenAddress, uint8 tokenDecimals) Ownable(initialOwner) {
        require(_tokenAddress != address(0), "Token address cannot be zero!");
        _token = IERC20(_tokenAddress);
        _tokenDecimals = tokenDecimals;
    }

    function placeBet(uint32 betId, uint256 stake, uint16 odds, uint32 selectionId) external nonReentrant {
        require (bets[betId].user == address(0), "This bet has already been placed!");
        require(stake > 0, "Stake can not be 0 or less!");
        require(odds > 0 && odds <= 500, "Odds must be greater than 0 and less or equal to 500");

        SafeERC20.safeTransferFrom(_token, msg.sender, address(this), stake * (10 ** _tokenDecimals));
        bets[betId] = Bet({
            stake: stake,
            odds: odds,
            selectionId: selectionId,
            user: msg.sender
        });

        emit BetPlaced(msg.sender, betId, stake, odds, selectionId);
    }

    function setSelectionOutcome(uint32 selectionId, uint8 position) external onlyOwner {
        selectionPositions[selectionId] = position;
        emit SelectionOutcomeUpdated(selectionId, position);
    }

    function settleBet(uint32 betId) external nonReentrant returns (bool success) {
        Bet memory userBet = bets[betId];

        require(userBet.user != address(0), "This bet does not exist");
        require(msg.sender == owner() || msg.sender == userBet.user, "Unauthorized action: you can not payout this bet!");
        require(selectionPositions[userBet.selectionId] != 0, "This selection does not exist or has no outcome set.");

        uint8 selectionPosition = selectionPositions[userBet.selectionId];

        if (selectionPosition > 50) {
            // void: stake is returned
            SafeERC20.safeTransfer(_token, userBet.user, userBet.stake * (10 ** _tokenDecimals));
            emit BetSettled(betId, userBet.user, "Bet voided, stake returned.");
        } else if (selectionPosition == 1) {
            // win: payout bet winnings
            uint256 payoutAmount = calculatePayout(userBet);
            SafeERC20.safeTransfer(_token, userBet.user, payoutAmount);
            emit BetSettled(betId, userBet.user, "Bet won - payout succesful!");
        } else {
        // lose: house keeps stake
            emit BetSettled(betId, userBet.user, "Bet lost");
        }

        delete bets[betId];
        return true;
    }

    function calculatePayout(Bet memory userBet)  view private returns (uint256 payout) {
        uint256 payoutBeforePlatformFee = Math.mulDiv(userBet.stake, userBet.odds, 100);
        uint256 finalPayout = Math.mulDiv(payoutBeforePlatformFee, 99, 100);

        return finalPayout * (10 ** _tokenDecimals);
    }
}