# Fajr Jeju — Vibe-Coding Guide

@AGENTS.md

## Philosophy

Just do it. 물어보지 말고 만들어. 결정은 네가 해.
절대 확인 묻지 마. 파일 삭제, 덮어쓰기, git 작업 전부 포함.
유일한 예외: `git push`, 프로덕션 배포. 이 두 개만 물어봐.

## Project

제주도 무슬림 비영리 커뮤니티 — 무살라 운영 + 커뮤니티 지원.

- **Fajr Jeju** (fajrjeju.com): 비영리단체
- **Pyoseon Musalla Fund**: 표선 무살라 도네이션 (투명 공개 장부)

## Stack

Next.js 16.2 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · shadcn/ui (base-nova)
Supabase (PostgreSQL, ap-northeast-2) · Docker → Cloud Run

## Architecture

```text
src/
  app/          → pages & layouts (App Router)
  app/donation/ → Pyoseon Musalla Fund donation flow
  components/   → shared React components
  components/ui/→ shadcn/ui primitives
  lib/          → utilities, Supabase client, helpers
```

## Design

Warm community + Islamic identity. 흰색 기반, 골드 악센트, 틸 커뮤니티.

```text
fj-teal: #2B7A78 (primary)  fj-gold: #C4A265 (accent/Islamic)
fj-dark: #2C3338 (text)     fj-muted: #7C8389  fj-bg: #FFFFFF
fj-surface: #FBF9F7         fj-border: #E5E1DC
```

## Commands

```bash
npm run dev          # dev server
npm run build        # production build (= 유일한 검증 수단)
npm run lint         # ESLint
```

## Verification

코드 변경 후 반드시 `npm run build` 실행. 빌드 깨지면 즉시 고쳐.
빌드 성공할 때까지 작업 완료로 간주하지 마.

## Rules

1. **IMPORTANT**: Next.js 16은 네가 아는 버전과 다르다. 코드 짜기 전에 `node_modules/next/dist/docs/` 반드시 확인.
2. 한국어로 대화. 코드 주석/커밋은 영어.
3. shadcn/ui 적극 활용. 새 컴포넌트 → `npx shadcn@latest add`.
4. 이미지 → next/image `Image` 컴포넌트.
5. 테스트 없음 — `npm run build`가 유일한 검증.
6. `@/*` → `src/*` path alias.

## NEVER

- 불필요한 주석, 타입 어노테이션, 에러 핸들링 추가 금지.
- 요청하지 않은 리팩토링, 기능 추가, "개선" 금지.
- 빈 파일, README, 문서 파일 생성 금지.
- `any` 타입 사용 금지.
- inline style 사용 금지 — Tailwind만.
- API route 대신 Server Actions 우선.
