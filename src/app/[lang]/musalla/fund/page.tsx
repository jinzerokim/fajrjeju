import type { Metadata } from "next";
import { DonationLedger } from "@/components/donation-ledger";

export const metadata: Metadata = {
  title: "Pyoseon Musalla Fund — Donation Transparency",
  description: "Help open the first musalla in southern Jeju. Every won raised and spent, fully transparent. 58.9m², Qibla-aligned, Pyoseon.",
  openGraph: {
    title: "Pyoseon Musalla Fund — Help open the first musalla in southern Jeju",
    description: "There's no musalla in southern Jeju (Seogwipo). We're opening one in Pyoseon — every won raised and spent, fully open.",
  },
};

export default function FundPage() {
  return <DonationLedger />;
}