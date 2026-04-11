"use client";

import { useState } from "react";
import Image from "next/image";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export type DonationDict = {
  title: string; desc: string; location: string; leasing: string; inside: string;
  sistersArea: string; restroomsLabel: string; restroomsDesc: string;
  kitchenLabel: string; busStops: string; qibla: string; raisedSoFar: string;
  transactions: string; synced: string; all: string; in: string; out: string;
  noTx: string; noOutTx: string; contribute: string; privacy: string; copied: string; copy: string; closing: string;
  specs: { land: string; floor: string; floor1: string; south: string };
  phase1Label: string; phase2Label: string;
  phase1Note: string;
  transferLabel: string;
  brokerageFee: string;
  rentalDeposit: string;
  transferFee: string;
  yousafLateNote: string;
  manualUpdate: string;
  regCaption: string;
};

export interface Transaction {
  date: string;
  time: string;
  description: string;
  amount: number;
  balance: number;
  type: "입금" | "출금";
  system?: boolean;
  noteKey?: "brokerageFee" | "rentalDeposit" | "transferFee";
  footnoteKey?: "yousafLate";
}

const fajrLastUpdated = "2026-04-10T07:25:44";

const fajrTransactions: Transaction[] = [
  { date: "2026-04-10", time: "07:25:44", description: "H***A", amount: 2000, balance: 358612, type: "입금" },
  { date: "2026-04-10", time: "01:49:39", description: "A***i", amount: 111111, balance: 356612, type: "입금" },
  { date: "2026-04-09", time: "23:08:34", description: "K***I", amount: 20000, balance: 245501, type: "입금" },
  { date: "2026-04-09", time: "22:58:42", description: "K***D", amount: 10000, balance: 225501, type: "입금" },
  { date: "2026-04-09", time: "21:54:19", description: "S***A", amount: 10000, balance: 215501, type: "입금" },
  { date: "2026-04-09", time: "17:30:00", description: "강*조", amount: 579000, balance: 205501, type: "출금", noteKey: "brokerageFee" },
  { date: "2026-04-09", time: "17:29:00", description: "전*순", amount: 5000000, balance: 784501, type: "출금", noteKey: "rentalDeposit" },
  { date: "2026-04-09", time: "17:26:00", description: "성*석", amount: 300000, balance: 5784501, type: "입금" },
  { date: "2026-04-09", time: "17:23:00", description: "김*영", amount: 300000, balance: 5484501, type: "입금" },
  { date: "2026-04-09", time: "12:01:00", description: "", amount: 499, balance: 5184501, type: "출금", noteKey: "transferFee" },
  { date: "2026-04-09", time: "12:00:00", description: "KHALID", amount: 5185000, balance: 5185000, type: "입금", system: true },
];

const fajrBalance = fajrTransactions[0].balance;

