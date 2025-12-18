import VendorNavbar from "@/components/VendorNavbar";

export default function VendorDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F7F8FC] text-black">
      <VendorNavbar />

      {/* Page container */}
      <main className="pt-28 px-6">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
