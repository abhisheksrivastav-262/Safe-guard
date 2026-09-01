import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FloatingActions from "./components/FloatingActions";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://safeguardforce.in"),
  title: {
    default: "SAFE Guard FORCE | Nationwide Security Group – Integrated Security & Facility Management Mumbai",
    template: "%s | SAFE Guard FORCE",
  },
  description:
    "SAFE Guard FORCE - Nationwide Security Group. Integrated security, facility management, housekeeping, technical maintenance, STP operations & confidential investigation services in Mumbai. 24/7 Professional Assistance.",
  keywords: [
    "security services Mumbai",
    "security guards Mumbai",
    "facility management Mumbai",
    "housekeeping services Mumbai",
    "STP operation Mumbai",
    "detective agency Mumbai",
    "bouncer services Mumbai",
    "fire safety services Mumbai",
  ],
  verification: { google: "" },
  icons: {
    icon: "/images/safelogo.jpeg",
    apple: "/images/safelogo.jpeg",
  },
  openGraph: {
    images: ["/images/safelogo.jpeg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col bg-white antialiased pb-[60px] lg:pb-0">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingActions />
        {/* Legal disclaimer bar */}
        <div className="hidden" />
      </body>
    </html>
  );
}
