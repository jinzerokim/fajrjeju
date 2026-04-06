import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "./dictionaries";
import { locales, localeNames } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const locale = lang as Locale;

  return (
    <main className="flex-1">
      {/* ── Header ── */}
      <header className="sticky top-0 z-50 bg-fj-bg/95 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5">
          <Link href={`/${lang}`} className="text-lg font-bold tracking-tight text-fj-dark">
            Fajr Jeju
          </Link>
          <nav className="hidden items-center gap-8 text-[13px] font-medium text-fj-muted sm:flex">
            <Link href={`/${lang}`} className="transition-colors hover:text-fj-dark">{dict.nav.home}</Link>
            <Link href={`/${lang}/donation`} className="transition-colors hover:text-fj-dark">{dict.nav.fund}</Link>
          </nav>
          <div className="flex items-center gap-3">
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
            <Link
              href={`/${lang}/donation`}
              className="rounded-md bg-fj-walnut px-3.5 py-1.5 text-[13px] font-semibold text-white transition-colors hover:bg-fj-walnut-light"
            >
              Donate
            </Link>
          </div>
        </div>
        {/* Thin brass accent line */}
        <div className="h-px bg-gradient-to-r from-transparent via-fj-gold/40 to-transparent" />
      </header>

      {/* ── Hero — full-width image + warm overlay ── */}
      <section className="relative h-[360px] sm:h-[440px]">
        <Image
          src="/images/donation/KakaoTalk_20250407_101913274_01.jpg"
          alt="Pyoseon musalla"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-fj-walnut/80 via-fj-walnut/35 to-fj-walnut/10" />
        <div className="relative mx-auto flex h-full max-w-6xl flex-col justify-end px-5 pb-12">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-medium text-white/90 backdrop-blur-sm">
            <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 1 1 9.9 9.9L10 18.9l-4.95-4.95a7 7 0 0 1 0-9.9ZM10 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" clipRule="evenodd" />
            </svg>
            {dict.hero.badge}
          </span>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {dict.hero.title}
          </h1>
          <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-white/75">
            {dict.hero.subtitle}
          </p>
        </div>
      </section>

      {/* ── Quick Info Bar ── */}
      <section className="border-b border-fj-border bg-fj-bg">
        <div className="mx-auto grid max-w-6xl grid-cols-1 divide-y divide-fj-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {/* Prayer */}
          <div className="flex items-center gap-4 px-5 py-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-fj-gold/10">
              <svg className="h-5 w-5 text-fj-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-fj-muted">{dict.info.nextPrayer}</p>
              <p className="text-sm font-bold text-fj-dark">{dict.info.prayerPlaceholder}</p>
            </div>
          </div>
          {/* Location */}
          <div className="flex items-center gap-4 px-5 py-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-fj-gold/10">
              <svg className="h-5 w-5 text-fj-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-fj-muted">{dict.location.label}</p>
              <p className="text-sm font-bold text-fj-dark">{dict.info.locationShort}</p>
            </div>
          </div>
          {/* Donate */}
          <Link href={`/${lang}/donation`} className="flex items-center gap-4 px-5 py-5 transition-colors hover:bg-fj-surface">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-fj-gold/10">
              <svg className="h-5 w-5 text-fj-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-fj-muted">{dict.fund.label}</p>
              <p className="text-sm font-bold text-fj-gold">{dict.fund.cta} →</p>
            </div>
          </Link>
        </div>
      </section>

      {/* ── Announcements — with subtle Islamic pattern ── */}
      <section className="relative bg-fj-surface">
        <div className="bg-pattern-islamic absolute inset-0 opacity-[0.35]" />
        <div className="relative mx-auto max-w-6xl px-5 py-16 sm:py-20">
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-fj-gold" />
            <h2 className="text-lg font-bold text-fj-dark">{dict.notices.title}</h2>
            <div className="h-px w-8 bg-fj-gold" />
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            <NoticeCard
              date="2026.04.06"
              title={dict.notices.placeholder1}
              tag={dict.notices.tagNotice}
            />
            <NoticeCard
              date="2026.04.01"
              title={dict.notices.placeholder2}
              tag={dict.notices.tagEvent}
            />
            <NoticeCard
              date="2026.03.28"
              title={dict.notices.placeholder3}
              tag={dict.notices.tagUpdate}
            />
          </div>
        </div>
      </section>

      {/* ── Musalla Space ── */}
      <section className="bg-fj-bg">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-fj-gold" />
            <h2 className="text-lg font-bold text-fj-dark">{dict.mission.musalla}</h2>
            <div className="h-px w-8 bg-fj-gold" />
          </div>
          <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-fj-muted">
            {dict.mission.musallaDesc}
          </p>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="relative aspect-square overflow-hidden rounded-xl ring-1 ring-fj-border">
              <Image src="/images/donation/KakaoTalk_20250407_121758416_01.jpg" alt="Musalla interior 1" fill sizes="25vw" className="object-cover" />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-xl ring-1 ring-fj-border">
              <Image src="/images/donation/KakaoTalk_20250407_121758416_02.jpg" alt="Musalla interior 2" fill sizes="25vw" className="object-cover" />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-xl ring-1 ring-fj-border">
              <Image src="/images/donation/KakaoTalk_20250407_121758416_03.jpg" alt="Musalla interior 3" fill sizes="25vw" className="object-cover" />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-xl ring-1 ring-fj-border">
              <Image src="/images/donation/KakaoTalk_20250407_121758416_04.jpg" alt="Musalla interior 4" fill sizes="25vw" className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Donation Banner — walnut + brass ── */}
      <section className="bg-fj-walnut">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-5 py-16 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <h2 className="text-xl font-bold text-white">{dict.fund.title}</h2>
            <p className="mt-1 text-[14px] text-white/60">{dict.fund.desc}</p>
          </div>
          <Link
            href={`/${lang}/donation`}
            className="shrink-0 rounded-lg bg-fj-gold px-6 py-3 text-sm font-semibold text-fj-dark transition-colors hover:bg-fj-gold-light"
          >
            {dict.fund.cta}
          </Link>
        </div>
      </section>

      {/* ── Location ── */}
      <section className="bg-fj-bg">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 py-16 sm:grid-cols-2 sm:py-20">
          <div>
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-fj-gold" />
              <h2 className="text-lg font-bold text-fj-dark">{dict.location.title}</h2>
              <div className="h-px w-8 bg-fj-gold" />
            </div>
            <p className="mt-4 text-[14px] leading-relaxed text-fj-muted">
              {dict.location.address}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://map.kakao.com/?q=서귀포시 표선면 표선동서로 31"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-fj-border px-4 py-2 text-[13px] font-medium text-fj-dark transition-colors hover:bg-fj-surface"
              >
                KakaoMap
                <ExternalIcon />
              </a>
              <a
                href="https://www.google.com/maps/search/?api=1&query=33.3255,126.8363"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-fj-border px-4 py-2 text-[13px] font-medium text-fj-dark transition-colors hover:bg-fj-surface"
              >
                Google Maps
                <ExternalIcon />
              </a>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl ring-1 ring-fj-border">
            <Image
              src="/images/donation/exterior-road.png"
              alt="Musalla exterior"
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

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
    </main>
  );
}

/* ── Notice Card ── */
function NoticeCard({ date, title, tag }: { date: string; title: string; tag: string }) {
  return (
    <div className="rounded-xl border border-fj-border bg-fj-bg p-5 transition-shadow hover:shadow-md">
      <div className="flex items-center gap-2">
        <span className="rounded bg-fj-gold/10 px-2 py-0.5 text-[10px] font-semibold text-fj-walnut">
          {tag}
        </span>
        <span className="text-[11px] text-fj-muted">{date}</span>
      </div>
      <p className="mt-2.5 text-[14px] font-medium leading-snug text-fj-dark">{title}</p>
    </div>
  );
}

/* ── Icons ── */
function ExternalIcon() {
  return (
    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6m4-3h6v6m-11 5L21 3" />
    </svg>
  );
}