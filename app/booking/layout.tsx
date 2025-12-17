export default function BookingLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[#F7F7FB] flex justify-center px-6 py-20">
      {children}
    </main>
  );
}
