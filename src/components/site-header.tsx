"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeNames, rtlLocales } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function SiteHeader({ locale, musallaLabel }: { locale: Locale; musallaLabel: string }) {
  const pathname = usePathname();
  const isMusalla = pathname.startsWith(`/${locale}/musalla`);

  return (
    <header className="sticky top-0 z-50 bg-fj-bg/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        {/* Logo */}
        <Link
          href={`/${locale}`}
          className="group flex items-center gap-1.5 text-[20px] font-bold tracking-tight text-fj-dark transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fj-gold focus-visible:ring-offset-2 focus-visible:rounded"
          style={{ fontFamily: "var(--font-kufam), var(--font-sans)" }}
        >
          Fajr Jeju
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-fj-gold transition-transform group-hover:scale-125" />
        </Link>

        <div className="flex items-center gap-1">
          {/* Navigation */}
          <nav aria-label="Main navigation">
            <Link
              href={`/${locale}/musalla`}
              className={`relative cursor-pointer rounded-lg px-3 py-2 text-[13px] font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fj-gold focus-visible:ring-offset-2 ${
                isMusalla
                  ? "text-fj-dark"
                  : "text-fj-muted hover:bg-fj-surface hover:text-fj-dark"
              }`}
            >
              {musallaLabel}
              {isMusalla && (
                <span className="absolute bottom-0.5 left-3 right-3 h-0.5 rounded-full bg-fj-gold" />
              )}
            </Link>
          </nav>

          {/* Divider */}
          <span className="mx-1.5 h-4 w-px bg-fj-border" />

          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger
              className="flex min-h-[44px] cursor-pointer items-center gap-1.5 rounded-lg px-2.5 text-[12px] font-medium text-fj-muted transition-all duration-200 hover:bg-fj-surface hover:text-fj-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fj-gold"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
              </svg>
              {localeNames[locale]}
              <svg className="h-3 w-3 opacity-40 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" sideOffset={8} className="w-auto overflow-hidden rounded-xl border-fj-border bg-fj-bg/95 p-0 shadow-xl shadow-fj-dark/8 ring-1 ring-fj-border backdrop-blur-lg">
              {/* Gold accent line */}
              <div className="h-[1.5px] bg-gradient-to-r from-transparent via-fj-gold to-transparent" />
              <div className="px-1.5 pb-1.5 pt-2">
                <p className="mb-1 px-2 text-[10px] font-medium uppercase tracking-widest text-fj-muted/70">Language</p>
                {locales.map((l) => {
                  const isActive = l === locale;
                  const isRtl = rtlLocales.includes(l);
                  return (
                    <DropdownMenuItem
                      key={l}
                      className="group/lang cursor-pointer rounded-lg p-0 transition-all duration-150 focus:bg-fj-surface focus:text-fj-dark"
                    >
                      <Link
                        href={`/${l}${pathname.replace(`/${locale}`, "")}`}
                        className={`flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-[13px] transition-all duration-150 ${
                          isActive
                            ? "bg-fj-gold/8 font-semibold text-fj-dark"
                            : "text-fj-dark/60 hover:bg-fj-surface hover:text-fj-dark"
                        }`}
                      >
                        {/* Left accent bar */}
                        <span className={`h-4 w-[3px] shrink-0 rounded-full transition-all duration-150 ${
                          isActive ? "bg-fj-gold" : "bg-transparent group-hover/lang:bg-fj-border"
                        }`} />
                        <span className={`flex-1 ${isRtl ? "font-[family-name:var(--font-arabic)]" : ""}`}>
                          {localeNames[l]}
                        </span>
                        {isActive && (
                          <svg className="h-3.5 w-3.5 shrink-0 text-fj-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                          </svg>
                        )}
                      </Link>
                    </DropdownMenuItem>
                  );
                })}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-fj-gold/30 to-transparent" />
    </header>
  );
}
