import DashboardNavbar from "@/components/DashboardNavbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F7F7FB]">
      <DashboardNavbar />
      <main className="pt-24 px-6">
        {children}
      </main>
    </div>
  );
}
