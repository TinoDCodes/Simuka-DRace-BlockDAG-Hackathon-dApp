import DateSelect from "@/components/meetings/DateSelect";
import MeetingsView from "@/components/meetings/MeetingsView";
import moment from "moment";

export default async function MeetingsPage({
  searchParams,
}: {
  searchParams: Promise<{ date: string; page: string }>;
}) {
  const { date, page } = await searchParams;

  const selectedDate = moment(date).isValid()
    ? moment(date).toDate()
    : moment().toDate();

  const selectedDateFormatted =
    moment(selectedDate).format("dddd, MMMM D, YYYY");

  return (
    <div className="w-full h-full grow flex flex-col items-center space-y-2">
      <div className="w-fit py-1 px-3 border border-accent/15 rounded-xl text-xs text-accent">
        {selectedDateFormatted}
      </div>

      <DateSelect date={selectedDate} />
      <MeetingsView date={date} page={page} />
    </div>
  );
}
