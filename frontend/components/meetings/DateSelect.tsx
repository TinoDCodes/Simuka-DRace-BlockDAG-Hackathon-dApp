"use client";
import { DatePicker } from "@heroui/react";
import { CustomButton } from "../ui/CustomButton";
import { useRouter } from "next/navigation";
import { CalendarDate, parseDate } from "@internationalized/date";
import moment from "moment";

type DateSelectProps = {
  date?: string;
};

const DateSelect = ({ date }: DateSelectProps) => {
  const router = useRouter();

  // Get current date without time
  const today = moment();

  // Get yesterday's date
  const yesterday = moment().subtract(1, "days");

  // Check date comparisons
  const isToday = date ? today.isSame(moment(date), "day") : true;
  const isYesterday = date ? yesterday.isSame(moment(date), "day") : false;

  const handlePickDate = (choosenDate: CalendarDate | null) => {
    if (!choosenDate) return;

    const formattedDate = `${choosenDate.year}-${choosenDate.month
      .toString()
      .padStart(2, "0")}-${choosenDate.day.toString().padStart(2, "0")}`;
    router.push(`/meetings?date=${formattedDate}`);
  };

  return (
    <div className="min-w-full flex">
      <section className="flex items-center mx-auto md:mx-0  md:ml-auto space-x-2">
        <CustomButton
          color="date"
          size="sm"
          isDisabled={isYesterday}
          onClick={() =>
            router.push(`/meetings?date=${yesterday.format("YYYY-MM-DD")}`)
          }
        >
          Yesterday
        </CustomButton>

        <CustomButton
          color="date"
          size="sm"
          isDisabled={isToday}
          onClick={() =>
            router.push(`/meetings?date=${today.format("YYYY-MM-DD")}`)
          }
        >
          Today
        </CustomButton>

        <DatePicker
          aria-label="Pick a date"
          value={parseDate(moment(date).format("YYYY-MM-DD"))}
          onChange={(chosenDate) => handlePickDate(chosenDate)}
          showMonthAndYearPickers
          size="sm"
          variant="bordered"
          className="w-fit lg:w-40"
        />
      </section>
    </div>
  );
};

export default DateSelect;
