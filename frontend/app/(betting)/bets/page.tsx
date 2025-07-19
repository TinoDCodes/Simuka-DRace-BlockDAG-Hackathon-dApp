"use client";

import WalletConnectionPrompt from "@/components/WalletConnectPrompt";
import { useWalletBets } from "@/hooks/user-bets";
import { useAccount } from "wagmi";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Chip,
  Button,
  Tabs,
  Tab,
  Spinner,
  Tooltip,
} from "@heroui/react";
import { RefreshCw, Info, Calendar, Coins, Link } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import moment from "moment";

// Status chip configuration
const statusConfig: Record<number, { label: string; color: string }> = {
  0: { label: "Pending", color: "warning" },
  1: { label: "Accepted", color: "success" },
  2: { label: "Rejected", color: "danger" },
  3: { label: "Cancelled", color: "default" },
  4: { label: "Settled", color: "success" },
  5: { label: "Void", color: "default" },
  6: { label: "Suspended", color: "warning" },
  7: { label: "In Play", color: "primary" },
  8: { label: "Inactive", color: "default" },
};

// Bet type configuration
const betTypeConfig: Record<number, { label: string; icon: React.ReactNode }> =
  {
    0: { label: "Fixed Odds", icon: <Coins size={14} /> },
    1: { label: "Liquidity Pool", icon: <Coins size={14} /> },
  };

