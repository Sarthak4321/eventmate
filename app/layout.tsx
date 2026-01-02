import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "sonner";
import SmoothScrolling from "@/components/SmoothScrolling";

import { Providers } from "@/components/Providers";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
});



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${jakarta.variable} font-sans antialiased`}
      >
        <Providers>
          {children}
        </Providers>
        <Toaster position="top-right" richColors />
        <SmoothScrolling />
      </body>
    </html>
  );
}
