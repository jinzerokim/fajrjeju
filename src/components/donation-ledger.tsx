"use client";

import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const donationLocales = ["en", "ko", "id", "ur"] as const;
type DonationLocale = (typeof donationLocales)[number];

type Dict = {
  title: string; desc: string; location: string; leasing: string; inside: string;
  sistersArea: string; restroomsLabel: string; restroomsDesc: string;
  kitchenLabel: string; busStops: string; qibla: string; raisedSoFar: string;
  transactions: string; synced: string; all: string; in: string; out: string;
  noTx: string; noOutTx: string; contribute: string; privacy: string; copied: string; copy: string;
  specs: { land: string; floor: string; floor1: string; south: string };
};

const t: Record<DonationLocale, Dict> = {
  en: {
    title: "Pyoseon Musalla Fund",
    desc: "There\u2019s nowhere to pray in southern Jeju. Together, we\u2019re opening a musalla in Pyoseon \u2014 and every won is accounted for, right here.",
    location: "1F, 31 Pyoseondongseo-ro, Seogwipo-si, Jeju",
    leasing: "Our future space",
    inside: "Inside \u2014 58.9m\u00b2",
    sistersArea: "Sisters\u2019 area in the back",
    restroomsLabel: "2 restrooms",
    restroomsDesc: "1 indoor + 1 outdoor for wudu",
    kitchenLabel: "Small kitchen + utility room",
    busStops: "Bus stops nearby",
    qibla: "Faces the Qibla",
    raisedSoFar: "Raised so far",
    transactions: "donations",
    synced: "updated",
    all: "All", in: "In", out: "Out",
    noTx: "Be the first to contribute.",
    noOutTx: "No expenses yet.",
    contribute: "Every amount counts. Send to the account below \u2014 your name appears here instantly.",
    privacy: "Names are partially hidden for privacy.",
    copied: "Copied!", copy: "Copy",
    specs: { land: "Land 601m\u00b2", floor: "58.9m\u00b2", floor1: "1F", south: "South-facing" },
  },
  ko: {
    title: "\ud45c\uc120 \ubb34\uc0b4\ub77c \ud380\ub4dc",
    desc: "\uc81c\uc8fc \ub0a8\ubd80\uc5d0\ub294 \uae30\ub3c4\ud560 \uacf3\uc774 \uc5c6\uc2b5\ub2c8\ub2e4. \ud45c\uc120\uc5d0 \ud568\uaed8 \ubb34\uc0b4\ub77c\ub97c \ub9cc\ub4e4\uace0 \uc788\uc73c\uba70, \ubaa8\ub4e0 \ubaa8\uae08 \ub0b4\uc5ed\uc744 \uc5ec\uae30\uc5d0 \uacf5\uac1c\ud569\ub2c8\ub2e4.",
    location: "1\uce35, \uc11c\uadc0\ud3ec\uc2dc \ud45c\uc120\uba74 \ud45c\uc120\ub3d9\uc11c\ub85c 31",
    leasing: "\uc784\ub300 \uc608\uc815 \uacf5\uac04",
    inside: "\ub0b4\ubd80 \u2014 58.9m\u00b2 (17.8\ud3c9)",
    sistersArea: "\ud6c4\ubc29 \uc5ec\uc131 \uae30\ub3c4 \uacf5\uac04",
    restroomsLabel: "\ud654\uc7a5\uc2e4 2\uac1c",
    restroomsDesc: "\uc2e4\ub0b4 1 + \uc2e4\uc678 1(\uc6b0\ub450\uc6a9)",
    kitchenLabel: "\uac04\uc774\uc8fc\ubc29 + \uc218\ub0a9\uacf5\uac04",
    busStops: "\ubc84\uc2a4 \uc815\ub958\uc7a5 \ubc14\ub85c \uc55e",
    qibla: "\ud0a4\ube14\ub77c \ubc29\ud5a5",
    raisedSoFar: "\ubaa8\uae08\uc561",
    transactions: "\uac74",
    synced: "\uc5c5\ub370\uc774\ud2b8",
    all: "\uc804\uccb4", in: "\uc785\uae08", out: "\ucd9c\uae08",
    noTx: "\uccab \ubc88\uc9f8 \ud6c4\uc6d0\uc790\uac00 \ub418\uc5b4\uc8fc\uc138\uc694.",
    noOutTx: "아직 지출 내역이 없습니다.",
    contribute: "\uc18c\uc561\uc774\ub77c\ub3c4 \ud070 \ud798\uc774 \ub429\ub2c8\ub2e4. \uc544\ub798 \uacc4\uc88c\ub85c \uc785\uae08\ud558\uba74 \uc5ec\uae30\uc5d0 \ubc14\ub85c \ud45c\uc2dc\ub429\ub2c8\ub2e4.",
    privacy: "\uae30\ubd80\uc790\uba85\uc740 \uc77c\ubd80 \uac00\ub824\uc838 \uc788\uc2b5\ub2c8\ub2e4.",
    copied: "\ubcf5\uc0ac\ub428!", copy: "\ubcf5\uc0ac",
    specs: { land: "\ub300\uc9c0 601m\u00b2", floor: "58.9m\u00b2", floor1: "1\uce35", south: "\ub0a8\ud5a5" },
  },
  id: {
    title: "Dana Musala Pyoseon",
    desc: "Di Jeju selatan belum ada tempat salat. Bersama-sama kita buka musala di Pyoseon \u2014 setiap rupiah tercatat di sini.",
    location: "Lt.1, 31 Pyoseondongseo-ro, Seogwipo-si, Jeju",
    leasing: "Calon lokasi",
    inside: "Dalam \u2014 58,9m\u00b2",
    sistersArea: "Area akhwat di belakang",
    restroomsLabel: "2 kamar mandi",
    restroomsDesc: "1 dalam + 1 luar untuk wudu",
    kitchenLabel: "Dapur kecil + ruang serbaguna",
    busStops: "Halte bus dekat",
    qibla: "Menghadap kiblat",
    raisedSoFar: "Terkumpul",
    transactions: "donasi",
    synced: "diperbarui",
    all: "Semua", in: "Masuk", out: "Keluar",
    noTx: "Jadilah yang pertama berdonasi.",
    noOutTx: "Belum ada pengeluaran.",
    contribute: "Berapapun berarti. Transfer ke rekening di bawah \u2014 langsung tampil di sini.",
    privacy: "Nama donatur sebagian disamarkan.",
    copied: "Tersalin!", copy: "Salin",
    specs: { land: "Tanah 601m\u00b2", floor: "58,9m\u00b2", floor1: "Lt.1", south: "Hadap selatan" },
  },
  ur: {
    title: "\u067e\u06cc\u0648\u0633\u06cc\u0648\u0646 \u0645\u0635\u0644\u06cc\u0670 \u0641\u0646\u0688",
    desc: "\u062c\u06cc\u062c\u0648 \u06a9\u06d2 \u062c\u0646\u0648\u0628 \u0645\u06cc\u06ba \u0646\u0645\u0627\u0632 \u06a9\u06cc \u06a9\u0648\u0626\u06cc \u062c\u06af\u06c1 \u0646\u06c1\u06cc\u06ba\u06d4 \u0622\u0626\u06cc\u06d2 \u0645\u0644 \u06a9\u0631 \u067e\u06cc\u0648\u0633\u06cc\u0648\u0646 \u0645\u06cc\u06ba \u0645\u0635\u0644\u06cc\u0670 \u0628\u0646\u0627\u0626\u06cc\u06ba \u2014 \u06c1\u0631 \u067e\u0627\u0626\u06cc \u06a9\u0627 \u062d\u0633\u0627\u0628 \u06cc\u06c1\u0627\u06ba \u0645\u0648\u062c\u0648\u062f \u06c1\u06d2\u06d4",
    location: "\u067e\u06c1\u0644\u06cc \u0645\u0646\u0632\u0644\u060c 31 \u067e\u06cc\u0648\u0633\u06cc\u0648\u0646\u062f\u0648\u0646\u06af\u0633\u06cc\u0648-\u0631\u0648\u060c \u0633\u06cc\u0648\u06af\u0648\u06cc\u067e\u0648",
    leasing: "\u06c1\u0645\u0627\u0631\u06cc \u0622\u0626\u0646\u062f\u06c1 \u062c\u06af\u06c1",
    inside: "\u0627\u0646\u062f\u0631 \u2014 58.9 \u0645\u0631\u0628\u0639 \u0645\u06cc\u0679\u0631",
    sistersArea: "\u067e\u0686\u06be\u0644\u06d2 \u062e\u0648\u0627\u062a\u06cc\u0646 \u06a9\u0627 \u062d\u0635\u06c1",
    restroomsLabel: "2 \u0628\u0627\u062b\u0631\u0648\u0645",
    restroomsDesc: "1 \u0627\u0646\u062f\u0631 + 1 \u0628\u0627\u06c1\u0631 \u0648\u0636\u0648 \u06a9\u06d2 \u0644\u06cc\u06d2",
    kitchenLabel: "\u0686\u06be\u0648\u0679\u0627 \u06a9\u0686\u0646 + \u0627\u0636\u0627\u0641\u06cc \u06a9\u0645\u0631\u06c1",
    busStops: "\u0628\u0633 \u0627\u0633\u0679\u0627\u067e \u0642\u0631\u06cc\u0628",
    qibla: "\u0642\u0628\u0644\u06c1 \u0631\u062e",
    raisedSoFar: "\u0627\u0628 \u062a\u06a9",
    transactions: "\u0686\u0646\u062f\u06d2",
    synced: "\u0627\u067e\u0688\u06cc\u0679",
    all: "\u0633\u0628", in: "\u0622\u0645\u062f", out: "\u062e\u0631\u0686",
    noTx: "\u067e\u06c1\u0644\u06d2 \u0686\u0646\u062f\u06c1 \u062f\u06cc\u0646\u06d2 \u0648\u0627\u0644\u06d2 \u0628\u0646\u06cc\u06ba\u06d4",
    noOutTx: "ابھی تک کوئی خرچ نہیں۔",
    contribute: "\u062a\u06be\u0648\u0691\u0627 \u0628\u06be\u06cc \u0628\u06c1\u062a \u06c1\u06d2\u06d4 \u0646\u06cc\u0686\u06d2 \u0627\u06a9\u0627\u0624\u0646\u0679 \u0645\u06cc\u06ba \u0628\u06be\u06cc\u062c\u06cc\u06ba \u2014 \u0622\u067e \u06a9\u0627 \u0646\u0627\u0645 \u0641\u0648\u0631\u0627\u064b \u06cc\u06c1\u0627\u06ba \u0646\u0638\u0631 \u0622\u0626\u06d2 \u06af\u0627\u06d4",
    privacy: "\u0646\u0627\u0645 \u067e\u0631\u0627\u0626\u06cc\u0648\u06cc\u0633\u06cc \u06a9\u06cc \u062e\u0627\u0637\u0631 \u062c\u0632\u0648\u06cc \u0686\u06be\u067e\u06d2 \u06c1\u06cc\u06ba\u06d4",
    copied: "\u06c1\u0648 \u06af\u06cc\u0627!", copy: "\u06a9\u0627\u067e\u06cc",
    specs: { land: "\u0632\u0645\u06cc\u0646 601\u0645\u06cc\u0679\u0631", floor: "58.9\u0645\u06cc\u0679\u0631", floor1: "\u067e\u06c1\u0644\u06cc \u0645\u0646\u0632\u0644", south: "\u062c\u0646\u0648\u0628 \u0631\u062e" },
  },
};

