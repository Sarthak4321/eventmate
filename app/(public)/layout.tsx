import MainNavbar from "@/components/MainNavbar";
import MainFooter from "@/components/MainFooter";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MainNavbar />
      {children}
      <MainFooter />
    </>
  );
}