const legacyTransactions: Transaction[] = [
  { date: "2026-04-09", time: "20:00:00", description: "KHALID → Fajr Jeju", amount: 5176000, balance: 0, type: "출금", system: true },
  { date: "2026-04-09", time: "18:45:00", description: "Y***M", amount: 100000, balance: 5176000, type: "입금" },
  { date: "2026-04-09", time: "11:03:00", description: "AKHTAR S***D", amount: 150000, balance: 5076000, type: "입금" },
  { date: "2026-04-08", time: "19:47:00", description: "H***R", amount: 580000, balance: 4926000, type: "입금" },
  { date: "2026-04-06", time: "21:54:00", description: "RAMZAN J***N", amount: 100000, balance: 4346000, type: "입금" },
  { date: "2026-04-06", time: "15:12:00", description: "RAZZAQ Z***H", amount: 50000, balance: 4246000, type: "입금" },
  { date: "2026-04-05", time: "22:04:00", description: "ALI M***A", amount: 500000, balance: 4196000, type: "입금" },
  { date: "2026-04-05", time: "22:03:00", description: "TALHA M***A", amount: 186000, balance: 3696000, type: "입금" },
  { date: "2026-04-05", time: "19:37:00", description: "KHURSHID S***A", amount: 200000, balance: 3510000, type: "\uc785\uae08" },
  { date: "2026-04-05", time: "17:39:00", description: "AKHTAR S***H", amount: 100000, balance: 3310000, type: "\uc785\uae08" },
  { date: "2026-04-05", time: "17:24:00", description: "Z***D", amount: 20000, balance: 3210000, type: "\uc785\uae08" },
  { date: "2026-04-05", time: "11:32:00", description: "ALI M***A", amount: 100000, balance: 3190000, type: "\uc785\uae08" },
  { date: "2026-04-05", time: "10:44:00", description: "HASSAN F***R", amount: 50000, balance: 3090000, type: "\uc785\uae08" },
  { date: "2026-04-05", time: "03:01:00", description: "RAMZAN J***N", amount: 100000, balance: 3040000, type: "\uc785\uae08" },
  { date: "2026-04-04", time: "23:49:00", description: "FAROOQ M***H", amount: 30000, balance: 2940000, type: "\uc785\uae08" },
  { date: "2026-04-04", time: "23:45:00", description: "TARIQ T***H", amount: 10000, balance: 2910000, type: "\uc785\uae08" },
  { date: "2026-04-04", time: "23:42:00", description: "MALIK M***M", amount: 100000, balance: 2900000, type: "\uc785\uae08" },
  { date: "2026-04-04", time: "23:40:00", description: "ASHFAQ R***J", amount: 100000, balance: 2800000, type: "\uc785\uae08" },
  { date: "2026-04-04", time: "23:03:00", description: "AHMED N***Z", amount: 500000, balance: 2700000, type: "\uc785\uae08" },
  { date: "2026-04-04", time: "22:58:00", description: "KHAN K***I", amount: 1000000, balance: 2200000, type: "\uc785\uae08" },
  { date: "2026-04-04", time: "22:56:00", description: "AMIN Z***I", amount: 100000, balance: 1200000, type: "\uc785\uae08" },
  { date: "2026-04-04", time: "17:20:00", description: "NAZIR I***N", amount: 200000, balance: 1100000, type: "\uc785\uae08" },
  { date: "2026-04-03", time: "08:21:00", description: "알*심", amount: 500000, balance: 900000, type: "입금" },
  { date: "2026-04-02", time: "23:47:00", description: "AMIN Z***H", amount: 50000, balance: 400000, type: "\uc785\uae08" },
  { date: "2026-04-02", time: "23:18:00", description: "YASEEN M***F", amount: 50000, balance: 350000, type: "\uc785\uae08" },
  { date: "2026-04-02", time: "23:11:00", description: "ZAMAN Q***A", amount: 100000, balance: 300000, type: "\uc785\uae08" },
  { date: "2026-04-02", time: "23:04:00", description: "BILAL M***A", amount: 200000, balance: 200000, type: "\uc785\uae08" },
];

function formatKRW(n: number) {
  return new Intl.NumberFormat("ko-KR").format(n);
}

function formatDateLabel(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

function formatLastUpdated(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", hour12: false });
}

function DepositIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 19V5" /><path d="m5 12 7-7 7 7" />
    </svg>
  );
}

function WithdrawalIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5v14" /><path d="m19 12-7 7-7-7" />
    </svg>
  );
}

function TransferIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="m16 3 4 4-4 4" /><path d="M20 7H4" /><path d="m8 21-4-4 4-4" /><path d="M4 17h16" />
    </svg>
  );
}

