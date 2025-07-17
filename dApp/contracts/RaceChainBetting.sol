// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";

/**
 * @title On-Chain Race Betting
 * @author Simuka Solutions
 * @notice A decentralized betting contract where users can place bets on race selections,
 *         and get paid based on fixed odds or AI optimized liquidity pools once the outcomes are revealed.
 * @dev Uses SafeERC20 for safe token transfers, ReentrancyGuard for security,
 *      and OpenZeppelin's Ownable for admin privileges.
 */
contract RaceChainBetting is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;
    using Math for uint256;

    // Immutable token metadata
    uint8 private _tokenDecimals;
    IERC20 private _token;

    /// @dev Odds scaling factor to handle fixed-point logic for decimal odds (e.g., 250 = 2.5x)
    uint8 private constant oddsScalingfactor = 100;

    /// @dev Structure representing a placed bet
    struct Bet {
        uint256 stake;        // Amount staked in token units
        uint16 odds;          // Fixed odds at the time of placing bet (scaled by oddsScalingfactor)
        uint32 selectionId;   // ID of the selection being bet on
        address user;         // Address of the bettor
    }

    /// @dev Structure representing the outcome of a selection
    struct SelectionOutcome {
        uint8 position;       // Final position (1 = win, >1 = loss, >50 = void)
        uint16 impliedOdds;   // Implied odds for pool bets
    }

    // === State Variables ===

    /// @notice Mapping of betId to Bet struct
    mapping (uint32 => Bet) public bets;

    /// @notice Mapping of selectionId to its final outcome
    mapping (uint32 => SelectionOutcome) public selectionOutcomes;

    // === Events ===

    /// @notice Emitted when a selection's outcome is recorded
    event SelectionOutcomeUpdated(uint32 indexed selectionId, uint8 position, uint16 impliedOdds);

    /// @notice Emitted when a user places a bet
    event BetPlaced(address indexed user, uint32 indexed betId, uint256 stake, uint16 odds, uint32 selectionId);

    /// @notice Emitted when a bet is settled
    event BetSettled(uint32 indexed betId, address indexed user, string result);

    // === Constructor ===

    /**
     * @notice Initializes the contract with ERC20 token and owner
     * @param initialOwner Address of the contract owner
     * @param _tokenAddress Address of the ERC20 token used for betting
     * @param tokenDecimals Decimal precision of the token
     */
    constructor(address initialOwner, address _tokenAddress, uint8 tokenDecimals) Ownable(initialOwner) {
        require(_tokenAddress != address(0), "Token address cannot be zero!");
        _token = IERC20(_tokenAddress);
        _tokenDecimals = tokenDecimals;
    }

    // === Public & External Functions ===

    /**
     * @notice Allows users to place a bet on a specific selection
     * @param betId Unique identifier for the bet
     * @param stake Amount of tokens being staked
     * @param odds Fixed odds (scaled by 100) at which the user is placing the bet
     * @param selectionId The ID of the selection the user is betting on
     */
    function placeBet(uint32 betId, uint256 stake, uint16 odds, uint32 selectionId) external nonReentrant {
        require(bets[betId].user == address(0), "This bet has already been placed!");
        require(stake > 0, "Stake cannot be zero!");
        require(odds > 100 && odds <= 50000, "Odds must be > 1.00x and <= 500.00x");

        bets[betId] = Bet({
            stake: stake,
            odds: odds,
            selectionId: selectionId,
            user: msg.sender
        });

        // Transfer the stake from user to contract
        _token.safeTransferFrom(msg.sender, address(this), stake);

        emit BetPlaced(msg.sender, betId, stake, odds, selectionId);
    }

    /**
     * @notice Sets the final outcome for a given selection (admin only)
     * @param selectionId ID of the selection
     * @param position Final position (1 = win, >1 = lose, >50 = void)
     * @param impliedOdds Odds to use for pool bets (0 for no custom odds)
     */
    function setSelectionOutcome(uint32 selectionId, uint8 position, uint16 impliedOdds) external onlyOwner {
        selectionOutcomes[selectionId] = SelectionOutcome(position, impliedOdds);
        emit SelectionOutcomeUpdated(selectionId, position, impliedOdds);
    }

    /**
     * @notice Allows owner or bettor to settle a bet after selection outcome is known
     * @param betId ID of the bet to settle
     * @return success Whether the bet was successfully settled
     */
    function settleBet(uint32 betId) external nonReentrant returns (bool success) {
        Bet memory userBet = bets[betId];

        require(userBet.user != address(0), "This bet does not exist");
        require(msg.sender == owner() || msg.sender == userBet.user, "Unauthorized: only owner or bettor can settle");
        require(selectionOutcomes[userBet.selectionId].position != 0, "Outcome not set for this selection");

        uint8 selectionPosition = selectionOutcomes[userBet.selectionId].position;

        if (selectionPosition > 50) {
            // Void: Return stake to user
            delete bets[betId];
            _token.safeTransfer(userBet.user, userBet.stake);
            emit BetSettled(betId, userBet.user, "Bet voided, stake returned.");
        } else if (selectionPosition == 1) {
            // Win: Calculate payout and transfer
            delete bets[betId];
            uint16 stakeFactoredOdds = userBet.odds;

            if (stakeFactoredOdds == 0) {
                stakeFactoredOdds = selectionOutcomes[userBet.selectionId].impliedOdds; // this is a pool bet optimized by AI
            }

            uint256 payoutAmount = calculatePayout(userBet.stake, stakeFactoredOdds);
            _token.safeTransfer(userBet.user, payoutAmount);

            emit BetSettled(betId, userBet.user, "Bet won - payout successful!");
        } else {
            // Lose: No refund, house takes the profits
            delete bets[betId];
            emit BetSettled(betId, userBet.user, "Bet lost");
        }

        return true;
    }

    /**
     * @notice Allows admin to clear a selection's recorded outcome
     * @param selectionId The ID of the selection to clear
     */
    function clearSelectionOutcome(uint32 selectionId) external onlyOwner {
        require(selectionOutcomes[selectionId].position > 0, "Selection outcome not set");
        delete selectionOutcomes[selectionId];
    }

    // === Internal & Private ===

    /**
     * @notice Internal function to calculate payout based on stake and odds
     * @param stake Amount staked
     * @param odds Odds in fixed-point format (e.g., 250 = 2.5x)
     * @return payout Final calculated payout
     */
    function calculatePayout(uint256 stake, uint16 odds) private pure returns (uint256 payout) {
        return Math.mulDiv(stake, odds, oddsScalingfactor);
    }
}
