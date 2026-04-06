"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeNames } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

export function SiteHeader({ locale, musallaLabel }: { locale: Locale; musallaLabel: string }) {
  const pathname = usePathname();
  const isMusalla = pathname.startsWith(`/${locale}/musalla`);

  return (
    <header className="sticky top-0 z-50 bg-fj-bg/95 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5">
        <Link
          href={`/${locale}`}
          className="text-[19px] font-bold tracking-tight text-fj-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fj-gold focus-visible:ring-offset-2"
          style={{ fontFamily: "var(--font-kufam), var(--font-sans)" }}
        >
          Fajr Jeju
        </Link>
        <div className="flex items-center gap-4">
          <nav aria-label="Main navigation">
            <Link
              href={`/${locale}/musalla`}
              className={`text-[13px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fj-gold focus-visible:ring-offset-2 focus-visible:rounded ${
                isMusalla
                  ? "text-fj-dark"
                  : "text-fj-muted hover:text-fj-dark"
              }`}
            >
              {musallaLabel}
              {isMusalla && (
                <span className="mt-0.5 block h-0.5 rounded-full bg-fj-gold" />
              )}
            </Link>
          </nav>
          <nav aria-label="Language" className="flex items-center text-[11px] text-fj-muted">
            <div className="flex items-center gap-0.5 overflow-x-auto">
              {locales.map((l) => (
                <Link
                  key={l}
                  href={`/${l}${pathname.replace(`/${locale}`, "")}`}
                  aria-label={localeNames[l]}
                  aria-current={l === locale ? "true" : undefined}
                  className={`flex min-h-[32px] min-w-[32px] shrink-0 items-center justify-center rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fj-gold ${
                    l === locale
                      ? "bg-fj-dark text-white"
                      : "hover:bg-fj-surface"
                  }`}
                >
                  {localeNames[l]}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-fj-gold/40 to-transparent" />
    </header>
  );
}