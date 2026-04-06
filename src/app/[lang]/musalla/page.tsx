import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDictionary, hasLocale } from "../dictionaries";
import type { Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Al-Fajr Pyoseon Musalla",
  description: "Prayer space and community hub in Pyoseon, southern Jeju. 58.9m², Qibla-aligned, open to all.",
};

export default async function MusallaPage({
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
      {/* ── Hero ── */}
      <section className="relative h-[360px] sm:h-[440px]">
        <Image
          src="/images/donation/KakaoTalk_20250407_101913274_01.jpg"
          alt="Al-Fajr Pyoseon Musalla"
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
            {dict.musalla.badge}
          </span>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {dict.musalla.title}
          </h1>
          <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-white/75">
            {dict.musalla.subtitle}
          </p>
        </div>
      </section>

      {/* ── Prayer Info ── */}
      <section className="border-b border-fj-border bg-fj-bg">
        <div className="mx-auto grid max-w-6xl grid-cols-1 divide-y divide-fj-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {/* Next Prayer */}
          <div className="flex items-center gap-4 px-5 py-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-fj-gold/10">
              <svg className="h-5 w-5 text-fj-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-fj-muted">{dict.musalla.prayer.nextPrayer}</p>
              <p className="text-sm font-bold text-fj-dark">{dict.musalla.prayer.placeholder}</p>
            </div>
          </div>
          {/* Qibla */}
          <div className="flex items-center gap-4 px-5 py-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-fj-gold/10">
              <svg className="h-5 w-5 text-fj-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1M4.22 4.22l.7.7m12.16 12.16.7.7M3 12h1m16 0h1M4.22 19.78l.7-.7M18.36 5.64l.7-.7M12 7a5 5 0 1 1 0 10A5 5 0 0 1 12 7Z" />
              </svg>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-fj-muted">{dict.musalla.prayer.qibla}</p>
              <p className="text-sm font-bold text-fj-dark">259° W</p>
            </div>
          </div>
          {/* Facility */}
          <div className="flex items-center gap-4 px-5 py-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-fj-gold/10">
              <svg className="h-5 w-5 text-fj-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-fj-muted">{dict.musalla.prayer.title}</p>
              <p className="text-sm font-bold text-fj-dark">{dict.musalla.prayer.facility}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Space Gallery ── */}
      <section className="bg-fj-bg">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-fj-gold" />
            <h2 className="text-lg font-bold text-fj-dark">{dict.musalla.space.title}</h2>
            <div className="h-px w-8 bg-fj-gold" />
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {["_01", "_02", "_03", "_04"].map((suffix) => (
              <div key={suffix} className="relative aspect-square overflow-hidden rounded-xl ring-1 ring-fj-border">
                <Image
                  src={`/images/donation/KakaoTalk_20250407_121758416${suffix}.jpg`}
                  alt="Musalla interior"
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-fj-border bg-fj-bg p-5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-fj-gold/10">
                <svg className="h-4 w-4 text-fj-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              </div>
              <p className="mt-3 text-[13px] font-medium text-fj-dark">{dict.musalla.space.sistersArea}</p>
            </div>
            <div className="rounded-xl border border-fj-border bg-fj-bg p-5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-fj-gold/10">
                <svg className="h-4 w-4 text-fj-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                </svg>
              </div>
              <p className="mt-3 text-[13px] font-medium text-fj-dark">{dict.musalla.space.restrooms}</p>
            </div>
            <div className="rounded-xl border border-fj-border bg-fj-bg p-5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-fj-gold/10">
                <svg className="h-4 w-4 text-fj-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 20.488l-.023.5a.5.5 0 0 1-.5.5H9.523a.5.5 0 0 1-.5-.5l-.023-.5m6 0a48.108 48.108 0 0 0-6 0m6 0l.036-.72c.037-.744-.35-1.442-1.005-1.747A4.5 4.5 0 0 0 12 17.75a4.5 4.5 0 0 0-2.531.77c-.655.306-1.042 1.004-1.005 1.748l.036.72" />
                </svg>
              </div>
              <p className="mt-3 text-[13px] font-medium text-fj-dark">{dict.musalla.space.kitchen}</p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {[
              dict.musalla.space.specs.land,
              dict.musalla.space.specs.floor,
              dict.musalla.space.specs.floor1,
              dict.musalla.space.specs.south,
            ].map((spec) => (
              <span key={spec} className="rounded-full bg-fj-gold/10 px-3 py-1 text-[12px] font-semibold text-fj-walnut">
                {spec}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Community ── */}
      <section className="relative bg-fj-surface">
        <div className="bg-pattern-islamic absolute inset-0 opacity-[0.35]" />
        <div className="relative mx-auto max-w-6xl px-5 py-16 sm:py-20">
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-fj-gold" />
            <h2 className="text-lg font-bold text-fj-dark">{dict.musalla.community.title}</h2>
            <div className="h-px w-8 bg-fj-gold" />
          </div>
          <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-fj-muted">
            {dict.musalla.community.desc}
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {[
              dict.musalla.community.placeholder1,
              dict.musalla.community.placeholder2,
              dict.musalla.community.placeholder3,
            ].map((title) => (
              <div key={title} className="rounded-xl border border-fj-border bg-fj-bg p-5 transition-shadow hover:shadow-md">
                <div className="flex items-center gap-2">
                  <span className="rounded bg-fj-gold/10 px-2 py-0.5 text-[10px] font-semibold text-fj-walnut">
                    {dict.musalla.community.title}
                  </span>
                </div>
                <p className="mt-2.5 text-[14px] font-medium leading-snug text-fj-dark">{title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Location ── */}
      <section className="bg-fj-bg">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-fj-gold" />
            <h2 className="text-lg font-bold text-fj-dark">{dict.location.title}</h2>
            <div className="h-px w-8 bg-fj-gold" />
          </div>

          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            <div>
              <p className="text-[14px] leading-relaxed text-fj-dark">{dict.location.address}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href="https://map.kakao.com/link/search/제주특별자치도 서귀포시 표선면 표선동서로 31"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-fj-gold/10 px-4 py-2.5 text-[13px] font-semibold text-fj-walnut transition-colors hover:bg-fj-gold/20"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                  KakaoMap
                </a>
                <a
                  href="https://maps.google.com/?q=제주특별자치도 서귀포시 표선면 표선동서로 31"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-fj-border bg-fj-bg px-4 py-2.5 text-[13px] font-semibold text-fj-dark transition-colors hover:bg-fj-surface"
                >
                  <svg className="h-4 w-4 text-fj-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                  Google Maps
                </a>
              </div>
            </div>
            <div className="relative aspect-video overflow-hidden rounded-xl ring-1 ring-fj-border">
              <Image
                src="/images/donation/exterior-road.png"
                alt="Musalla exterior"
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Fund Banner ── */}
      <section className="bg-fj-walnut">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-5 py-16 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <h2 className="text-xl font-bold text-white">{dict.musalla.fund.title}</h2>
            <p className="mt-1 text-[14px] text-white/60">{dict.musalla.fund.desc}</p>
          </div>
          <Link
            href={`/${locale}/musalla/fund`}
            className="shrink-0 rounded-lg bg-fj-gold px-6 py-3 text-sm font-semibold text-fj-dark transition-colors hover:bg-fj-gold-light"
          >
            {dict.musalla.fund.cta}
          </Link>
        </div>
      </section>
    </>
  );
}