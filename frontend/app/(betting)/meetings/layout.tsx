export default function MeetingsRoutesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-xl font-bold mb-2 lg:mb-1">Meetings</h1>
      {children}
    </div>
  );
}
