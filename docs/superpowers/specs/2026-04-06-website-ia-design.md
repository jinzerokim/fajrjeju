# Fajr Jeju Website IA Redesign

## Context

Fajr Jeju is a nonprofit Muslim community organization in Jeju Island, South Korea. It operates "Al-Fajr Pyoseon Musalla" — a 58.9m² prayer space in southern Jeju that doubles as a community hub (gatherings, iftar, classes, mutual aid).

Current site: homepage + donation ledger page. This spec restructures the site to reflect the organization's identity and the musalla's dual role as prayer space + community hub.

## Design Decisions (from brainstorming)

- **Muslim Space model**: prayer and community are not separated into different pages. The musalla page is a single unified space page — because in reality, prayer and community life happen in the same room.
- **Fajr Jeju is the roof, the musalla is the front door**: the org is top-level, the musalla is the most prominent section. But the org frames everything.
- **No Donate CTA button in nav**: fundraising is accessed naturally through the musalla page, not pushed as a persistent UI element.
- **3 pages total**: home, musalla, fund. No about page (home IS about). No separate community page (musalla IS community).

## Route Structure

```
/[lang]/              → Home (org landing)
/[lang]/musalla       → Al-Fajr Pyoseon (space + prayer + community)
/[lang]/musalla/fund  → Transparent donation ledger
```

Existing `/[lang]/donation` route is removed. The donation ledger component moves to `/[lang]/musalla/fund` without modification.

## Navigation

```
[Fajr Jeju]          알 파즈르 표선          [Language Switcher]
```

- "Fajr Jeju" → home (`/[lang]/`)
- "알 파즈르 표선" → musalla page (`/[lang]/musalla`)
- Language switcher → same page in selected locale (existing behavior)

Localized nav label for "알 파즈르 표선":

| Locale | Label |
|--------|-------|
| ko | 알 파즈르 표선 |
| en | Al-Fajr Pyoseon |
| id | Al-Fajr Pyoseon |
| ur | الفجر پیوسون |
| ar | الفجر بيوسون |

Navigation is currently inlined in the home page component. It will be extracted into a shared layout or component so all 3 pages share the same header/footer.

## Page 1: Home (`/[lang]/`)

The org landing page. Lighter than current — musalla details move to `/musalla`.

### Sections (top to bottom)

**Header** (shared)

**Hero**
- Background image with overlay (existing)
- Title: "Fajr Jeju" / "파즈르 제주"
- Subtitle: org mission one-liner (existing)
- Badge: "Jeju Island, South Korea" (existing)

**Quick Info Bar** (3 columns)
- Next prayer time (placeholder, existing)
- Location summary (existing)
- "알 파즈르 표선 →" link to `/musalla` (replaces current donate link)

**Mission**
- "파즈르 제주가 하는 일" — 2-3 lines about the org
- Replaces current musalla-specific description with org-level text

**Announcements**
- 3 notice cards (existing, unchanged)

**Fund Banner**
- Dark background CTA section (existing style)
- "알 파즈르 표선을 함께 열어주세요" → links to `/musalla/fund`

**Footer** (shared)

### Removed from home (moved to /musalla)
- Musalla photo gallery (4 images)
- Location detail section (address, map links)

## Page 2: Musalla (`/[lang]/musalla`)

The unified space page. Everything about Al-Fajr Pyoseon — prayer, facilities, community, location.

### Sections (top to bottom)

**Header** (shared)

**Hero**
- Musalla exterior/interior photo with overlay
- Title: "알 파즈르 표선 무살라" / "Al-Fajr Pyoseon Musalla"
- Subtitle: "예배 공간이자 커뮤니티 허브" / "Prayer space & community hub"

**Prayer Info**
- Next prayer time (placeholder)
- Qibla direction indicator
- Facility summary: 58.9m², sisters' area, 2 restrooms (1 wudu), small kitchen

**Space Gallery**
- 4 interior/exterior photos (moved from home)
- Facility specs: land area 601m², floor 58.9m², 1F, south-facing

**Community**
- Upcoming events / regular gatherings
- Placeholder cards for now (similar style to home announcements)
- This section grows as the community grows

**Location**
- Full address: 1F, 31 Pyoseondongseo-ro, Seogwipo-si, Jeju
- KakaoMap + Google Maps links (moved from home)
- Bus stop info
- Exterior photo

**Fund Banner**
- Summary stats: total raised + transaction count (pulled from ledger data or hardcoded initially)
- "이 공간을 함께 만들어주세요" → `/musalla/fund`

**Footer** (shared)

## Page 3: Fund (`/[lang]/musalla/fund`)

The existing `donation-ledger.tsx` component, unchanged. Only the route changes.

**Header** (shared — adds consistent nav to this page, which currently has none)

**DonationLedger component** (existing, no modifications)

**Footer** (shared)

## Shared Layout

Extract header + footer from the current home page into the `[lang]/layout.tsx` or a shared component.

Current state: header/footer are inlined in `src/app/[lang]/page.tsx`. The donation page (`donation-ledger.tsx`) has its own self-contained layout with no shared header.

Target state: `src/app/[lang]/layout.tsx` renders shared header + footer. All child pages get consistent navigation.

## Dictionary Changes

Each locale JSON file (`ko.json`, `en.json`, `id.json`, `ur.json`, `ar.json`) needs:

- `nav.musalla` — localized label for "알 파즈르 표선"
- `musalla.*` — section titles and descriptions for the musalla page
- `home.mission.*` — updated org-level mission text (replacing musalla-specific text)
- Remove `nav.fund` from nav (fund is not a nav item)

Existing dictionary keys for the donation ledger are untouched — the component manages its own i18n internally.

## File Changes

| Action | Path | Notes |
|--------|------|-------|
| Modify | `src/app/[lang]/layout.tsx` | Add shared header + footer |
| Modify | `src/app/[lang]/page.tsx` | Lighten: remove musalla gallery, location detail. Update nav, mission section |
| Create | `src/app/[lang]/musalla/page.tsx` | New unified space page |
| Move | `src/app/[lang]/donation/page.tsx` → `src/app/[lang]/musalla/fund/page.tsx` | Route change only |
| Delete | `src/app/[lang]/donation/` | Old route removed |
| Modify | `src/components/donation-ledger.tsx` | No changes to component logic |
| Modify | `src/app/[lang]/dictionaries/*.json` (5 files) | Add musalla page text, update nav keys |
| Modify | `src/app/[lang]/dictionaries.ts` | Update type if needed for new keys |

## Out of Scope

- About page — home serves this purpose
- Separate community page — musalla page covers community
- Prayer time API integration — remains placeholder
- Refactoring existing components beyond what's needed for the restructure
- Design system changes — same Tailwind classes, same color tokens
- SEO/metadata beyond basic title/description for new pages
