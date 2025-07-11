"use client";

import { Badge, Tab, Tabs } from "@heroui/react";
import { useRaceData } from "./RaceData";
import FixedOdds from "./FixedOdds";
import TotePool from "./TotePool";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from "lucide-react";
import { CustomButton } from "../ui/CustomButton";
import LoadingOverlay from "../LoadingOverlay";
import ErrorDisplay from "../ErrorDisplay";

type RaceViewProps = {
  raceId: string;
};

const RaceView = ({ raceId }: RaceViewProps) => {
  const router = useRouter();
  const { raceData, isLoading, isError, error, errorUpdatedAt, failureCount } =
    useRaceData(raceId);

  if (isLoading && failureCount < 1) {
    return <LoadingOverlay />;
  }

  if (isError) {
    return (
      <ErrorDisplay
        title="Error"
        message={
          error?.message ??
          "There was an unexpected error while loading the race data."
        }
        errorCode={error?.cause as string}
        lastUpdatedAt={errorUpdatedAt}
      />
    );
  }

  if (!raceData) {
    return <div>No race data found</div>;
  }

  return (
    <div className="h-full flex flex-col flex-grow bg-slate-900/40 text-slate-50 p-4 md:p-6 rounded-2xl">
      {/* HEADER */}
      <header className="flex items-center mb-4 lg:mb-6">
        <CustomButton
          color="clear"
          size="sm"
          onClick={() => router.back()}
          className="hidden lg:flex text-slate-400"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </CustomButton>
        <div className="ml-4">
          <h1 className="text-xl lg:text-2xl font-bold line-clamp-2">{`Race ${raceData.raceNumber}: ${raceData.name}`}</h1>
          <div className="flex items-center space-x-3 mt-1">
            <Badge
              color={
                raceData.status === "Open"
                  ? "success"
                  : raceData.status === "Pending"
                  ? "warning"
                  : "danger"
              }
              size="sm"
              content=""
            >
              <p className="uppercase text-xs p-1">{raceData.status}</p>
            </Badge>
            <span className="text-sm text-slate-400">
              {raceData.time} &bull; {raceData.distance}m
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
        <Tab key="fixed" title="Fixed Odds" className="grow flex flex-col">
          <FixedOdds runners={raceData.runners} />
        </Tab>
        <Tab key="tote" title="TOTE Pool" className="grow flex flex-col">
          <TotePool pool={raceData.pool} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default RaceView;
