"use client";
import { Breakdown, Pool, RaceStatus } from "@/utils/types";
import { addToast, Card, CardBody, CardHeader, Progress } from "@heroui/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Label,
  Line,
} from "recharts";
import { motion } from "framer-motion";
import PlacePoolBetDrawer from "./PlacePoolBetDrawer";
import { useState } from "react";

type TotePoolProps = {
  pool: Pool;
  raceId: number;
  raceStatus: RaceStatus;
};

// Custom tooltip component
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-[rgba(15,15,25,0.85)] backdrop-blur-lg border border-[var(--color-border)] rounded-[var(--radius-base)] p-4">
        <p className="font-bold text-[var(--color-primary)] line-clamp-2">
          {data.name}
        </p>
        <div className="grid grid-cols-2 gap-2 mt-2">
          <span className="text-gray-400">Liquidity:</span>
          <span className="font-mono text-right">
            {data.liquidity.toLocaleString()}{" "}
            <span className="text-sm">$RACE</span>
          </span>

          <span className="text-gray-400">Implied Odds:</span>
          <span className="font-mono text-right text-[var(--color-secondary)]">
            {data.impliedOdds.toFixed(2)}
          </span>

          <span className="text-gray-400">Pool Share:</span>
          <span className="font-mono text-right">
            {((data.liquidity / data.totalLiquidity) * 100).toFixed(1)}%
          </span>
        </div>
      </div>
    );
  }
  return null;
};

// Custom bar shape with hover effect
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomBarShape = (props: any) => {
  const { fill, x, y, width, height, isActive } = props;

  return (
    <motion.rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill={fill}
      initial={{ opacity: 0.8 }}
      animate={{
        opacity: isActive ? 1 : 0.8,
        filter: isActive ? "drop-shadow(0 0 8px var(--color-primary))" : "none",
      }}
      transition={{ duration: 0.2 }}
      rx={6}
      ry={6}
    />
  );
};

const TotePool = ({ pool, raceId, raceStatus }: TotePoolProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedPool, setSelectedPool] = useState<
    Breakdown & { raceId: number; totalLiquidity: number }
  >();

  const breakdownsWithoutScratched = pool.breakdowns.filter(
    (breakdown) => !breakdown.scratched
  );

  // Prepare chart data with additional context
  const data = breakdownsWithoutScratched.map((breakdown) => {
    return {
      id: breakdown.id,
      name: breakdown.name,
      number: breakdown.number,
      liquidity: breakdown.liquidity,
      impliedOdds: breakdown.impliedOdds,
      totalLiquidity: pool.totalLiquidity,
    };
  });

  // Create a gradient color function
  const getColor = (value: number, maxValue: number) => {
    const ratio = value / maxValue;
    const h = 260 + 40 * ratio; // Purple to blue gradient
    return `hsl(${h}, 70%, 50%)`;
  };

  const maxLiquidity = Math.max(...pool.breakdowns.map((b) => b.liquidity));

  const handleClick = (index: number) => {
    if (raceStatus === "RESULTED") {
      addToast({
        title: "Race Completed!",
        description: "Bets are no longer available for this race",
        size: "md",
      });
    } else {
      setSelectedPool({
        ...breakdownsWithoutScratched[index],
        raceId,
        totalLiquidity: pool.totalLiquidity,
      });
      setIsDrawerOpen(true);
    }
  };

  return (
    <>
      <Card className="bg-[rgba(15,15,25,0.65)] backdrop-blur-lg border border-[var(--color-border)] rounded-[var(--radius-base)]">
        <CardHeader className="pb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 w-full">
            <div>
              <h2 className="text-xl font-bold text-white">
                Tote Pool Liquidity
              </h2>
              <p className="text-sm text-gray-400">
                Distribution of funds across runners
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[var(--color-muted-bg)] p-3 rounded-[var(--radius-base)]">
                <p className="text-xs text-gray-400">Total Liquidity</p>
                <p className="font-mono text-lg text-white">
                  {pool.totalLiquidity.toLocaleString()}{" "}
                  <span className="text-base">$RACE</span>
                </p>
              </div>

              <div className="bg-[var(--color-muted-bg)] p-3 rounded-[var(--radius-base)]">
                <p className="text-xs text-gray-400">Pool Lifetime</p>
                <p className="font-mono text-lg text-[var(--color-secondary)]">
                  {pool.lifeTime.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardBody className="pt-6">
          <div className="h-[56vh] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 60,
                }}
                barSize={40}
                // onClick={(nextState, event) => handleClick({ nextState, event })}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.1)"
                  vertical={false}
                />
                <XAxis
                  dataKey="number"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#a0aec0", fontSize: 12 }}
                  tickMargin={10}
                >
                  <Label
                    value="Runners"
                    position="insideBottom"
                    offset={-40}
                    style={{ fill: "#a0aec0" }}
                  />
                </XAxis>
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#a0aec0" }}
                  tickFormatter={(value) =>
                    new Intl.NumberFormat("en", {
                      notation: "compact",
                      maximumFractionDigits: 1,
                    }).format(value)
                  }
                >
                  <Label
                    value="Liquidity ($RACE)"
                    angle={-90}
                    position="insideLeft"
                    offset={-10}
                    style={{
                      textAnchor: "middle",
                      fill: "#a0aec0",
                    }}
                  />
                </YAxis>
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: "rgba(126, 91, 239, 0.1)" }}
                />
                <Line
                  type="monotone"
                  stroke="rgba(255, 107, 107, 0.6)"
                  strokeDasharray="3 3"
                  y={pool.totalLiquidity}
                  dataKey={"liquidity"}
                />
                <Bar
                  dataKey="liquidity"
                  name="Liquidity"
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  shape={(props: any) => <CustomBarShape {...props} />}
                  onClick={(_, index) => handleClick(index)}
                  className="cursor-pointer"
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={getColor(entry.liquidity, maxLiquidity)}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-2">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Pool Utilization</span>
              <span>{pool.utilization}%</span>
            </div>
            <Progress
              value={pool.utilization}
              classNames={{
                indicator:
                  "bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]",
              }}
              className="h-3 rounded-full bg-[var(--color-muted-bg)]"
            />
          </div>
        </CardBody>
      </Card>
      <PlacePoolBetDrawer
        isOpen={isDrawerOpen}
        setIsOpen={setIsDrawerOpen}
        selectedPool={selectedPool}
      />
    </>
  );
};

export default TotePool;
