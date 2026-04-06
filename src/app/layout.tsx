import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, DM_Serif_Display, Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const notoArabic = Noto_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  variable: "--font-price",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fajrjeju.com"),
  title: {
    default: "Fajr Jeju — Musalla & Muslim Community in Jeju",
    template: "%s | Fajr Jeju",
  },
  description:
    "Supporting the Muslim community in Jeju Island. Pyoseon Musalla fund, community resources, and transparent donation tracking.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable} ${cormorant.variable} ${dmSerif.variable} ${notoArabic.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-fajr-cream">
        {children}
      </body>
    </html>
  );
}