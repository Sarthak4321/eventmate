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


export const metadata = {
  title: "EvntMet - Plan Your Perfect Event",
  description: "The intelligent operating system for your celebrations.",
  icons: [
    { rel: "icon", url: "/icon-light.svg", media: "(prefers-color-scheme: light)" },
    { rel: "icon", url: "/icon-dark.svg", media: "(prefers-color-scheme: dark)" },
  ],
};


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
