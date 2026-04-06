import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Inter, Noto_Sans_Arabic } from "next/font/google";
import Link from "next/link";
import { locales, localeNames, isRtl } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { hasLocale, getDictionary } from "./dictionaries";
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
    <html lang={locale} dir={dir} className={`${inter.variable} ${notoArabic.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-fj-bg font-sans text-fj-text">
        {/* ── Header ── */}
        <header className="sticky top-0 z-50 bg-fj-bg/95 backdrop-blur-sm">
          <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5">
            <Link href={`/${locale}`} className="text-lg font-bold tracking-tight text-fj-dark">
              Fajr Jeju
            </Link>
            <nav className="hidden items-center gap-8 text-[13px] font-medium text-fj-muted sm:flex">
              <Link href={`/${locale}/musalla`} className="transition-colors hover:text-fj-dark">
                {dict.nav.musalla}
              </Link>
            </nav>
            <div className="flex items-center gap-0.5 text-[11px] text-fj-muted">
              {locales.map((l) => (
                <Link
                  key={l}
                  href={`/${l}`}
                  className={`rounded px-1.5 py-0.5 transition-colors ${l === locale ? "bg-fj-dark text-white" : "hover:bg-fj-surface"}`}
                >
                  {localeNames[l]}
                </Link>
              ))}
            </div>
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-fj-gold/40 to-transparent" />
        </header>

        <main className="flex-1">
          {children}
        </main>

        {/* ── Footer ── */}
        <footer className="bg-fj-surface">
          <div className="h-px bg-gradient-to-r from-transparent via-fj-gold/30 to-transparent" />
          <div className="mx-auto max-w-6xl px-5 py-8">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <div>
                <p className="text-sm font-semibold text-fj-dark">Fajr Jeju</p>
                <p className="mt-1 text-[12px] text-fj-muted">{dict.footer.org}</p>
              </div>
              <p className="text-[11px] text-fj-muted">{dict.footer.site}</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}