import DateSelect from "@/components/meetings/DateSelect";
import MeetingsView from "@/components/meetings/MeetingsView";
import moment from "moment";

export default async function MeetingsPage({
  searchParams,
}: {
  searchParams: Promise<{ date: string }>;
}) {
  const { date } = await searchParams;

  const selectedDate = moment(date).isValid()
    ? moment(date).toDate()
    : moment().toDate();

  const selectedDateFormatted =
    moment(selectedDate).format("dddd, MMMM D, YYYY");

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-fit py-1 px-3 border border-accent/15 rounded-xl text-xs text-accent mb-4">
        {selectedDateFormatted}
      </div>

      <DateSelect date={selectedDate} />
      <MeetingsView date={date} />
    </div>
  );
}
