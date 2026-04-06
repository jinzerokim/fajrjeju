import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "./dictionaries";
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
    <>
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
          {/* Musalla link */}
          <Link href={`/${locale}/musalla`} className="flex items-center gap-4 px-5 py-5 transition-colors hover:bg-fj-surface">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-fj-gold/10">
              <svg className="h-5 w-5 text-fj-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-fj-muted">{dict.nav.musalla}</p>
              <p className="text-sm font-bold text-fj-gold">{dict.info.musallaLink}</p>
            </div>
          </Link>
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="bg-fj-bg">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-fj-gold" />
            <h2 className="text-lg font-bold text-fj-dark">{dict.mission.title}</h2>
            <div className="h-px w-8 bg-fj-gold" />
          </div>
          <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-fj-muted">
            {dict.mission.desc}
          </p>
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

      {/* ── Donation Banner — walnut + brass ── */}
      <section className="bg-fj-walnut">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-5 py-16 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <h2 className="text-xl font-bold text-white">{dict.fund.title}</h2>
            <p className="mt-1 text-[14px] text-white/60">{dict.fund.desc}</p>
          </div>
          <Link
            href={`/${locale}/musalla/fund`}
            className="shrink-0 rounded-lg bg-fj-gold px-6 py-3 text-sm font-semibold text-fj-dark transition-colors hover:bg-fj-gold-light"
          >
            {dict.fund.cta}
          </Link>
        </div>
      </section>
    </>
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