const localeLabels: Record<DonationLocale, { name: string; short: string }> = {
  en: { name: "English", short: "EN" },
  ko: { name: "\ud55c\uad6d\uc5b4", short: "\ud55c" },
  id: { name: "Indonesia", short: "ID" },
  ur: { name: "\u0627\u0631\u062f\u0648", short: "\u0627\u0631" },
};

interface Transaction {
  date: string;
  time: string;
  description: string;
  amount: number;
  balance: number;
  type: "\uc785\uae08" | "\ucd9c\uae08";
}

const lastUpdated = "2026-04-06T00:26:00";

const transactions: Transaction[] = [
  { date: "2026-04-06", time: "00:26:00", description: "ALI M***SSA", amount: 500000, balance: 4196000, type: "\uc785\uae08" },
  { date: "2026-04-05", time: "22:04:00", description: "TALHA M***A", amount: 186000, balance: 3696000, type: "\uc785\uae08" },
  { date: "2026-04-05", time: "19:37:00", description: "KHURSHID S***A", amount: 200000, balance: 3510000, type: "\uc785\uae08" },
  { date: "2026-04-05", time: "17:39:00", description: "AKHTAR S***H", amount: 100000, balance: 3310000, type: "\uc785\uae08" },
  { date: "2026-04-05", time: "17:24:00", description: "ZAHID", amount: 20000, balance: 3210000, type: "\uc785\uae08" },
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
  { date: "2026-04-03", time: "08:21:00", description: "\uc54c*\uce74\uc2ec", amount: 500000, balance: 900000, type: "\uc785\uae08" },
  { date: "2026-04-02", time: "23:47:00", description: "AMIN Z***H", amount: 50000, balance: 400000, type: "\uc785\uae08" },
  { date: "2026-04-02", time: "23:18:00", description: "YASEEN M***F", amount: 50000, balance: 350000, type: "\uc785\uae08" },
  { date: "2026-04-02", time: "23:11:00", description: "ZAMAN Q***A", amount: 100000, balance: 300000, type: "\uc785\uae08" },
  { date: "2026-04-02", time: "23:04:00", description: "BILAL M***A", amount: 200000, balance: 200000, type: "\uc785\uae08" },
];

