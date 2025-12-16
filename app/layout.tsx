// app/layout.tsx
import "./globals.css";
import { Inter, Playfair_Display } from "next/font/google";
import MainNavbar from "@/components/MainNavbar";
import MainFooter from "@/components/MainFooter";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable}`}>
        <MainNavbar />
        {children}
        <MainFooter />
      </body>
    </html>
  );
}
