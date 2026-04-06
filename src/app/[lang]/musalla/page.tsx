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
  const m = dict.musalla;

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative h-[420px] sm:h-[500px]">
        <Image
          src="/images/donation/KakaoTalk_20250407_101913274_01.jpg"
          alt="Al-Fajr Pyoseon Musalla"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-fj-walnut/90 via-fj-walnut/35 to-fj-walnut/10" />
        <div className="relative mx-auto flex h-full max-w-6xl flex-col justify-end px-5 pb-14">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/12 px-3.5 py-1.5 text-[11px] font-medium text-white/90 ring-1 ring-white/10 backdrop-blur-md">
            <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 1 1 9.9 9.9L10 18.9l-4.95-4.95a7 7 0 0 1 0-9.9ZM10 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" clipRule="evenodd" />
            </svg>
            {m.badge}
          </span>
          <h1 className="mt-3.5 text-3xl font-bold tracking-tight text-white sm:text-5xl">
            {m.title}
          </h1>
          <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-white/65">
            {m.subtitle}
          </p>
        </div>
        {/* Hero bottom gold line */}
        <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-fj-gold/50 to-transparent" />
      </section>

      {/* ── Prayer Info Bar ── */}
      <section className="border-b border-fj-border bg-fj-bg">
        <div className="mx-auto grid max-w-6xl grid-cols-1 divide-y divide-fj-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <InfoCell icon={<ClockIcon />} label={m.prayer.nextPrayer} value={m.prayer.placeholder} />
          <InfoCell icon={<CompassIcon />} label={m.prayer.qibla} value="259° W" />
          <InfoCell icon={<HomeIcon />} label={m.prayer.title} value={m.prayer.facility} />
        </div>
      </section>

      {/* ── Space Gallery + Facilities ── */}
      <section className="bg-fj-bg">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
          <SectionHeading>{m.space.title}</SectionHeading>

          <div className="mt-10 grid grid-cols-2 grid-rows-2 gap-2.5 sm:grid-cols-3 sm:gap-3">
            <div className="group relative col-span-1 row-span-2 overflow-hidden rounded-xl ring-1 ring-fj-border sm:aspect-auto">
              <Image
                src="/images/donation/KakaoTalk_20250407_121758416_01.jpg"
                alt="Musalla prayer hall"
                fill
                sizes="(max-width: 640px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
            </div>
            {["_02", "_03", "_04"].map((suffix) => (
              <div key={suffix} className="group relative aspect-square overflow-hidden rounded-xl ring-1 ring-fj-border">
                <Image
                  src={`/images/donation/KakaoTalk_20250407_121758416${suffix}.jpg`}
                  alt={`Musalla interior ${suffix.replace("_0", "")}`}
                  fill
                  sizes="(max-width: 640px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
              </div>
            ))}
          </div>

          {/* Facility checklist + spec badges */}
          <div className="mt-8 flex flex-wrap items-center gap-2.5">
            <FacilityChip>{m.space.sistersArea}</FacilityChip>
            <FacilityChip>{m.space.restrooms}</FacilityChip>
            <FacilityChip>{m.space.kitchen}</FacilityChip>
            <span className="mx-0.5 hidden h-4 w-px bg-fj-border sm:block" />
            {Object.values(m.space.specs).map((spec) => (
              <span key={spec} className="rounded-full bg-fj-gold/8 px-3 py-1.5 text-[12px] font-semibold text-fj-gold-dark">
                {spec}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Community ── */}
      <section className="relative bg-fj-surface">
        <div className="bg-pattern-islamic absolute inset-0 opacity-[0.3]" />
        <div className="relative mx-auto max-w-6xl px-5 py-16 sm:py-20">
          <SectionHeading>{m.community.title}</SectionHeading>
          <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-fj-dark/65">
            {m.community.desc}
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { title: m.community.placeholder1, icon: "users" },
              { title: m.community.placeholder2, icon: "book" },
              { title: m.community.placeholder3, icon: "heart" },
            ].map(({ title, icon }) => (
              <div key={title} className="group rounded-xl border border-fj-border bg-fj-bg p-5 transition-all duration-200 hover:border-fj-gold/30 hover:shadow-sm">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-fj-gold/10 transition-colors duration-200 group-hover:bg-fj-gold/15">
                  <CommunityIcon type={icon} />
                </div>
                <p className="mt-3.5 text-[14px] font-medium leading-snug text-fj-dark">{title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Location ── */}
      <section className="bg-fj-bg">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
          <SectionHeading>{dict.location.title}</SectionHeading>

          <div className="mt-10 grid items-center gap-8 sm:grid-cols-2 sm:gap-10">
            <div>
              <p className="flex items-start gap-2 text-[15px] leading-relaxed text-fj-dark/70">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-fj-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                {dict.location.address}
              </p>
              <div className="mt-5 flex flex-wrap gap-2.5">
                <a
                  href="https://map.naver.com/p/search/제주 서귀포시 표선면 표선동서로 31"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Naver Map (opens in new tab)"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-fj-border px-4 py-2.5 text-[13px] font-medium text-fj-dark transition-all duration-200 hover:border-fj-gold/30 hover:bg-fj-surface"
                >
                  Naver Map
                  <ExternalIcon />
                </a>
                <a
                  href="https://map.kakao.com/?q=서귀포시 표선면 표선동서로 31"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="KakaoMap (opens in new tab)"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-fj-border px-4 py-2.5 text-[13px] font-medium text-fj-dark transition-all duration-200 hover:border-fj-gold/30 hover:bg-fj-surface"
                >
                  KakaoMap
                  <ExternalIcon />
                </a>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=33.3255,126.8363"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Google Maps (opens in new tab)"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-fj-border px-4 py-2.5 text-[13px] font-medium text-fj-dark transition-all duration-200 hover:border-fj-gold/30 hover:bg-fj-surface"
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
        </div>
      </section>

      {/* ── Transparency Banner ── */}
      <section className="border-y border-fj-border bg-fj-surface">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-5 py-10 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <h2 className="text-base font-bold text-fj-dark">{m.fund.title}</h2>
            <p className="mt-1.5 text-[14px] text-fj-dark/60">{m.fund.desc}</p>
          </div>
          <Link
            href={`/${locale}/musalla/fund`}
            className="group inline-flex shrink-0 items-center gap-2 rounded-lg bg-fj-dark px-5 py-2.5 text-[13px] font-medium text-white transition-all duration-200 hover:bg-fj-walnut"
          >
            {m.fund.cta}
            <svg className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}

/* ── Shared sub-components ── */

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-px w-8 bg-fj-gold" />
      <h2 className="text-lg font-bold text-fj-dark">{children}</h2>
      <div className="h-px w-8 bg-fj-gold" />
    </div>
  );
}

