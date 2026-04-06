# Website IA Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure Fajr Jeju website from 2 pages (home + donation) to 3 pages (home + musalla + fund) with shared layout, reflecting the org/musalla/fund hierarchy.

**Architecture:** Extract header/footer from home page into shared layout. Lighten home page (remove musalla gallery + location detail). Create new musalla page with unified space+prayer+community content. Move donation route from `/donation` to `/musalla/fund`.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, shadcn/ui

**Verification:** `npm run build` after every task. Build must pass before moving to next task.

**IMPORTANT:** Check `node_modules/next/dist/docs/` before writing any Next.js code. Do not rely on training data patterns.

**DESIGN UPDATE (commit 29f221f):** The codebase now uses a warm Islamic aesthetic. When implementing, use the CURRENT design tokens from `page.tsx`, not the ones in the code blocks below. Key differences:
- `bg-fj-walnut` replaces `bg-fj-dark` for hero overlays, banners, CTA buttons
- `bg-fj-bg` (#FDFBF9 warm cream) replaces `bg-white` for page backgrounds
- Header: no `border-b`, uses `h-px bg-gradient-to-r from-transparent via-fj-gold/40 to-transparent` brass accent line
- Footer: same brass gradient line, `bg-fj-surface` background
- Section headings: double brass lines `<div className="h-px w-8 bg-fj-gold" />` on BOTH sides of heading text
- Card tags: `text-fj-walnut` instead of `text-fj-teal`
- Announcements section: has `bg-pattern-islamic` overlay with `opacity-[0.35]`
- Icon colors: `text-fj-gold` for info bar icons (not teal)
- Images have `ring-1 ring-fj-border` instead of bare rounded
- Donate button in header: `bg-fj-walnut` not `bg-fj-teal`
- **Reference `src/app/[lang]/page.tsx` for exact class names and patterns**

---

## Task 1: Update dictionary files with new keys

All 5 locale JSON files need new keys for the nav and musalla page content. Do this first so all subsequent tasks can reference dictionary keys.

**Files:**
- Modify: `src/app/[lang]/dictionaries/en.json`
- Modify: `src/app/[lang]/dictionaries/ko.json`
- Modify: `src/app/[lang]/dictionaries/id.json`
- Modify: `src/app/[lang]/dictionaries/ur.json`
- Modify: `src/app/[lang]/dictionaries/ar.json`

- [ ] **Step 1: Update `en.json`**

Replace the entire file with:

```json
{
  "nav": {
    "home": "Home",
    "musalla": "Al-Fajr Pyoseon"
  },
  "hero": {
    "badge": "Jeju Island, South Korea",
    "title": "Fajr Jeju",
    "subtitle": "Supporting the Muslim community in Jeju — from the first musalla in southern Jeju to connecting brothers and sisters across the island."
  },
  "info": {
    "nextPrayer": "Next Prayer",
    "prayerPlaceholder": "Coming soon",
    "locationShort": "Pyoseon, Seogwipo",
    "musallaLink": "Al-Fajr Pyoseon →"
  },
  "mission": {
    "label": "Our Mission",
    "title": "A home for every Muslim in Jeju",
    "desc": "Hundreds of Muslim workers and families live across Jeju Island, many far from the only mosque in Jeju City. Fajr Jeju exists to bridge that gap — operating a musalla, building community, and connecting Muslims across the island."
  },
  "fund": {
    "title": "Help us open the musalla",
    "desc": "Every donation goes directly to securing and setting up the Pyoseon musalla space.",
    "cta": "View Donation Ledger"
  },
  "notices": {
    "title": "Announcements",
    "tagNotice": "Notice",
    "tagEvent": "Event",
    "tagUpdate": "Update",
    "placeholder1": "Musalla opening schedule will be announced soon",
    "placeholder2": "Community iftar gathering — details coming",
    "placeholder3": "Donation ledger updated with latest transactions"
  },
  "location": {
    "label": "Location",
    "title": "Find Us",
    "address": "1F, 31 Pyoseondongseo-ro, Seogwipo-si, Jeju"
  },
  "footer": {
    "org": "Fajr Jeju — Non-profit Muslim community organization in Jeju Island, South Korea",
    "site": "fajrjeju.com"
  },
  "musalla": {
    "title": "Al-Fajr Pyoseon Musalla",
    "subtitle": "Prayer space & community hub",
    "badge": "Southern Jeju",
    "prayer": {
      "title": "Prayer",
      "nextPrayer": "Next Prayer",
      "placeholder": "Coming soon",
      "qibla": "Qibla-aligned",
      "facility": "58.9m² — open to all"
    },
    "space": {
      "title": "Our Space",
      "sistersArea": "Sisters' area in the back",
      "restrooms": "2 restrooms (1 for wudu)",
      "kitchen": "Small kitchen + utility room",
      "specs": {
        "land": "Land 601m²",
        "floor": "58.9m²",
        "floor1": "1F",
        "south": "South-facing"
      }
    },
    "community": {
      "title": "Community",
      "desc": "A gathering place for Muslims in southern Jeju — prayer, iftar, classes, and mutual support.",
      "placeholder1": "Community iftar gathering",
      "placeholder2": "Quran study circle",
      "placeholder3": "New Muslim welcome meetup"
    },
    "fund": {
      "title": "Help build this space",
      "desc": "Every won raised and spent — fully transparent.",
      "cta": "View Donation Ledger"
    }
  }
}
```

- [ ] **Step 2: Update `ko.json`**

Replace the entire file with:

```json
{
  "nav": {
    "home": "홈",
    "musalla": "알 파즈르 표선"
  },
  "hero": {
    "badge": "대한민국 제주도",
    "title": "파즈르 제주",
    "subtitle": "제주도 무슬림 커뮤니티를 지원합니다 — 제주 남부 최초의 무살라부터 섬 전체의 형제자매를 연결합니다."
  },
  "info": {
    "nextPrayer": "다음 예배",
    "prayerPlaceholder": "준비 중",
    "locationShort": "서귀포시 표선",
    "musallaLink": "알 파즈르 표선 →"
  },
  "mission": {
    "label": "미션",
    "title": "제주의 모든 무슬림을 위한 공간",
    "desc": "수백 명의 무슬림 노동자와 가족이 제주 전역에 살고 있지만, 제주시의 유일한 모스크에서 먼 곳에 있습니다. 파즈르 제주는 무살라를 운영하고, 커뮤니티를 만들고, 섬 전체 무슬림을 연결합니다."
  },
  "fund": {
    "title": "무살라를 함께 열어주세요",
    "desc": "모든 기부금은 표선 무살라 공간을 확보하고 준비하는 데 직접 사용됩니다.",
    "cta": "기부 내역 보기"
  },
  "notices": {
    "title": "공지사항",
    "tagNotice": "공지",
    "tagEvent": "행사",
    "tagUpdate": "업데이트",
    "placeholder1": "무살라 개방 일정 곧 공지 예정",
    "placeholder2": "커뮤니티 이프타르 모임 — 상세 안내 예정",
    "placeholder3": "기부 장부 최신 거래 내역 업데이트"
  },
  "location": {
    "label": "위치",
    "title": "오시는 길",
    "address": "제주 서귀포시 표선면 표선동서로 31, 1층"
  },
  "footer": {
    "org": "파즈르 제주 — 제주도 무슬림 비영리 커뮤니티 단체",
    "site": "fajrjeju.com"
  },
  "musalla": {
    "title": "알 파즈르 표선 무살라",
    "subtitle": "예배 공간이자 커뮤니티 허브",
    "badge": "제주 남부",
    "prayer": {
      "title": "예배",
      "nextPrayer": "다음 예배",
      "placeholder": "준비 중",
      "qibla": "키블라 방향",
      "facility": "58.9m² — 누구에게나 개방"
    },
    "space": {
      "title": "공간 소개",
      "sistersArea": "후방 여성 기도 공간",
      "restrooms": "화장실 2개 (우두용 1개)",
      "kitchen": "간이주방 + 수납공간",
      "specs": {
        "land": "대지 601m²",
        "floor": "58.9m²",
        "floor1": "1층",
        "south": "남향"
      }
    },
    "community": {
      "title": "커뮤니티",
      "desc": "제주 남부 무슬림의 모임 공간 — 예배, 이프타르, 수업, 상호 지원.",
      "placeholder1": "커뮤니티 이프타르 모임",
      "placeholder2": "꾸란 스터디",
      "placeholder3": "신규 무슬림 환영 모임"
    },
    "fund": {
      "title": "이 공간을 함께 만들어주세요",
      "desc": "모든 모금과 지출 — 완전 투명 공개.",
      "cta": "기부 내역 보기"
    }
  }
}
```

- [ ] **Step 3: Update `id.json`**

Replace the entire file with:

```json
{
  "nav": {
    "home": "Beranda",
    "musalla": "Al-Fajr Pyoseon"
  },
  "hero": {
    "badge": "Pulau Jeju, Korea Selatan",
    "title": "Fajr Jeju",
    "subtitle": "Mendukung komunitas Muslim di Jeju — dari musala pertama di Jeju selatan hingga menghubungkan saudara-saudara di seluruh pulau."
  },
  "info": {
    "nextPrayer": "Salat Berikutnya",
    "prayerPlaceholder": "Segera hadir",
    "locationShort": "Pyoseon, Seogwipo",
    "musallaLink": "Al-Fajr Pyoseon →"
  },
  "mission": {
    "label": "Misi Kami",
    "title": "Rumah bagi setiap Muslim di Jeju",
    "desc": "Ratusan pekerja dan keluarga Muslim tinggal di seluruh Pulau Jeju, banyak yang jauh dari satu-satunya masjid di Kota Jeju. Fajr Jeju hadir untuk menjembatani — mengelola musala, membangun komunitas, dan menghubungkan Muslim di seluruh pulau."
  },
  "fund": {
    "title": "Bantu kami membuka musala",
    "desc": "Setiap donasi langsung digunakan untuk mengamankan dan menyiapkan ruang musala Pyoseon.",
    "cta": "Lihat Buku Donasi"
  },
  "notices": {
    "title": "Pengumuman",
    "tagNotice": "Info",
    "tagEvent": "Acara",
    "tagUpdate": "Update",
    "placeholder1": "Jadwal pembukaan musala akan diumumkan segera",
    "placeholder2": "Kumpul iftar komunitas — detail menyusul",
    "placeholder3": "Buku donasi diperbarui dengan transaksi terbaru"
  },
  "location": {
    "label": "Lokasi",
    "title": "Temukan Kami",
    "address": "Lt.1, 31 Pyoseondongseo-ro, Seogwipo-si, Jeju"
  },
  "footer": {
    "org": "Fajr Jeju — Organisasi komunitas Muslim nirlaba di Pulau Jeju, Korea Selatan",
    "site": "fajrjeju.com"
  },
  "musalla": {
    "title": "Musala Al-Fajr Pyoseon",
    "subtitle": "Ruang salat & pusat komunitas",
    "badge": "Jeju Selatan",
    "prayer": {
      "title": "Salat",
      "nextPrayer": "Salat Berikutnya",
      "placeholder": "Segera hadir",
      "qibla": "Menghadap kiblat",
      "facility": "58,9m² — terbuka untuk semua"
    },
    "space": {
      "title": "Ruang Kami",
      "sistersArea": "Area akhwat di belakang",
      "restrooms": "2 kamar mandi (1 untuk wudu)",
      "kitchen": "Dapur kecil + ruang utilitas",
      "specs": {
        "land": "Lahan 601m²",
        "floor": "58,9m²",
        "floor1": "Lt.1",
        "south": "Menghadap selatan"
      }
    },
    "community": {
      "title": "Komunitas",
      "desc": "Tempat berkumpul Muslim di Jeju selatan — salat, iftar, kelas, dan saling membantu.",
      "placeholder1": "Kumpul iftar komunitas",
      "placeholder2": "Halaqah Al-Quran",
      "placeholder3": "Pertemuan sambutan Muslim baru"
    },
    "fund": {
      "title": "Bantu bangun ruang ini",
      "desc": "Setiap won yang masuk dan keluar — sepenuhnya transparan.",
      "cta": "Lihat Buku Donasi"
    }
  }
}
```

- [ ] **Step 4: Update `ur.json`**

Replace the entire file with:

```json
{
  "nav": {
    "home": "ہوم",
    "musalla": "الفجر پیوسون"
  },
  "hero": {
    "badge": "جیجو جزیرہ، جنوبی کوریا",
    "title": "فجر جیجو",
    "subtitle": "جیجو میں مسلم کمیونٹی کی مدد — جنوبی جیجو میں پہلی مصلّی سے لے کر پورے جزیرے میں بھائیوں اور بہنوں کو جوڑنا۔"
  },
  "info": {
    "nextPrayer": "اگلی نماز",
    "prayerPlaceholder": "جلد آ رہا ہے",
    "locationShort": "پیوسیون، سیوگویپو",
    "musallaLink": "الفجر پیوسون →"
  },
  "mission": {
    "label": "ہمارا مشن",
    "title": "جیجو میں ہر مسلمان کے لیے ایک گھر",
    "desc": "سیکڑوں مسلم کارکن اور خاندان پورے جیجو جزیرے میں رہتے ہیں۔ فجر جیجو مصلّی چلاتا ہے، کمیونٹی بناتا ہے، اور پورے جزیرے میں مسلمانوں کو جوڑتا ہے۔"
  },
  "fund": {
    "title": "مصلّی کھولنے میں مدد کریں",
    "desc": "ہر عطیہ براہ راست پیوسیون مصلّی کی جگہ کو محفوظ بنانے میں جاتا ہے۔",
    "cta": "عطیات کی تفصیل دیکھیں"
  },
  "notices": {
    "title": "اعلانات",
    "tagNotice": "نوٹس",
    "tagEvent": "تقریب",
    "tagUpdate": "اپ ڈیٹ",
    "placeholder1": "مصلّی کھولنے کا شیڈول جلد بتایا جائے گا",
    "placeholder2": "کمیونٹی افطار اجتماع — تفصیلات آ رہی ہیں",
    "placeholder3": "عطیات کی کتاب تازہ ترین لین دین کے ساتھ اپ ڈیٹ"
  },
  "location": {
    "label": "مقام",
    "title": "ہمیں تلاش کریں",
    "address": "پہلی منزل، 31 پیوسیوندونگسیو-رو، سیوگویپو-سی، جیجو"
  },
  "footer": {
    "org": "فجر جیجو — جیجو جزیرے، جنوبی کوریا میں غیر منافع بخش مسلم کمیونٹی تنظیم",
    "site": "fajrjeju.com"
  },
  "musalla": {
    "title": "الفجر پیوسون مصلّی",
    "subtitle": "نماز کی جگہ اور کمیونٹی مرکز",
    "badge": "جنوبی جیجو",
    "prayer": {
      "title": "نماز",
      "nextPrayer": "اگلی نماز",
      "placeholder": "جلد آ رہا ہے",
      "qibla": "قبلہ رخ",
      "facility": "58.9 مربع میٹر — سب کے لیے کھلی"
    },
    "space": {
      "title": "ہماری جگہ",
      "sistersArea": "پچھلے حصے میں خواتین کا علاقہ",
      "restrooms": "2 بیت الخلاء (1 وضو کے لیے)",
      "kitchen": "چھوٹا باورچی خانہ + یوٹیلیٹی روم",
      "specs": {
        "land": "زمین 601 مربع میٹر",
        "floor": "58.9 مربع میٹر",
        "floor1": "پہلی منزل",
        "south": "جنوب رخ"
      }
    },
    "community": {
      "title": "کمیونٹی",
      "desc": "جنوبی جیجو میں مسلمانوں کی ملاقات کی جگہ — نماز، افطار، کلاسیں، اور باہمی مدد۔",
      "placeholder1": "کمیونٹی افطار اجتماع",
      "placeholder2": "قرآن سٹڈی حلقہ",
      "placeholder3": "نئے مسلمانوں کا خیرمقدم"
    },
    "fund": {
      "title": "اس جگہ کو بنانے میں مدد کریں",
      "desc": "ہر وون کا حساب — مکمل طور پر شفاف۔",
      "cta": "عطیات کی تفصیل دیکھیں"
    }
  }
}
```

- [ ] **Step 5: Update `ar.json`**

Replace the entire file with:

```json
{
  "nav": {
    "home": "الرئيسية",
    "musalla": "الفجر بيوسون"
  },
  "hero": {
    "badge": "جزيرة جيجو، كوريا الجنوبية",
    "title": "فجر جيجو",
    "subtitle": "دعم المجتمع المسلم في جيجو — من أول مصلى في جنوب جيجو إلى ربط الإخوة والأخوات في جميع أنحاء الجزيرة."
  },
  "info": {
    "nextPrayer": "الصلاة التالية",
    "prayerPlaceholder": "قريباً",
    "locationShort": "بيوسيون، سيوغويبو",
    "musallaLink": "الفجر بيوسون ←"
  },
  "mission": {
    "label": "مهمتنا",
    "title": "بيت لكل مسلم في جيجو",
    "desc": "يعيش مئات العمال والعائلات المسلمة في جميع أنحاء جزيرة جيجو. فجر جيجو يدير مصلى، يبني مجتمعاً، ويربط المسلمين في جميع أنحاء الجزيرة."
  },
  "fund": {
    "title": "ساعدنا في افتتاح المصلى",
    "desc": "كل تبرع يذهب مباشرة لتأمين وتجهيز مساحة مصلى بيوسيون.",
    "cta": "عرض سجل التبرعات"
  },
  "notices": {
    "title": "الإعلانات",
    "tagNotice": "إعلان",
    "tagEvent": "فعالية",
    "tagUpdate": "تحديث",
    "placeholder1": "سيتم الإعلان عن جدول افتتاح المصلى قريباً",
    "placeholder2": "تجمع إفطار مجتمعي — التفاصيل قادمة",
    "placeholder3": "تم تحديث سجل التبرعات بأحدث المعاملات"
  },
  "location": {
    "label": "الموقع",
    "title": "اعثر علينا",
    "address": "الطابق الأول، 31 بيوسيوندونغسيو-رو، سيوغويبو-سي، جيجو"
  },
  "footer": {
    "org": "فجر جيجو — منظمة مجتمعية إسلامية غير ربحية في جزيرة جيجو، كوريا الجنوبية",
    "site": "fajrjeju.com"
  },
  "musalla": {
    "title": "مصلى الفجر بيوسون",
    "subtitle": "مساحة صلاة ومركز مجتمعي",
    "badge": "جنوب جيجو",
    "prayer": {
      "title": "الصلاة",
      "nextPrayer": "الصلاة التالية",
      "placeholder": "قريباً",
      "qibla": "باتجاه القبلة",
      "facility": "58.9 متر مربع — مفتوح للجميع"
    },
    "space": {
      "title": "مساحتنا",
      "sistersArea": "منطقة الأخوات في الخلف",
      "restrooms": "حمامان (1 للوضوء)",
      "kitchen": "مطبخ صغير + غرفة خدمات",
      "specs": {
        "land": "أرض 601 متر مربع",
        "floor": "58.9 متر مربع",
        "floor1": "الطابق الأول",
        "south": "واجهة جنوبية"
      }
    },
    "community": {
      "title": "المجتمع",
      "desc": "مكان تجمع للمسلمين في جنوب جيجو — صلاة، إفطار، دروس، ودعم متبادل.",
      "placeholder1": "تجمع إفطار مجتمعي",
      "placeholder2": "حلقة دراسة القرآن",
      "placeholder3": "لقاء ترحيب بالمسلمين الجدد"
    },
    "fund": {
      "title": "ساعد في بناء هذا المكان",
      "desc": "كل وون يُجمع ويُنفق — بشفافية كاملة.",
      "cta": "عرض سجل التبرعات"
    }
  }
}
```

- [ ] **Step 6: Run build to verify**

```bash
npm run build
```

Expected: Build passes. Dictionary shape changes don't break anything yet because the consuming components haven't been updated.

- [ ] **Step 7: Commit**

```bash
git add src/app/\[lang\]/dictionaries/
git commit -m "feat: update dictionary files for IA redesign

Add musalla page keys, nav.musalla label, info.musallaLink.
Remove unused nav keys (about, community, contact, fund label).
Update mission.desc to org-level text."
```

---

## Task 2: Extract shared header + footer into layout

Currently header and footer are inlined in `page.tsx`. Extract them into `layout.tsx` so all pages (home, musalla, fund) share the same nav.

**Files:**
- Modify: `src/app/[lang]/layout.tsx`
- Modify: `src/app/[lang]/page.tsx`

- [ ] **Step 1: Update `layout.tsx` to include shared header + footer**

The layout needs `params` to get the locale, and needs the dictionary for nav text. Replace the entire `layout.tsx`:

```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Inter, Noto_Sans_Arabic } from "next/font/google";
import { locales, localeNames, isRtl } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { hasLocale, getDictionary } from "./dictionaries";
import "../globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const notoArabic = Noto_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fajrjeju.com"),
  title: {
    default: "Fajr Jeju — Musalla & Muslim Community in Jeju",
    template: "%s | Fajr Jeju",
  },
  description:
    "Supporting the Muslim community in Jeju Island. Pyoseon Musalla fund, community resources, and transparent donation tracking.",
};

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const locale = lang as Locale;
  const dir = isRtl(locale) ? "rtl" : "ltr";
  const dict = await getDictionary(locale);

  return (
    <html lang={locale} dir={dir} className={`${inter.variable} ${notoArabic.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-fj-bg font-sans text-fj-text">
        {/* ── Header ── */}
        <header className="sticky top-0 z-50 border-b border-fj-border bg-white/95 backdrop-blur-sm">
          <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5">
            <Link href={`/${lang}`} className="text-lg font-bold tracking-tight text-fj-dark">
              Fajr Jeju
            </Link>
            <nav className="flex items-center gap-6 text-[13px] font-medium text-fj-muted">
              <Link href={`/${lang}/musalla`} className="transition-colors hover:text-fj-dark">
                {dict.nav.musalla}
              </Link>
              <div className="flex items-center gap-0.5 text-[11px]">
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
            </nav>
          </div>
        </header>

        {/* ── Content ── */}
        <main className="flex-1">{children}</main>

        {/* ── Footer ── */}
        <footer className="border-t border-fj-border bg-fj-surface">
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
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Remove header + footer from `page.tsx`**

Strip the `<header>` and `<footer>` from the home page, and remove the `<main>` wrapper (layout now provides `<main>`). Also remove the musalla gallery section and location section (they move to `/musalla`). Update the Quick Info Bar third column to link to `/musalla` instead of `/donation`. Update mission section to use org-level text.

Replace the entire `page.tsx`:

```tsx
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

  return (
    <>
      {/* ── Hero — full-width image + overlay ── */}
      <section className="relative h-[360px] sm:h-[440px]">
        <Image
          src="/images/donation/KakaoTalk_20250407_101913274_01.jpg"
          alt="Pyoseon musalla"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-fj-dark/80 via-fj-dark/40 to-fj-dark/20" />
        <div className="relative mx-auto flex h-full max-w-6xl flex-col justify-end px-5 pb-10">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-medium text-white/90 backdrop-blur-sm">
            <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 1 1 9.9 9.9L10 18.9l-4.95-4.95a7 7 0 0 1 0-9.9ZM10 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" clipRule="evenodd" />
            </svg>
            {dict.hero.badge}
          </span>
          <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            {dict.hero.title}
          </h1>
          <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-white/80">
            {dict.hero.subtitle}
          </p>
        </div>
      </section>

      {/* ── Quick Info Bar ── */}
      <section className="border-b border-fj-border bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-1 divide-y divide-fj-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {/* Prayer */}
          <div className="flex items-center gap-4 px-5 py-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-fj-teal/10">
              <svg className="h-5 w-5 text-fj-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-fj-muted">{dict.info.nextPrayer}</p>
              <p className="text-sm font-bold text-fj-dark">{dict.info.prayerPlaceholder}</p>
            </div>
          </div>
          {/* Location */}
          <div className="flex items-center gap-4 px-5 py-4">
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
          <Link href={`/${lang}/musalla`} className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-fj-surface">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-fj-teal/10">
              <svg className="h-5 w-5 text-fj-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955a1.126 1.126 0 0 1 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-fj-muted">{dict.nav.musalla}</p>
              <p className="text-sm font-bold text-fj-teal">{dict.info.musallaLink}</p>
            </div>
          </Link>
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:py-20">
          <div className="flex items-center gap-3">
            <div className="h-px w-6 bg-fj-gold" />
            <h2 className="text-lg font-bold text-fj-dark">{dict.mission.title}</h2>
          </div>
          <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-fj-muted">
            {dict.mission.desc}
          </p>
        </div>
      </section>

      {/* ── Announcements ── */}
      <section className="bg-fj-surface">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:py-20">
          <div className="flex items-center gap-3">
            <div className="h-px w-6 bg-fj-gold" />
            <h2 className="text-lg font-bold text-fj-dark">{dict.notices.title}</h2>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            <NoticeCard date="2026.04.06" title={dict.notices.placeholder1} tag={dict.notices.tagNotice} />
            <NoticeCard date="2026.04.01" title={dict.notices.placeholder2} tag={dict.notices.tagEvent} />
            <NoticeCard date="2026.03.28" title={dict.notices.placeholder3} tag={dict.notices.tagUpdate} />
          </div>
        </div>
      </section>

      {/* ── Fund Banner ── */}
      <section className="bg-fj-dark">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-5 py-14 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <h2 className="text-xl font-bold text-white">{dict.fund.title}</h2>
            <p className="mt-1 text-[14px] text-gray-400">{dict.fund.desc}</p>
          </div>
          <Link
            href={`/${lang}/musalla/fund`}
            className="shrink-0 rounded-lg bg-fj-gold px-6 py-3 text-sm font-semibold text-fj-dark transition-colors hover:bg-fj-gold-light"
          >
            {dict.fund.cta}
          </Link>
        </div>
      </section>
    </>
  );
}

function NoticeCard({ date, title, tag }: { date: string; title: string; tag: string }) {
  return (
    <div className="rounded-xl border border-fj-border bg-white p-5 transition-shadow hover:shadow-md">
      <div className="flex items-center gap-2">
        <span className="rounded bg-fj-teal/10 px-2 py-0.5 text-[10px] font-semibold text-fj-teal">{tag}</span>
        <span className="text-[11px] text-fj-muted">{date}</span>
      </div>
      <p className="mt-2.5 text-[14px] font-medium leading-snug text-fj-dark">{title}</p>
    </div>
  );
}
```

- [ ] **Step 3: Run build**

```bash
npm run build
```

Expected: Build passes. Home page renders with shared header/footer from layout. No more inline header/footer in page.tsx.

- [ ] **Step 4: Commit**

```bash
git add src/app/\[lang\]/layout.tsx src/app/\[lang\]/page.tsx
git commit -m "refactor: extract shared header/footer into layout

Move header + footer from page.tsx into layout.tsx.
All pages now share consistent nav and footer.
Lighten home page: remove musalla gallery and location detail.
Update quick info bar to link to /musalla instead of /donation."
```

---

## Task 3: Create musalla page

The unified space page at `/[lang]/musalla`. Contains prayer info, gallery, community, location, and fund banner — all content that represents the musalla + community hub.

**Files:**
- Create: `src/app/[lang]/musalla/page.tsx`

- [ ] **Step 1: Create musalla page**

Create `src/app/[lang]/musalla/page.tsx`:

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../dictionaries";
import type { Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Al-Fajr Pyoseon Musalla",
  description:
    "Prayer space and community hub in Pyoseon, southern Jeju. 58.9m², Qibla-aligned, open to all.",
};

export default async function MusallaPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const m = dict.musalla;

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative h-[320px] sm:h-[400px]">
        <Image
          src="/images/donation/KakaoTalk_20250407_101913274_01.jpg"
          alt="Al-Fajr Pyoseon Musalla"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-fj-dark/80 via-fj-dark/40 to-fj-dark/20" />
        <div className="relative mx-auto flex h-full max-w-6xl flex-col justify-end px-5 pb-10">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-medium text-white/90 backdrop-blur-sm">
            <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 1 1 9.9 9.9L10 18.9l-4.95-4.95a7 7 0 0 1 0-9.9ZM10 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" clipRule="evenodd" />
            </svg>
            {m.badge}
          </span>
          <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            {m.title}
          </h1>
          <p className="mt-2 text-[15px] leading-relaxed text-white/80">
            {m.subtitle}
          </p>
        </div>
      </section>

      {/* ── Prayer Info ── */}
      <section className="border-b border-fj-border bg-white">
        <div className="mx-auto max-w-6xl px-5 py-10 sm:py-14">
          <div className="flex items-center gap-3">
            <div className="h-px w-6 bg-fj-gold" />
            <h2 className="text-lg font-bold text-fj-dark">{m.prayer.title}</h2>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-fj-border p-5">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-fj-muted">{m.prayer.nextPrayer}</p>
              <p className="mt-1 text-lg font-bold text-fj-dark">{m.prayer.placeholder}</p>
            </div>
            <div className="rounded-xl border border-fj-border p-5">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-fj-muted">{m.prayer.qibla}</p>
              <p className="mt-1 text-lg font-bold text-fj-dark">259°W</p>
            </div>
            <div className="rounded-xl border border-fj-border p-5">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-fj-muted">{m.space.title}</p>
              <p className="mt-1 text-lg font-bold text-fj-dark">{m.prayer.facility}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Space Gallery ── */}
      <section className="bg-fj-surface">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:py-20">
          <div className="flex items-center gap-3">
            <div className="h-px w-6 bg-fj-gold" />
            <h2 className="text-lg font-bold text-fj-dark">{m.space.title}</h2>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="relative aspect-square overflow-hidden rounded-xl">
              <Image src="/images/donation/KakaoTalk_20250407_121758416_01.jpg" alt="Musalla interior 1" fill sizes="25vw" className="object-cover" />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-xl">
              <Image src="/images/donation/KakaoTalk_20250407_121758416_02.jpg" alt="Musalla interior 2" fill sizes="25vw" className="object-cover" />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-xl">
              <Image src="/images/donation/KakaoTalk_20250407_121758416_03.jpg" alt="Musalla interior 3" fill sizes="25vw" className="object-cover" />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-xl">
              <Image src="/images/donation/KakaoTalk_20250407_121758416_04.jpg" alt="Musalla interior 4" fill sizes="25vw" className="object-cover" />
            </div>
          </div>

          {/* Facility details */}
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <FacilityItem label={m.space.sistersArea} />
            <FacilityItem label={m.space.restrooms} />
            <FacilityItem label={m.space.kitchen} />
            <div className="flex flex-wrap gap-2">
              {Object.values(m.space.specs).map((spec) => (
                <span key={spec} className="rounded-full bg-fj-dark/5 px-3 py-1 text-[12px] font-medium text-fj-muted">
                  {spec}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Community ── */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:py-20">
          <div className="flex items-center gap-3">
            <div className="h-px w-6 bg-fj-gold" />
            <h2 className="text-lg font-bold text-fj-dark">{m.community.title}</h2>
          </div>
          <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-fj-muted">
            {m.community.desc}
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            <CommunityCard title={m.community.placeholder1} />
            <CommunityCard title={m.community.placeholder2} />
            <CommunityCard title={m.community.placeholder3} />
          </div>
        </div>
      </section>

      {/* ── Location ── */}
      <section className="bg-fj-surface">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 py-14 sm:grid-cols-2 sm:py-20">
          <div>
            <div className="flex items-center gap-3">
              <div className="h-px w-6 bg-fj-gold" />
              <h2 className="text-lg font-bold text-fj-dark">{dict.location.title}</h2>
            </div>
            <p className="mt-3 text-[14px] leading-relaxed text-fj-muted">
              {dict.location.address}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href="https://map.kakao.com/?q=서귀포시 표선면 표선동서로 31"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-fj-border px-4 py-2 text-[13px] font-medium text-fj-dark transition-colors hover:bg-white"
              >
                KakaoMap
                <ExternalIcon />
              </a>
              <a
                href="https://www.google.com/maps/search/?api=1&query=33.3255,126.8363"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-fj-border px-4 py-2 text-[13px] font-medium text-fj-dark transition-colors hover:bg-white"
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

      {/* ── Fund Banner ── */}
      <section className="bg-fj-dark">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-5 py-14 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <h2 className="text-xl font-bold text-white">{m.fund.title}</h2>
            <p className="mt-1 text-[14px] text-gray-400">{m.fund.desc}</p>
          </div>
          <Link
            href={`/${lang}/musalla/fund`}
            className="shrink-0 rounded-lg bg-fj-gold px-6 py-3 text-sm font-semibold text-fj-dark transition-colors hover:bg-fj-gold-light"
          >
            {m.fund.cta}
          </Link>
        </div>
      </section>
    </>
  );
}

function FacilityItem({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-fj-border bg-white p-4">
      <svg className="h-4 w-4 shrink-0 text-fj-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
      </svg>
      <p className="text-[13px] font-medium text-fj-dark">{label}</p>
    </div>
  );
}

function CommunityCard({ title }: { title: string }) {
  return (
    <div className="rounded-xl border border-fj-border bg-fj-surface p-5 transition-shadow hover:shadow-md">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-fj-teal/10">
        <svg className="h-4 w-4 text-fj-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
        </svg>
      </div>
      <p className="mt-3 text-[14px] font-medium leading-snug text-fj-dark">{title}</p>
    </div>
  );
}

function ExternalIcon() {
  return (
    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6m4-3h6v6m-11 5L21 3" />
    </svg>
  );
}
```

- [ ] **Step 2: Run build**

```bash
npm run build
```

Expected: Build passes. New `/[lang]/musalla` route is available.

- [ ] **Step 3: Commit**

```bash
git add src/app/\[lang\]/musalla/page.tsx
git commit -m "feat: add musalla page

Unified space page for Al-Fajr Pyoseon Musalla.
Sections: hero, prayer info, gallery, community, location, fund banner."
```

---

## Task 4: Move donation route to `/musalla/fund`

Move the existing donation page from `/[lang]/donation` to `/[lang]/musalla/fund`. The `donation-ledger.tsx` component is unchanged.

**Files:**
- Create: `src/app/[lang]/musalla/fund/page.tsx`
- Delete: `src/app/[lang]/donation/page.tsx`

- [ ] **Step 1: Create fund page at new route**

Create `src/app/[lang]/musalla/fund/page.tsx`:

```tsx
import type { Metadata } from "next";
import { DonationLedger } from "@/components/donation-ledger";

export const metadata: Metadata = {
  title: "Pyoseon Musalla Fund — Donation Transparency",
  description:
    "Help open the first musalla in southern Jeju. Every won raised and spent, fully transparent. 58.9m², Qibla-aligned, Pyoseon.",
  openGraph: {
    title: "Pyoseon Musalla Fund — Help open the first musalla in southern Jeju",
    description:
      "There's no musalla in southern Jeju (Seogwipo). We're opening one in Pyoseon — every won raised and spent, fully open.",
  },
};

export default function FundPage() {
  return <DonationLedger />;
}
```

- [ ] **Step 2: Delete old donation route**

```bash
rm -rf src/app/\[lang\]/donation
```

- [ ] **Step 3: Run build**

```bash
npm run build
```

Expected: Build passes. `/[lang]/musalla/fund` renders the donation ledger. Old `/[lang]/donation` route no longer exists.

- [ ] **Step 4: Commit**

```bash
git add src/app/\[lang\]/musalla/fund/page.tsx
git add -u src/app/\[lang\]/donation/
git commit -m "feat: move donation route to /musalla/fund

Route change only — DonationLedger component unchanged.
Old /[lang]/donation route removed."
```

---

## Task 5: Final build verification

Run a clean build and verify all 3 routes work.

**Files:** None (verification only)

- [ ] **Step 1: Clean build**

```bash
npm run build
```

Expected: Build passes with no errors. Output should show these routes:
- `/[lang]` (home)
- `/[lang]/musalla` (musalla page)
- `/[lang]/musalla/fund` (donation ledger)

- [ ] **Step 2: Commit all remaining changes (if any)**

If there are any uncommitted files:

```bash
git status
git add -A
git commit -m "chore: final cleanup for IA redesign"
```