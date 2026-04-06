import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="relative overflow-hidden bg-fajr-charcoal">
        <div className="absolute inset-0">
          <Image
            src="/images/donation/KakaoTalk_20250407_101913274_01.jpg"
            alt="Pyoseon musalla building"
            fill
            className="object-cover object-center opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-fajr-charcoal/60 via-fajr-charcoal/40 to-fajr-charcoal" />
        </div>

        <div className="relative mx-auto max-w-3xl px-6 py-32 text-center sm:py-44">
          <p className="text-xs font-medium uppercase tracking-[4px] text-fajr-sand">
            Jeju Island, South Korea
          </p>
          <h1 className="mt-6 font-heading text-4xl font-semibold text-white sm:text-6xl">
            Fajr Jeju
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-white/70">
            Supporting the Muslim community in Jeju &mdash; from building the first musalla
            in southern Jeju to connecting brothers and sisters across the island.
          </p>
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/donation"
              className="inline-flex items-center gap-2 rounded-full bg-fajr-dawn px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-fajr-dawn-light"
            >
              Pyoseon Musalla Fund
              <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-fajr-cream py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-6">
          <p className="text-center text-xs font-medium uppercase tracking-[3px] text-fajr-stone">
            Our Mission
          </p>
          <h2 className="mt-4 text-center font-heading text-2xl font-semibold text-fajr-charcoal sm:text-3xl">
            A home for every Muslim in Jeju
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-center text-sm leading-relaxed text-fajr-stone">
            Hundreds of Muslim workers and families live across Jeju Island, many far from the only
            mosque in Jeju City. Fajr Jeju exists to bridge that gap &mdash; starting with a musalla
            in Pyoseon for the southern communities.
          </p>

          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-fajr-dawn/10">
                <svg aria-hidden="true" className="h-6 w-6 text-fajr-dawn" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
                  <path d="M3 9V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4" />
                  <path d="M12 2v7" />
                </svg>
              </div>
              <h3 className="mt-4 text-sm font-semibold text-fajr-charcoal">Musalla</h3>
              <p className="mt-2 text-xs leading-relaxed text-fajr-stone">
                A dedicated prayer space in Pyoseon, southern Jeju &mdash; 58.9m&sup2;, Qibla-aligned, open to all.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-fajr-sky/10">
                <svg aria-hidden="true" className="h-6 w-6 text-fajr-sky" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3 className="mt-4 text-sm font-semibold text-fajr-charcoal">Community</h3>
              <p className="mt-2 text-xs leading-relaxed text-fajr-stone">
                Connecting Muslim families, workers, and visitors across the island through events and support.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-fajr-gold/10">
                <svg aria-hidden="true" className="h-6 w-6 text-fajr-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v4" /><path d="M12 18v4" />
                  <path d="m4.93 4.93 2.83 2.83" /><path d="m16.24 16.24 2.83 2.83" />
                  <path d="M2 12h4" /><path d="M18 12h4" />
                  <circle cx="12" cy="12" r="4" />
                </svg>
              </div>
              <h3 className="mt-4 text-sm font-semibold text-fajr-charcoal">Transparency</h3>
              <p className="mt-2 text-xs leading-relaxed text-fajr-stone">
                Every won donated is tracked publicly. Open ledger, real-time updates, full accountability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border/30 bg-white py-16">
        <div className="mx-auto max-w-xl px-6 text-center">
          <h2 className="font-heading text-xl font-semibold text-fajr-charcoal sm:text-2xl">
            Help us open the musalla
          </h2>
          <p className="mt-4 text-sm text-fajr-stone">
            Every donation goes directly to securing and setting up the Pyoseon musalla space.
            See exactly where your money goes.
          </p>
          <Link
            href="/donation"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-fajr-charcoal px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-fajr-charcoal/90"
          >
            View the Donation Ledger
            <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/30 bg-fajr-cream py-8">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="text-xs text-fajr-stone">
            Fajr Jeju &mdash; Non-profit Muslim community organization in Jeju Island, South Korea
          </p>
          <p className="mt-2 text-[10px] text-fajr-stone/60">
            fajrjeju.com
          </p>
        </div>
      </footer>
    </main>
  );
}