const currentBalance = transactions[0].balance;
const txCount = transactions.length;

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

function TransactionRow({ tx }: { tx: Transaction }) {
  const isDeposit = tx.type === "\uc785\uae08";

  return (
    <div className="flex items-center justify-between gap-4 py-3.5">
      <div className="flex items-center gap-3 min-w-0">
        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${isDeposit ? "bg-fj-teal/10 text-fj-teal" : "bg-fj-walnut/10 text-fj-walnut"}`}>
          {isDeposit ? <DepositIcon /> : <WithdrawalIcon />}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm text-fj-dark">{tx.description}</p>
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
  );
}

function TransactionList({ transactions, noTxText }: { transactions: Transaction[]; noTxText: string }) {
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
              <TransactionRow key={`${tx.date}-${tx.time}-${i}`} tx={tx} />
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

function LangSwitcher({ lang, onChange }: { lang: DonationLocale; onChange: (l: DonationLocale) => void }) {
  return (
    <div className="flex items-center justify-center gap-1.5 text-xs text-fj-muted" dir="ltr">
      {donationLocales.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => onChange(l)}
          className={`min-h-[44px] min-w-[44px] rounded cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fj-gold focus-visible:ring-offset-1 ${l === lang ? "bg-fj-dark text-white" : "hover:bg-fj-subtle"}`}
        >
          {localeLabels[l].short}
        </button>
      ))}
    </div>
  );
}

export function DonationLedger() {
  const [lang, setLang] = useState<DonationLocale>("en");
  const d = t[lang];
  const isRtl = lang === "ur";


  return (
    <section className="py-16 sm:py-24" dir={isRtl ? "rtl" : "ltr"}>
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        {/* Header */}
        <div className="text-center">
          <LangSwitcher lang={lang} onChange={setLang} />
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
        <div className="mt-12 border-y border-fj-border py-8 text-center">
          <p className="text-xs uppercase tracking-wider text-fj-muted">{d.raisedSoFar}</p>
          <p className="mt-2 text-3xl font-bold tabular-nums text-fj-dark sm:text-4xl" dir="ltr">
            <span className="text-fj-muted font-normal">₩</span>{formatKRW(currentBalance)}
          </p>
          <p className="mt-2 text-xs text-fj-muted">
            {txCount} {d.transactions} · {d.synced} {formatLastUpdated(lastUpdated)}
          </p>
        </div>

        {/* Transactions */}
        <div className="mt-10">
          <Tabs defaultValue="all" >
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="all">{d.all}</TabsTrigger>
                <TabsTrigger value="\uc785\uae08">{d.in}</TabsTrigger>
                <TabsTrigger value="\ucd9c\uae08">{d.out}</TabsTrigger>
              </TabsList>
              <Badge variant="outline" className="text-xs tabular-nums">{formatLastUpdated(lastUpdated)}</Badge>
            </div>
            <div className="mt-4">
              <TabsContent value="all"><TransactionList transactions={transactions} noTxText={d.noTx} /></TabsContent>
              <TabsContent value="입금"><TransactionList transactions={transactions.filter((tx) => tx.type === "입금")} noTxText={d.noTx} /></TabsContent>
              <TabsContent value="출금"><TransactionList transactions={transactions.filter((tx) => tx.type === "출금")} noTxText={d.noOutTx} /></TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Account */}
        <div className="mt-16 border-t border-fj-border pt-8 text-center">
          <p className="text-sm text-fj-dark/70">{d.contribute}</p>
          <div className="mt-4 inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-lg border border-fj-border px-4 py-2.5">
            <span className="text-xs text-fj-muted">NH</span>
            <span className="text-sm tabular-nums font-semibold text-fj-dark">302-1632-7338-11</span>
            <span className="text-xs text-fj-muted">파즈르제주</span>
            <CopyButton text="3021632733811" copiedText={d.copied} copyText={d.copy} />
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-fj-dark/70">{d.privacy}</p>
      </div>
    </section>
  );
}
