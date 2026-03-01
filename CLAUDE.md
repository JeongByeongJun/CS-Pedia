# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start dev server (localhost:3000)
pnpm build        # Production build
pnpm lint         # ESLint
pnpm start        # Start production server
```

No test framework is configured yet.

## Architecture

Clean Architecture with 3 layers under `src/`. Path alias: `@/*` → `./src/*`.

### Domain (`src/domain/`)
Framework-agnostic business logic. All entities use **Zod v4** schemas for validation.
- `entities/` — Conference, Deadline, BestPaper, InstitutionRating, AcceptanceRate
- `repositories/` — Interface definitions (abstractions only)
- `use-cases/` — Business logic factories (`createGetConferencesUseCase(repo)` pattern)
- `value-objects/` — D-day calculation, status formatting

### Infrastructure (`src/infrastructure/`)
- `supabase/client.ts` — Browser Supabase client
- `supabase/server.ts` — Server Supabase client (cookie-based SSR auth)
- `supabase/repositories/` — Concrete repository implementations (`SupabaseXxxRepository`)
- `supabase/mappers/` — DB row → Domain entity converters
- `supabase/types/database.types.ts` — Auto-generated Supabase types
- `container.ts` — **DI container**: instantiates repos, injects into use cases, exports ready-to-use functions
- `seed/` — JSON seed data for conferences, deadlines, etc.

### Presentation (`src/presentation/`)
- `components/` — React components organized by feature (`conferences/`, `best-papers/`, `layout/`)
- `hooks/` — Custom React hooks
- `providers/` — Context providers

### App Router (`src/app/`)
- `/` — Conference listing with filters & search (ISR: 1 hour)
- `/conferences/[slug]` — Conference detail (SSG + ISR: 1 day)
- `/best-papers` — Best papers archive
- `/api/revalidate` — On-demand ISR endpoint

### Other
- `src/components/ui/` — shadcn/ui base components (style: new-york, icons: lucide)
- `src/shared/constants/` — Fields, institutions, site metadata
- `src/shared/utils/date.ts` — Date formatting with date-fns (Korean locale)
- `src/lib/utils.ts` — `cn()` (clsx + tailwind-merge)

## Key Patterns

**Data flow**: Page → `container.ts` use case → repository interface → Supabase implementation → mapper → domain entity

**Adding a new entity**: Define Zod schema in `domain/entities/`, create repository interface in `domain/repositories/`, implement in `infrastructure/supabase/repositories/`, add mapper in `infrastructure/supabase/mappers/`, wire up in `container.ts`.

**Adding a new use case**: Create factory function in `domain/use-cases/`, inject repository via `container.ts`, call from App Router page.

**Database views**: `conference_with_next_deadline` is a Supabase view used by the conference repository for listing with pre-joined deadline data.

## Tech Stack Details

- **Next.js 16** (App Router) + **React 19** + **TypeScript 5** (strict)
- **Tailwind CSS 4** via `@tailwindcss/postcss`
- **Supabase** PostgreSQL + `@supabase/ssr` for server-side auth
- **Zod v4** for domain entity validation
- **shadcn/ui** (Radix UI + CVA) for component primitives
- **Vercel** deployment (Seoul/icn1 region)

## Conventions

- All UI text is in Korean
- Migrations live in `supabase/migrations/`
- Environment variables: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- Middleware (`src/middleware.ts`) refreshes Supabase auth sessions on every request
