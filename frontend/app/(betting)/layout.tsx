import { MainAppLayout } from "@/components/MainAppLayout";

export default function BettingRoutesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto">
      <MainAppLayout>{children}</MainAppLayout>
    </div>
  );
}
