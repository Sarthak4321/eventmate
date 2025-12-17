import VendorNavbar from "@/components/VendorNavbar";

export default function VendorDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white">
      <VendorNavbar />
      <main className="pt-24 px-6">
        {children}
      </main>
    </div>
  );
}