function InfoCell({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-4 px-5 py-5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-fj-gold/10">
        {icon}
      </div>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-wider text-fj-muted">{label}</p>
        <p className="text-sm font-bold text-fj-dark">{value}</p>
      </div>
    </div>
  );
}

function FacilityChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-fj-border bg-fj-surface px-3 py-1.5 text-[12px] font-medium text-fj-dark">
      <svg className="h-3 w-3 text-fj-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
      </svg>
      {children}
    </span>
  );
}

function ClockIcon() {
  return (
    <svg className="h-5 w-5 text-fj-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );
}

function CompassIcon() {
  return (
    <svg className="h-5 w-5 text-fj-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m6.115 5.19.319 1.913A6 6 0 0 0 8.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 0 0 2.288-4.042 1.087 1.087 0 0 0-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 0 1-.98-.314l-.295-.295a1.125 1.125 0 0 1 0-1.591l.13-.132a1.125 1.125 0 0 1 1.3-.21l.603.302a.809.809 0 0 0 1.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 0 0 1.528-1.732l.146-.292M6.115 5.19A9 9 0 1 0 17.18 4.64M6.115 5.19A8.965 8.965 0 0 1 12 3c1.929 0 3.716.607 5.18 1.64" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg className="h-5 w-5 text-fj-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
  );
}

function CommunityIcon({ type }: { type: string }) {
  const cls = "h-4 w-4 text-fj-gold";
  if (type === "book") return (
    <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
    </svg>
  );
  if (type === "heart") return (
    <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
    </svg>
  );
  return (
    <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6m4-3h6v6m-11 5L21 3" />
    </svg>
  );
}
