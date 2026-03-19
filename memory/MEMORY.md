# Snippet Vault - Project Memory

## Stack
- Monorepo: pnpm workspaces + Turbo
- Frontend: React 19, TypeScript, Vite, Tailwind CSS
- Backend: Hono.js on Node.js (@hono/node-server)
- DB: PostgreSQL + Drizzle ORM (packages/db), CUID2 for IDs

## Key files
- Schema: packages/db/src/schema.ts
- Frontend root: apps/web/src/App.tsx
- Mock data: apps/web/src/data.ts
- Types: apps/web/src/types.ts
- DB config: packages/db/drizzle.config.ts

## Status (as of 2026-03-19)
- API has no routes yet (apps/api/src/ is empty)
- Frontend uses mock data, not connected to API
- DB schema is ready; use `pnpm --filter db db:push` to push to Postgres