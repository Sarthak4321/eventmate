import VendorSidebar from "@/components/VendorSidebar";

export default function VendorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#F6F7FB]">
            <VendorSidebar />
            <main className="ml-64 min-h-screen">
                {children}
            </main>
        </div>
    );
}










 