export default function BetsPage() {
  const { isConnected, address, chain } = useAccount();
  const { bets, isLoading, isError, error, refetch } = useWalletBets();
  const [activeTab, setActiveTab] = useState("all");

  // Filter bets based on active tab
  const filteredBets =
    bets?.filter((bet) => {
      if (activeTab === "all") return true;
      if (activeTab === "active") return bet.status === 7 || bet.status === 1;
      if (activeTab === "settled") return bet.status === 4;
      return true;
    }) || [];

  if (!isConnected || !address) return <WalletConnectionPrompt />;

  if (isLoading) {
    return (
      <div className="flex-grow h-full w-full flex flex-col items-center justify-center">
        <Spinner size="lg" className="text-white" />
        <p className="text-primary  text-xl font-mono mt-4">Loading Bets...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-[rgba(15,15,25,0.65)] backdrop-blur-lg border border-[var(--color-border)] rounded-[var(--radius-base)] p-8 text-center"
      >
        <div className="text-[var(--color-accent)] text-xl mb-3">
          Error Loading Bets
        </div>
        <p className="text-gray-400 mb-6">
          {error?.message || "Failed to fetch your betting history"}
        </p>
        <Button
          className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary)]/80 text-[#14161A]"
          onPress={() => refetch()}
        >
          Try Again
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col grow">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-3xl font-bold text-white">My Bets</h1>
          <p className="text-gray-400 mt-2">
            View your betting history and current positions
          </p>
        </motion.div>

        <div className="flex gap-3">
          <Button
            className="bg-[var(--color-muted-bg)] text-[var(--foreground)] border border-[var(--color-border)] hover:bg-[var(--color-primary)]/10"
            startContent={<RefreshCw size={16} />}
            onPress={() => refetch()}
            isDisabled={isLoading}
          >
            Refresh
          </Button>
        </div>
      </div>

      {/* Status Tabs */}
      <Tabs
        selectedKey={activeTab}
        color="primary"
        onSelectionChange={(key) => setActiveTab(key as string)}
        className="mb-6"
        classNames={{
          tab: "data-[selected=true]:text-[var(--color-primary)]",
        }}
      >
        <Tab key="all" title="All Bets" />
        <Tab key="active" title="Active" />
        <Tab key="settled" title="Settled" />
      </Tabs>

      {filteredBets.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-16 bg-[rgba(15,15,25,0.65)] backdrop-blur-lg border border-[var(--color-border)] rounded-[var(--radius-base)] text-center"
        >
          <div className="bg-[var(--color-primary)]/10 p-4 rounded-full mb-4">
            <Info className="w-8 h-8 text-[var(--color-primary)]" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No Bets Found</h3>
          <p className="text-gray-400 max-w-md">
            {activeTab === "all"
              ? "You haven't placed any bets yet. Place your first bet to get started!"
              : `You don't have any ${
                  activeTab === "active" ? "active" : "settled"
                } bets at the moment.`}
          </p>
          <Button
            className="mt-6 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary)]/80 text-[#14161A]"
            onPress={() => (window.location.href = "/meetings")}
          >
            Browse Races
          </Button>
        </motion.div>
      ) : (
        <div className="bg-[rgba(15,15,25,0.65)] backdrop-blur-lg border border-[var(--color-border)] rounded-[var(--radius-base)] overflow-hidden">
          <Table
            aria-label="User Bets"
            removeWrapper
            color="secondary"
            className="w-full"
            classNames={{
              th: "bg-[var(--color-muted-bg)] text-gray-400 font-medium text-sm",
              td: "py-4 px-6 border-b border-[var(--color-border)]",
              tr: "hover:bg-[var(--color-muted-bg)]/30 transition-colors",
            }}
          >
            <TableHeader>
              <TableColumn className="text-sm font-medium text-gray-400 w-[25%]">
                Event
              </TableColumn>
              <TableColumn className="text-sm font-medium text-gray-400 w-[15%]">
                Selection
              </TableColumn>
              <TableColumn className="text-sm font-medium text-gray-400">
                Stake
              </TableColumn>
              <TableColumn className="text-sm font-medium text-gray-400">
                Odds
              </TableColumn>
              <TableColumn className="text-sm font-medium text-gray-400">
                Type
              </TableColumn>
              <TableColumn className="text-sm font-medium text-gray-400">
                Date
              </TableColumn>
              <TableColumn className="text-sm font-medium text-gray-400">
                Status
              </TableColumn>
            </TableHeader>

            <TableBody
              emptyContent={
                <div className="py-6 text-center text-sm text-gray-400">
                  No bets to show
                </div>
              }
            >
              {filteredBets.map((bet) => (
                <TableRow key={bet.id}>
                  <TableCell>
                    <div className="font-medium text-white line-clamp-1">
                      {bet.eventDetails}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-white line-clamp-1">
                      {bet.selectionDetails}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-mono text-white">
                      {getStakeDisplayValue(bet.stake)} $RACE
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-mono text-[var(--color-secondary)]">
                      {bet.betType === 0 ? bet.odds.toFixed(2) : "Pool"}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Chip
                      size="sm"
                      variant="flat"
                      className="bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                      startContent={betTypeConfig[bet.betType].icon}
                    >
                      {betTypeConfig[bet.betType].label}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-gray-400 text-sm">
                      <Calendar className="w-4 h-4 mr-2" />
                      {moment(bet.placedAtUtc).format("DD MMM YYYY")}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Tooltip
                      content="Click to view on block explorer"
                      showArrow
                    >
                      <Button
                        size="sm"
                        variant="flat"
                        radius="full"
                        endContent={
                          bet.strikeTxnId || bet.settlementTxnId ? (
                            <Link className="w-3 h-3" />
                          ) : null
                        }
                        className={`bg-${
                          statusConfig[bet.status].color
                        } disabled:opacity-75 disabled:text-white w-[85%]`}
                        isDisabled={!bet.strikeTxnId && !bet.settlementTxnId}
                        onPress={() => {
                          const txId = bet.settlementTxnId || bet.strikeTxnId;

                          if (txId && chain?.blockExplorers?.default.url) {
                            window.open(
                              `${chain.blockExplorers.default.url}/tx/${txId}`,
                              "_blank"
                            );
                          }
                        }}
                      >
                        {statusConfig[bet.status].label}
                      </Button>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Stats Summary */}
      {!isLoading && !isError && filteredBets.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div className="bg-[rgba(15,15,25,0.65)] backdrop-blur-lg border border-[var(--color-border)] rounded-[var(--radius-base)] p-4">
            <div className="text-gray-400">Total Bets</div>
            <div className="text-2xl font-bold text-white">{bets?.length}</div>
          </div>

          <div className="bg-[rgba(15,15,25,0.65)] backdrop-blur-lg border border-[var(--color-border)] rounded-[var(--radius-base)] p-4">
            <div className="text-gray-400">Total Stake</div>
            <div className="text-2xl font-bold text-white">
              {getStakeDisplayValue(
                bets!.reduce((sum, bet) => sum + bet.stake, 0)
              )}{" "}
              $RACE
            </div>
          </div>

          <div className="bg-[rgba(15,15,25,0.65)] backdrop-blur-lg border border-[var(--color-border)] rounded-[var(--radius-base)] p-4">
            <div className="text-gray-400">Active Bets</div>
            <div className="text-2xl font-bold text-[var(--color-primary)]">
              {
                bets?.filter((bet) => bet.status === 7 || bet.status === 1)
                  .length
              }
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

const getStakeDisplayValue = (stake: number) => {
  return (stake / 100).toFixed(2);
};
