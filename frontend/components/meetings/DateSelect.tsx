"use client";
import { DatePicker } from "@heroui/react";
import { CustomButton } from "../ui/CustomButton";
import { useRouter } from "next/navigation";
import { CalendarDate, parseDate } from "@internationalized/date";

type DateSelectProps = {
  date: Date;
};

const DateSelect = ({ date }: DateSelectProps) => {
  const router = useRouter();

  // Get current date without time
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Get yesterday's date
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // Normalize input date (remove time component)
  const normalizedDate = new Date(date);
  normalizedDate.setHours(0, 0, 0, 0);

  // Check date comparisons
  const isToday = normalizedDate.getTime() === today.getTime();
  const isYesterday = normalizedDate.getTime() === yesterday.getTime();

  const handlePickDate = (choosenDate: CalendarDate | null) => {
    if (!choosenDate) return;

    const utcDate = new Date(
      choosenDate.year,
      choosenDate.month - 1,
      choosenDate.day
    ).toUTCString();
    router.push(`/meetings?date=${utcDate}`);
  };

  return (
    <div className="min-w-full flex">
      <section className="flex items-center mx-auto md:mx-0  md:ml-auto space-x-2">
        <CustomButton
          color="date"
          size="sm"
          isDisabled={isYesterday}
          onClick={() =>
            router.push(`/meetings?date=${yesterday.toUTCString()}`)
          }
        >
          Yesterday
        </CustomButton>

        <CustomButton
          color="date"
          size="sm"
          isDisabled={isToday}
          onClick={() => router.push(`/meetings?date=${today.toUTCString()}`)}
        >
          Today
        </CustomButton>

        <DatePicker
          aria-label="Pick a date"
          value={getParsedDate(date)}
          onChange={(choosenDate) => handlePickDate(choosenDate)}
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

/** Parse date string to Date for DatePicker */
const getParsedDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return parseDate(`${year}-${month}-${day}`);
};
