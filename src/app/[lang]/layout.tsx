import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Inter, Noto_Sans_Arabic, Kufam } from "next/font/google";
import { locales, isRtl } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { hasLocale, getDictionary } from "./dictionaries";
import { SiteHeader } from "@/components/site-header";
import "../globals.css";

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

const kufam = Kufam({
  variable: "--font-kufam",
  subsets: ["latin"],
  weight: ["700"],
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

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const locale = lang as Locale;
  const dir = isRtl(locale) ? "rtl" : "ltr";
  const dict = await getDictionary(locale);

  return (
    <html lang={locale} dir={dir} className={`${inter.variable} ${notoArabic.variable} ${kufam.variable} h-full scroll-smooth antialiased`}>
      <body className="min-h-full flex flex-col bg-fj-bg font-sans text-fj-text">
        {/* ── Skip to content ── */}
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-fj-dark focus:px-4 focus:py-2 focus:text-white">
          Skip to content
        </a>

        {/* ── Header ── */}
        <SiteHeader locale={locale} musallaLabel={dict.nav.musalla} />

        <main id="main-content" className="flex-1">
          {children}
        </main>

        {/* ── Footer ── */}
        <footer className="bg-fj-surface">
          <div className="h-px bg-gradient-to-r from-transparent via-fj-gold/30 to-transparent" />
          <div className="mx-auto max-w-6xl px-5 py-6">
            <div className="flex flex-col gap-3 text-[12px] text-fj-dark/70 sm:flex-row sm:items-baseline sm:justify-between">
              <p>
                <span className="font-bold text-fj-dark" style={{ fontFamily: "var(--font-kufam), var(--font-sans)" }}>Fajr Jeju</span>
                <span className="mx-1.5 text-fj-border">·</span>{dict.footer.rep}
                <span className="mx-1.5 text-fj-border">·</span>
                <a href="mailto:support@fajrjeju.com" className="underline decoration-fj-border underline-offset-2 transition-colors hover:text-fj-dark">{dict.footer.email}</a>
              </p>
              <p className="text-fj-muted">{dict.footer.taxId}</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}