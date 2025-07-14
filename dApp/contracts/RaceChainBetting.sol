// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";

contract RaceChainBetting is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;
    using Math for uint256;

    // immutable state
    uint8 private _tokenDecimals;
    IERC20 private _token;
    uint8 private constant oddsScalingfactor = 100;
    
    struct FixedBet {
        uint256 stake;
        uint16 odds;
        uint32 selectionId;
        address user;
    }

    // mutable state
    mapping (uint32 => FixedBet) public fixedBets;
    mapping (uint32 => uint8) public fixedSelectionPositions; // consider switching to enum Outcome { Unset, Win, Lose, Void } for clarity.

    // Events
    event FixedSelectionOutcomeUpdated(uint32 selectionId, uint8 position);
    event FixedBetPlaced(address indexed user, uint32 betId, uint256 stake, uint16 odds, uint32 selectionId);
    event FixedBetSettled(uint32 indexed betId, address user, string result);

    
    constructor(address initialOwner, address _tokenAddress, uint8 tokenDecimals) Ownable(initialOwner) {
        require(_tokenAddress != address(0), "Token address cannot be zero!");
        _token = IERC20(_tokenAddress);
        _tokenDecimals = tokenDecimals;
    }

    function placeFixedBet(uint32 betId, uint256 stake, uint16 odds, uint32 selectionId) external nonReentrant {
        require (fixedBets[betId].user == address(0), "This bet has already been placed!");
        require(stake > 0, "Stake can not be 0 or less!");
        require(odds > 100 && odds <= 50000, "Odds must be greater than 0 and less or equal to 500");

        fixedBets[betId] = FixedBet({
            stake: stake,
            odds: odds,
            selectionId: selectionId,
            user: msg.sender
        });
        SafeERC20.safeTransferFrom(_token, msg.sender, address(this), stake);

        emit FixedBetPlaced(msg.sender, betId, stake, odds, selectionId);
    }

    function setFixedSelectionOutcome(uint32 selectionId, uint8 position) external onlyOwner {
        fixedSelectionPositions[selectionId] = position;
        emit FixedSelectionOutcomeUpdated(selectionId, position);
    }

    function settleFixedBet(uint32 betId) external nonReentrant returns (bool success) {
        FixedBet memory userBet = fixedBets[betId];

        require(userBet.user != address(0), "This bet does not exist");
        require(msg.sender == owner() || msg.sender == userBet.user, "Unauthorized action: you can not payout this bet!");
        require(fixedSelectionPositions[userBet.selectionId] != 0, "This selection does not exist or has no outcome set.");

        uint8 selectionPosition = fixedSelectionPositions[userBet.selectionId];

        if (selectionPosition > 50) {
            // void: stake is returned
            delete fixedBets[betId];
            SafeERC20.safeTransfer(_token, userBet.user, userBet.stake);
            emit FixedBetSettled(betId, userBet.user, "Bet voided, stake returned.");
        } else if (selectionPosition == 1) {
            // win: payout bet winnings
            delete fixedBets[betId];
            uint256 payoutAmount = calculatePayout(userBet.stake, userBet.odds);
            SafeERC20.safeTransfer(_token, userBet.user, payoutAmount);
            emit FixedBetSettled(betId, userBet.user, "Bet won - payout succesful!");
        } else {
            // lose: house keeps stake
            delete fixedBets[betId];
            emit FixedBetSettled(betId, userBet.user, "Bet lost");
        }

        return true;
    }

    function calculatePayout(uint256 stake, uint16 odds)   private pure returns (uint256 payout) {
        uint256 finalPayout = Math.mulDiv(stake, odds, oddsScalingfactor);

        return finalPayout;
    }

    function clearFixedSelectionPosition(uint32 selectionId) external onlyOwner {
        require(fixedSelectionPositions[selectionId] > 0, "This selection does not exist");
        delete fixedSelectionPositions[selectionId];
    }
}