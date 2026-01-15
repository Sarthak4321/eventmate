import MainNavbar from "@/components/MainNavbar";
import MainFooter from "@/components/MainFooter";
import LeadCaptureModal from "@/components/marketing/LeadCaptureModal";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MainNavbar />
      <LeadCaptureModal />
      {children}
      <MainFooter />
    </>
  );
}
