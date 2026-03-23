# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Snippet Vault** is a monorepo web application for storing, organizing, and sharing code snippets. It uses pnpm workspaces with Turbo for build orchestration.

```
snippet-vault/
├── apps/
│   ├── api/        # Backend (Hono.js on Node.js)
│   └── web/        # Frontend (React 19 + Vite)
└── packages/
    └── db/         # Shared database layer (Drizzle ORM + PostgreSQL)
```

## Commands

### Development
```bash
pnpm dev            # Start all apps in watch mode (via Turbo)
```

### Per-workspace
```bash
# Frontend (apps/web)
pnpm --filter web dev       # Vite dev server
pnpm --filter web build     # tsc + vite build
pnpm --filter web lint      # ESLint

# API (apps/api)
pnpm --filter api dev       # tsx watch src/index.ts
pnpm --filter api build     # tsc

# Database (packages/db)
pnpm --filter db db:push      # Push schema to DB (dev workflow)
pnpm --filter db db:generate  # Generate migration files
pnpm --filter db db:migrate   # Apply migrations
pnpm --filter db db:studio    # Open Drizzle Studio UI
```

### Root
```bash
pnpm build          # Build all packages (via Turbo)
```

## Environment

Copy `.env.example` to `.env` and set `DATABASE_URL`:
```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/snippet_vault
```

The `packages/db/drizzle.config.ts` reads this env var directly.

## Architecture

### Database Schema (`packages/db/src/schema.ts`)
Five tables with CUID2 primary keys:
- **users** — accounts (email, username, hashed password, avatar_url)
- **snippets** — code snippets (title, description, code, language, visibility enum `public|private`, userId FK, optional collectionId FK)
- **collections** — groups of snippets (userId FK)
- **tags** — user-scoped tags (userId FK)
- **snippet_tags** — many-to-many join between snippets and tags

All tables use `createdAt`/`updatedAt` timestamps. Foreign keys cascade on delete.

### Frontend (`apps/web/src/`)
- **App.tsx** — root layout; owns navigation state and selected snippet state; renders `<Sidebar>` + `<MainPanel>`
- **Sidebar.tsx** — nav items, tag list, mobile-responsive drawer
- **MainPanel.tsx** — snippet list with filter/new controls; passes selection up to App
- **SnippetCard.tsx** — card with language badge, code preview, tags
- **data.ts** — mock data (currently used instead of API calls)
- **types.ts** — shared TypeScript interfaces (`Snippet`, `NavItem`, `Tag`, `Language`)

Styling uses Tailwind CSS with CSS-variable-based design tokens for light/dark theming, defined in `src/index.css` and configured in `tailwind.config.ts`.

### API (`apps/api/`)
Hono.js framework with `@hono/node-server`. The `src/` directory is not yet implemented — routes need to be added to connect the frontend to the database.

## Current Status
- Frontend renders with **mock data** from `apps/web/src/data.ts` — not yet wired to the API
- API backend is scaffolded but **has no routes implemented**
- Database schema is defined and can be pushed with `db:push`

## Code Style
- Use **Biome** for formatting/linting, not ESLint or Prettier
- All code in **TypeScript**, no plain JS files
- Use `cuid2` for all IDs, never auto-increment integers
- Keep business logic in the API, not the frontend
- Prefer named exports over default exports

## Git
- Commit style: `feat:`, `fix:`, `chore:`, `refactor:`
- Never commit `.env`
- Branch naming: `feature/`, `fix/`, `chore/`
