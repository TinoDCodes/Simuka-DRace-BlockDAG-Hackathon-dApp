import { RaceStatus, Runner } from "@/utils/types";
import {
  Table,
  TableBody,
  TableColumn,
  TableHeader,
  TableRow,
  TableCell,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Chip,
} from "@heroui/react";
import { InfoIcon } from "lucide-react";
import PlaceFixedBetDrawer from "./PlaceFixedBetDrawer";

type FixedOddsProps = {
  raceId: number;
  raceStatus: RaceStatus;
  runners: Runner[];
};

const FixedOdds = ({ runners, raceStatus, raceId }: FixedOddsProps) => {
  return (
    <Table
      aria-label="Fixed Odds Table"
      removeWrapper
      className="w-full grow overflow-x-auto"
      classNames={{ wrapper: "overflow-x-auto", th: "bg-primary/10" }}
    >
      <TableHeader>
        <TableColumn width="50%" className="min-w-56">
          Runner
        </TableColumn>
        <TableColumn className="text-center">Weight (kg)</TableColumn>
        <TableColumn className="text-center">Barrier</TableColumn>
        <TableColumn className="text-center">Win Odds</TableColumn>
      </TableHeader>

      <TableBody items={runners} emptyContent="No runners found">
        {(runner) => (
          <TableRow
            key={runner.id}
            textValue={runner.name}
            className={`${runner.scratched ? "opacity-50" : ""}`}
          >
            {/* Runner + Jockey + Info */}
            <TableCell>
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center text-lg font-medium text-white/80">
                  {runner.Number}
                </div>
                <div>
                  <p className="font-medium line-clamp-2 text-nowrap">
                    {runner.name}
                  </p>
                  <p className="text-sm text-slate-400 text-nowrap">
                    {runner.jockey}
                  </p>
                </div>

                <Popover placement="right">
                  <PopoverTrigger className="hover:cursor-pointer ml-4">
                    <InfoIcon className="w-5 h-5 text-slate-500 hover:text-slate-300" />
                  </PopoverTrigger>

                  <PopoverContent className="w-fit px-4 py-2 bg-slate-700/80 text-white rounded-lg shadow-lg">
                    <p className="text-sm font-bold">
                      Trainer:{" "}
                      <span className="font-medium">{runner.trainer}</span>
                    </p>
                  </PopoverContent>
                </Popover>

                {runner.finalPosition > 0 && (
                  <Chip
                    isDisabled
                    className={`ml-auto font-medium px-4 ${
                      runner.finalPosition === 1
                        ? "bg-green-accent/30 opacity-100"
                        : "bg-accent/20 opacity-80"
                    } text-white `}
                  >
                    {runner.finalPosition}
                  </Chip>
                )}
              </div>
            </TableCell>

            {/* Weight */}
            <TableCell className="text-center">
              <span className="font-medium">
                {runner.weight ? runner.weight.toFixed(1) : "-"}
              </span>
            </TableCell>

            {/* Barrier */}
            <TableCell className="text-center">
              <span className="font-medium">{runner.barrier}</span>
            </TableCell>

            {/* Win Odds */}
            <TableCell className="text-center">
              <PlaceFixedBetDrawer
                raceId={raceId}
                isDisabled={runner.scratched}
                isRaceResulted={raceStatus !== "OPEN"}
                runner={runner}
              />
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default FixedOdds;
