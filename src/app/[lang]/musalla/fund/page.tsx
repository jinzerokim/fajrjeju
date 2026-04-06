import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "../../dictionaries";
import { DonationLedger } from "@/components/donation-ledger";

export const metadata: Metadata = {
  title: "Pyoseon Musalla Fund — Donation Transparency",
  description: "Help open the first musalla in southern Jeju. Every won raised and spent, fully transparent. 58.9m², Qibla-aligned, Pyoseon.",
  openGraph: {
    title: "Pyoseon Musalla Fund — Help open the first musalla in southern Jeju",
    description: "There's no musalla in southern Jeju (Seogwipo). We're opening one in Pyoseon — every won raised and spent, fully open.",
  },
};

export default async function FundPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return <DonationLedger lang={lang} />;
}