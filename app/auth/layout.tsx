export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[#F7F7FB] flex items-center justify-center">
      {children}
    </main>
  );
}
