import { MainAppLayout } from "@/components/MainAppLayout";

export default function BettingRoutesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <MainAppLayout>{children}</MainAppLayout>
    </div>
  );
}
