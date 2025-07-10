import { Pool } from "@/utils/types";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Progress,
} from "@heroui/react";

type TotePoolProps = {
  pool: Pool;
};

const TotePool = ({ pool }: TotePoolProps) => {
  return (
    <Card className="bg-[rgba(15,15,25,0.65)] border border-[var(--color-border)] backdrop-blur-lg rounded-[var(--radius-base)] grow h-full">
      <CardHeader className="border-b border-[var(--color-border)]">
        <div className="flex justify-between items-center w-full">
          <div>
            <h2 className="text-xl font-bold text-white">Tote Pool</h2>
            <p className="text-sm text-[var(--color-secondary)] mt-1">
              Decentralized Liquidity Pool
            </p>
          </div>
          <div className="bg-green-accent/10 px-3 py-1 rounded-full text-green-accent font-mono text-sm">
            {pool.totalLiquidity.toLocaleString()} RACE
          </div>
        </div>
      </CardHeader>

      <CardBody className="py-6">
        {/* Liquidity progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Pool Utilization</span>
            <span>
              {Math.round((pool.LifeTime / pool.totalLiquidity) * 100)}%
            </span>
          </div>
          <Progress
            value={(pool.LifeTime / pool.totalLiquidity) * 100}
            classNames={{
              indicator:
                "bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]",
            }}
            className="h-2 rounded-full bg-[var(--color-muted-bg)]"
          />
        </div>

        {/* Runners breakdown */}
        <div className="space-y-3">
          <div className="grid grid-cols-3 text-xs text-gray-400 uppercase tracking-wider mb-1">
            <span>Runner</span>
            <span className="text-center">Implied Odds</span>
            <span className="text-right">Liquidity</span>
          </div>

          {pool.breakdowns.map((bd) => (
            <div
              key={bd.id}
              className="grid grid-cols-3 items-center py-2 px-3 bg-[var(--color-muted-bg)] rounded-[var(--radius-base)]"
            >
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-[var(--color-primary)] mr-2"></div>
                <span className="text-white font-medium">#{bd.id}</span>
              </div>
              <div className="text-center font-mono text-accent">
                {bd.impliedOdds.toFixed(1)}
              </div>
              <div className="text-right font-mono">
                <span className="text-white">
                  {bd.liquidity.toLocaleString()}
                </span>
                <span className="text-gray-500 text-xs ml-1">RACE</span>
              </div>
            </div>
          ))}
        </div>
      </CardBody>

      <CardFooter>
        <Button className="w-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary)]/80 hover:from-[var(--color-primary-hover)] hover:to-[var(--color-primary-hover)]/80 text-[#14161A] font-medium font-mono shadow-lg shadow-[var(--color-primary)]/20 transition-all duration-300 py-3">
          Place Tote Bet
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TotePool;
