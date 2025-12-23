import "./globals.css";
import { Plus_Jakarta_Sans, DM_Serif_Display } from "next/font/google";
import { Toaster } from "sonner";
import SmoothScrolling from "@/components/SmoothScrolling";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
});

const serif = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${jakarta.variable} ${serif.variable} font-sans antialiased`}
      >
        {children}
        <Toaster position="top-right" richColors />
        <SmoothScrolling />
      </body>
    </html>
  );
}