function TransactionRow({ tx, transferLabel, brokerageFee, rentalDeposit, transferFee, yousafLateNote }: { tx: Transaction; transferLabel: string; brokerageFee: string; rentalDeposit: string; transferFee: string; yousafLateNote: string }) {
  const isDeposit = tx.type === "\uc785\uae08";
  const isSystem = tx.system === true;
  const noteText = tx.noteKey === "brokerageFee" ? brokerageFee : tx.noteKey === "rentalDeposit" ? rentalDeposit : tx.noteKey === "transferFee" ? transferFee : null;
  const footnoteText = tx.footnoteKey === "yousafLate" ? yousafLateNote : null;

  if (isSystem) {
    return (
      <div className="flex items-center justify-between gap-4 py-3.5">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-fj-muted/15 text-fj-muted">
            <TransferIcon />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm text-fj-dark/80">
              {tx.description} <span className="text-fj-muted">· {transferLabel}</span>
            </p>
            <p className="text-xs tabular-nums text-fj-muted">{tx.time.slice(0, 5)}</p>
          </div>
        </div>
        <div className="shrink-0 text-end" dir="ltr">
          <span className="text-sm font-medium tabular-nums text-fj-muted">
            ₩{formatKRW(tx.amount)}
          </span>
          <p className="text-[11px] tabular-nums text-fj-muted/70">₩{formatKRW(tx.balance)}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-3.5">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${isDeposit ? "bg-fj-teal/10 text-fj-teal" : "bg-fj-walnut/10 text-fj-walnut"}`}>
            {isDeposit ? <DepositIcon /> : <WithdrawalIcon />}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm text-fj-dark">
              {tx.description ? tx.description : noteText}
              {tx.description && noteText && <span className="text-fj-muted"> · {noteText}</span>}
            </p>
            <p className="text-xs tabular-nums text-fj-muted">{tx.time.slice(0, 5)}</p>
          </div>
        </div>
        <div className="shrink-0 text-end" dir="ltr">
          <span className={`text-sm font-semibold tabular-nums ${isDeposit ? "text-fj-teal" : "text-fj-walnut"}`}>
            {isDeposit ? "+" : "−"}₩{formatKRW(tx.amount)}
          </span>
          <p className="text-[11px] tabular-nums text-fj-muted">₩{formatKRW(tx.balance)}</p>
        </div>
      </div>
      {footnoteText && (
        <p className="ms-11 mt-1.5 text-[11px] italic leading-relaxed text-fj-muted">
          {footnoteText}
        </p>
      )}
    </div>
  );
}

function TransactionList({ transactions, noTxText, transferLabel, brokerageFee, rentalDeposit, transferFee, yousafLateNote }: { transactions: Transaction[]; noTxText: string; transferLabel: string; brokerageFee: string; rentalDeposit: string; transferFee: string; yousafLateNote: string }) {
  if (transactions.length === 0) {
    return <p className="py-12 text-center text-sm text-fj-dark/70">{noTxText}</p>;
  }

  const grouped: { date: string; label: string; txs: Transaction[] }[] = [];
  for (const tx of transactions) {
    const last = grouped[grouped.length - 1];
    if (last && last.date === tx.date) {
      last.txs.push(tx);
    } else {
      grouped.push({ date: tx.date, label: formatDateLabel(tx.date), txs: [tx] });
    }
  }

  return (
    <div>
      {grouped.map((group, gi) => (
        <div key={group.date}>
          {gi > 0 && <div className="border-t border-fj-border" />}
          <p className="pb-1 pt-4 text-xs font-medium uppercase tracking-wider text-fj-muted">
            {group.label}
          </p>
          <div className="divide-y divide-fj-border/50">
            {group.txs.map((tx, i) => (
              <TransactionRow key={`${tx.date}-${tx.time}-${i}`} tx={tx} transferLabel={transferLabel} brokerageFee={brokerageFee} rentalDeposit={rentalDeposit} transferFee={transferFee} yousafLateNote={yousafLateNote} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function CopyButton({ text, copiedText, copyText }: { text: string; copiedText: string; copyText: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      aria-live="polite" className="ms-2 min-h-[44px] inline-flex items-center rounded px-2.5 py-1.5 text-xs cursor-pointer text-fj-muted transition-colors hover:bg-fj-subtle hover:text-fj-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fj-gold focus-visible:ring-offset-1"
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
    >
      {copied ? copiedText : copyText}
    </button>
  );
}

interface DonationLedgerProps {
  lang: string;
  dict: DonationDict;
}

export function DonationLedger({ lang, dict: d }: DonationLedgerProps) {
  const isRtl = lang === "ur" || lang === "ar";

  const allTransactions = [...fajrTransactions, ...legacyTransactions];
  const legacyPendingBalance = legacyTransactions[0].balance;
  const totalBalance = fajrBalance + legacyPendingBalance;
  const donationCount = allTransactions.filter((tx) => tx.type === "입금" && !tx.system).length;
  const lastUpdated = fajrLastUpdated;
  const inflows = allTransactions.filter((tx) => tx.type === "입금" && !tx.system);
  const outflows = allTransactions.filter((tx) => tx.type === "출금" && !tx.system);

  return (
    <section className="py-16 sm:py-24" dir={isRtl ? "rtl" : "ltr"}>
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="mt-6 text-3xl font-bold text-fj-dark sm:text-4xl">
            {d.title}
          </h1>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-fj-dark/70">
            {d.desc}
          </p>
          <div className="mx-auto mt-4 inline-flex items-center gap-1.5 rounded-full border border-fj-border px-3 py-1">
            <svg aria-hidden="true" className="h-3 w-3 text-fj-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
            </svg>
            <span className="text-xs text-fj-muted">{d.location}</span>
          </div>
        </div>

        {/* Photos */}
        <div className="mt-12">
          <p className="mb-5 text-center text-xs uppercase tracking-wider text-fj-muted">{d.leasing}</p>
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <div className="col-span-2">
              <Image src="/images/donation/KakaoTalk_20250407_101913274_01.jpg" alt="Building exterior" width={800} height={450} priority className="w-full rounded-lg object-cover aspect-video" />
            </div>
            <Image src="/images/donation/KakaoTalk_20250407_101913274_03.jpg" alt="Street perspective" width={400} height={300} className="w-full rounded-lg object-cover aspect-[4/3]" />
            <Image src="/images/donation/KakaoTalk_20250407_121758416_05.jpg" alt="Parking area" width={400} height={300} className="w-full rounded-lg object-cover aspect-[4/3]" />
            <div className="col-span-2">
              <Image src="/images/donation/exterior-road.png" alt="Road view" width={800} height={400} className="w-full rounded-lg object-cover aspect-[2/1]" />
            </div>
          </div>

          <p className="mb-3 mt-6 text-center text-[11px] uppercase tracking-wider text-fj-muted/60">{d.inside}</p>
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <div className="relative col-span-2">
              <Image src="/images/donation/KakaoTalk_20250407_121758416_01.jpg" alt="Interior — Qibla direction" width={800} height={450} className="w-full rounded-lg object-cover aspect-video" />
              <span className="absolute bottom-2.5 left-2.5 inline-flex items-center gap-1.5 rounded-full bg-fj-dark/70 px-3 py-1.5 text-[11px] font-medium text-white backdrop-blur-sm">
                <svg aria-hidden="true" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 2v4" /><path d="M12 18v4" /><path d="m4.93 4.93 2.83 2.83" /><path d="m16.24 16.24 2.83 2.83" /><path d="M2 12h4" /><path d="M18 12h4" /><path d="M12 12l-3-8" /></svg>
                {d.qibla}
              </span>
            </div>
            <Image src="/images/donation/KakaoTalk_20250407_121758416_02.jpg" alt="Interior wide" width={400} height={300} className="w-full rounded-lg object-cover aspect-[4/3]" />
            <Image src="/images/donation/KakaoTalk_20250407_121758416_03.jpg" alt="Interior side" width={400} height={300} className="w-full rounded-lg object-cover aspect-[4/3]" />
            <div className="col-span-2">
              <Image src="/images/donation/KakaoTalk_20250407_121758416_04.jpg" alt="Interior panoramic" width={800} height={400} className="w-full rounded-lg object-cover aspect-[2/1]" />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] tabular-nums text-fj-muted">
            <span>{d.specs.land}</span><span className="text-fj-border">·</span>
            <span>{d.specs.floor}</span><span className="text-fj-border">·</span>
            <span>{d.specs.floor1}</span><span className="text-fj-border">·</span>
            <span>{d.specs.south}</span>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-3 sm:gap-3">
            <div className="flex items-start gap-3 rounded-lg border border-fj-border px-3.5 py-3 sm:flex-col sm:items-center sm:text-center">
              <svg aria-hidden="true" className="h-5 w-5 shrink-0 text-fj-gold sm:mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
              <p className="text-[11px] leading-snug text-fj-muted sm:mt-2">{d.sistersArea}</p>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-fj-border px-3.5 py-3 sm:flex-col sm:items-center sm:text-center">
              <svg aria-hidden="true" className="h-5 w-5 shrink-0 text-fj-gold sm:mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4" /><path d="M16 2v4" /><rect x="2" y="4" width="20" height="6" rx="2" /><path d="M2 10v8a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-8" /><path d="M10 16h4" /></svg>
              <p className="text-[11px] leading-snug text-fj-muted sm:mt-2"><span className="text-fj-dark font-medium">{d.restroomsLabel}</span> — {d.restroomsDesc}</p>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-fj-border px-3.5 py-3 sm:flex-col sm:items-center sm:text-center">
              <svg aria-hidden="true" className="h-5 w-5 shrink-0 text-fj-gold sm:mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" /><path d="M3 9V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4" /><line x1="12" y1="13" x2="12" y2="17" /></svg>
              <p className="text-[11px] leading-snug text-fj-muted sm:mt-2">{d.kitchenLabel}</p>
            </div>
          </div>

          <div className="mt-5 overflow-hidden rounded-lg border border-fj-border">
            <div className="relative">
              <Image src="/images/donation/bus-stops-map.png" alt="Bus stops map" width={800} height={300} className="w-full object-cover max-h-48" />
              <span className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1.5 rounded-full bg-fj-dark/70 px-3 py-1.5 text-[11px] font-medium text-white backdrop-blur-sm">
                <svg aria-hidden="true" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="14" rx="2" /><path d="M3 17h18" /><circle cx="8" cy="17" r="2" /><circle cx="16" cy="17" r="2" /></svg>
                {d.busStops}
              </span>
            </div>
            <div className="border-t border-fj-border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1982.5648866016409!2d126.81820475884045!3d33.311928346418895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x350d08de0839b65b%3A0x97ee6a49e9b4e2c!2s31%20Pyoseondongseo-ro%2C%20Pyoseon-myeon%2C%20Seogwipo%2C%20Jeju-do!5e0!3m2!1sen!2skr!4v1775359567921!5m2!1sen!2skr"
                className="h-48 w-full border-0 sm:h-64"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Musalla location"
              />
            </div>
          </div>
        </div>

        {/* Amount raised */}
        <div className="-mx-4 mt-12 rounded-xl bg-fj-surface px-4 py-10 text-center sm:-mx-6 sm:px-6">
          <p className="text-xs uppercase tracking-wider text-fj-gold">{d.raisedSoFar}</p>
          <p className="mt-3 text-3xl font-bold tabular-nums text-fj-dark sm:text-4xl" dir="ltr">
            <span className="text-fj-gold/60 font-normal">₩</span>{formatKRW(totalBalance)}
          </p>
          <div className="mx-auto mt-4 h-px w-12 bg-fj-gold/30" />
          <p className="mt-4 text-xs text-fj-muted">
            {donationCount} {d.transactions} · {d.synced} {formatLastUpdated(lastUpdated)}
          </p>
        </div>

        {/* Transactions */}
        <div className="mt-10">
          <Tabs defaultValue="all">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="all">{d.all}</TabsTrigger>
                <TabsTrigger value="입금">{d.in}</TabsTrigger>
                <TabsTrigger value="출금">{d.out}</TabsTrigger>
              </TabsList>
            </div>
            <div className="mt-4">
              <TabsContent value="all">
                <p className="pb-1 text-[11px] font-semibold uppercase tracking-wider text-fj-teal">{d.phase2Label}</p>
                <TransactionList transactions={fajrTransactions} noTxText={d.noTx} transferLabel={d.transferLabel} brokerageFee={d.brokerageFee} rentalDeposit={d.rentalDeposit} transferFee={d.transferFee} yousafLateNote={d.yousafLateNote} />
                <div className="my-6 flex items-center gap-3">
                  <div className="h-px flex-1 bg-fj-border" />
                  <span className="text-[10px] uppercase tracking-widest text-fj-muted">{d.phase1Label}</span>
                  <div className="h-px flex-1 bg-fj-border" />
                </div>
                <p className="whitespace-pre-line pb-2 text-center text-[11px] leading-relaxed text-fj-muted">{d.phase1Note}</p>
                <TransactionList transactions={legacyTransactions} noTxText={d.noTx} transferLabel={d.transferLabel} brokerageFee={d.brokerageFee} rentalDeposit={d.rentalDeposit} transferFee={d.transferFee} yousafLateNote={d.yousafLateNote} />
              </TabsContent>
              <TabsContent value="입금">
                <TransactionList transactions={inflows} noTxText={d.noTx} transferLabel={d.transferLabel} brokerageFee={d.brokerageFee} rentalDeposit={d.rentalDeposit} transferFee={d.transferFee} yousafLateNote={d.yousafLateNote} />
              </TabsContent>
              <TabsContent value="출금">
                <TransactionList transactions={outflows} noTxText={d.noOutTx} transferLabel={d.transferLabel} brokerageFee={d.brokerageFee} rentalDeposit={d.rentalDeposit} transferFee={d.transferFee} yousafLateNote={d.yousafLateNote} />
              </TabsContent>
            </div>
          </Tabs>
        </div>

        <p className="mt-6 text-center text-xs text-fj-dark/70">{d.privacy}</p>
        <p className="mt-1 text-center text-xs text-fj-muted">{d.manualUpdate}</p>

        {/* Registration Certificate */}
        <div className="mt-12 flex flex-col items-center gap-3">
          <div className="overflow-hidden rounded-lg border border-fj-border shadow-sm">
            <Image
              src="/images/donation/20260407_160627.jpg"
              alt="Fajr Jeju Registration Certificate (고유번호증)"
              width={400}
              height={560}
              className="w-full max-w-[400px]"
            />
          </div>
          <p className="text-xs text-fj-muted">{d.regCaption}</p>
        </div>

        {/* Account CTA */}
        <div className="mt-10 border-t border-fj-border pt-8 text-center">
          <p className="text-sm text-fj-dark/70">{d.contribute}</p>
          <div className="mt-4 inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-lg border border-fj-border px-4 py-2.5">
            <span className="text-xs text-fj-muted">NH</span>
            <span className="text-sm tabular-nums font-semibold text-fj-dark">351-1397-5687-73</span>
            <span className="text-xs text-fj-muted">파즈르제주 (Fajr Jeju)</span>
            <CopyButton text="351139756873" copiedText={d.copied} copyText={d.copy} />
          </div>
        </div>

        {/* Closing */}
        <p className="mt-10 text-center text-sm text-fj-dark/50">{d.closing}</p>
      </div>
    </section>
  );
}
