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
          <div className="mx-auto max-w-6xl px-5 py-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              {/* Brand + org */}
              <div className="flex items-center gap-2 text-[12px]">
                <span className="font-bold text-fj-dark" style={{ fontFamily: "var(--font-kufam), var(--font-sans)" }}>Fajr Jeju</span>
                <span className="h-3 w-px bg-fj-border" />
                <span className="text-fj-muted">{dict.footer.rep}</span>
              </div>
              {/* Contact */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-fj-dark/60">
                <a
                  href="https://map.naver.com/p/search/제주 서귀포시 표선면 표선동서로 31"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 transition-colors hover:text-fj-dark"
                >
                  <svg className="h-3 w-3 text-fj-gold/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                  {dict.footer.address}
                </a>
                <a href="mailto:support@fajrjeju.com" className="flex items-center gap-1 transition-colors hover:text-fj-dark">
                  <svg className="h-3 w-3 text-fj-gold/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                  {dict.footer.email}
                </a>
                <span className="text-fj-muted">{dict.footer.taxId}</span>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}