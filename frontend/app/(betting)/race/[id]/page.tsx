"use client";

import FixedOdds from "@/components/race/FixedOdds";
import TotePool from "@/components/race/TotePool";
import { Badge, Button, Tabs, Tab } from "@heroui/react";

export default function RacePage() {
  // — Dummy data for design preview —
  const race = {
    id: "1",
    status: "open",
    raceNumber: 1,
    time: "11:45 AM",
    distance: 1000,
    name: "Kenilworth Sprint Challenge",
    runners: [
      {
        id: "1",
        name: "Cape Storm",
        jockey: "Jockey K",
        trainer: "Trainer D",
        barrier: 1,
        Number: 6,
        weight: 53.5,
        winOdds: 3.0,
        finalPosition: -1,
      },
      {
        id: "2",
        name: "Desert Rose",
        jockey: "Jockey L",
        trainer: "Trainer E",
        barrier: 3,
        Number: 4,
        weight: 55.0,
        winOdds: 3.7,
        finalPosition: -1,
      },
    ],
    pool: {
      totalLiquidity: 9400,
      LifeTime: 4200,
      breakdowns: [
        { id: "1", impliedOdds: 3.0, liquidity: 2100 },
        { id: "2", impliedOdds: 3.7, liquidity: 2100 },
      ],
    },
  };

  const statusColor: Record<string, "success" | "warning" | "danger"> = {
    open: "success",
    pending: "warning",
    settled: "danger",
  };

  return (
    <div className="h-full flex-grow bg-slate-900/40 text-slate-50 p-4 md:p-6 rounded-2xl">
      {/* HEADER */}
      <header className="flex items-center mb-4 lg:mb-6">
        <Button
          variant="ghost"
          size="sm"
          className="hidden lg:block text-slate-400 hover:text-slate-200"
        >
          {/* <ChevronLeftIcon className="w-6 h-6" /> */}
        </Button>
        <div className="ml-4">
          <h1 className="text-xl lg:text-2xl font-bold line-clamp-2">{`Race ${race.raceNumber}: ${race.name}`}</h1>
          <div className="flex items-center space-x-3 mt-1">
            <Badge color={statusColor[race.status]} size="sm" content="">
              <p className="uppercase text-xs p-1">{race.status}</p>
            </Badge>
            <span className="text-sm text-slate-400">
              {race.time} &bull; {race.distance}m
            </span>
          </div>
        </div>
      </header>

      <Tabs
        aria-label="Race Tabs"
        variant="light"
        color="secondary"
        className="mt-2"
        classNames={{
          tab: "text-sm font-semibold border border-secondary/15",
          tabContent: "group-data-[selected=true]:text-black",
        }}
      >
        <Tab key="fixed" title="Fixed Odds">
          <FixedOdds />
        </Tab>
        <Tab key="tote" title="TOTE Pool">
          <TotePool />
        </Tab>
      </Tabs>

      {/* POOL */}
      {/* <section>
        <Card className="bg-slate-800 shadow-lg rounded-2xl">
          <CardHeader>
            <h2 className="text-xl font-semibold">Tote Pool</h2>
            <p className="text-sm text-slate-400">
              Total Liquidity: {race.pool.totalLiquidity.toLocaleString()} RACE
            </p>
          </CardHeader>

          <CardBody>
            <Progress
              value={(race.pool.LifeTime / race.pool.totalLiquidity) * 100}
              //   showValue={false}
              className="h-2 rounded-full bg-slate-700"
            />
            <div className="mt-4 space-y-2">
              {race.pool.breakdowns.map((bd) => (
                <div
                  key={bd.id}
                  className="flex justify-between text-sm text-slate-200"
                >
                  <span>Runner {bd.id}</span>
                  <span>
                    {bd.impliedOdds.toFixed(1)} ({bd.liquidity.toLocaleString()}
                    )
                  </span>
                </div>
              ))}
            </div>
          </CardBody>

          <CardFooter>
            <Button className="w-full py-3 bg-emerald-500 text-slate-900">
              Place Tote Bet
            </Button>
          </CardFooter>
        </Card>
      </section> */}
    </div>
  );
}
