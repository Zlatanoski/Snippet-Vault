# Code Vault

> 🚧 **Work in progress** — actively developed. Contributions and feedback welcome!

A self-hostable, open-source code snippet manager — a modern alternative to GitHub Gists. Save, organize, and share your code snippets with full control over your data.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Status: Alpha](https://img.shields.io/badge/status-alpha-orange.svg)]()
[![pnpm](https://img.shields.io/badge/managed%20with-pnpm-blue)](https://pnpm.io/)

---

## What Is Snippet Vault?

Snippet Vault lets you store and manage code snippets across languages, organize them into collections, and tag them for quick retrieval. Unlike GitHub Gists, it's fully self-hosted — your code stays on your machine or server.


---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + TypeScript + Vite + Tailwind CSS |
| Backend | [Hono](https://hono.dev/) (lightweight TypeScript web framework) |
| Database | PostgreSQL + [Drizzle ORM](https://orm.drizzle.team/) |
| Auth | JWT (via `jose`) + bcrypt password hashing |
| Monorepo | pnpm workspaces |

---

## Project Structure

```
snippet-vault/
├── apps/
│   ├── web/          # React + Vite frontend (@snippet-vault/web)
│   └── api/          # Hono REST API (@snippet-vault/api)
└── packages/
    └── db/           # Drizzle schema + DB client (@snippet-vault/db)
```

---

## What's Been Built So Far

### ✅ Monorepo Setup
- pnpm workspace monorepo with three packages: `web`, `api`, `db`
- Shared TypeScript config with `moduleResolution: "bundler"`
- Inter-package dependencies via `workspace:*` protocol
- Root `.gitignore` covering secrets, build artifacts, and `node_modules`

### ✅ Database Layer (`packages/db`)
- Full PostgreSQL schema defined with Drizzle ORM
- Five tables: `users`, `snippets`, `collections`, `tags`, `snippet_tags`
- `cuid2` used for all primary keys (collision-resistant, URL-safe IDs)
- `visibility` field as a Postgres enum (`public | private`)
- Cascade deletes from `users` to child tables; `set null` on `snippets.collection_id`
- `snippet_tags` junction table for many-to-many snippet ↔ tag relationships
- Schema pushed to local PostgreSQL via `drizzle-kit`

### ✅ Backend API (`apps/api`)
Built with [Hono](https://hono.dev/) on Node.js with the following:

**Auth Routes** (`/auth`)
- `POST /auth/register` — validates input with Zod, checks for duplicate email, hashes password with bcrypt, returns JWT
- `POST /auth/login` — verifies credentials, returns signed JWT

**Snippet Routes** (`/snippets`) — protected by JWT middleware
- `GET /snippets` — list all snippets for authenticated user
- `POST /snippets` — create a new snippet
- `PUT /snippets/:id` — update a snippet
- `DELETE /snippets/:id` — delete a snippet

**Middleware**
- `middleware/auth.ts` — JWT verification on all protected routes; rejects requests with missing or invalid tokens

**Validation**
- Zod v4 schemas for all request bodies
- `@hono/zod-validator` middleware returns `400` automatically on invalid input

### ✅ Frontend (`apps/web`)
- Dashboard UI with three-column layout: sidebar, snippet list, detail panel
- `SnippetCard` component with language badge (`LangBadge`)
- `DetailPanel` showing full code with a copy button
- Manual dark / light mode toggle (`ThemeToggle`) using CSS custom properties via `data-theme`
- Responsive layout — mobile sidebar drawer that correctly collapses on desktop breakpoint
- `useEffect` + `matchMedia` listener to auto-close sidebar on viewport resize
- Components: `App.tsx`, `Sidebar.tsx`, `MainPanel.tsx`, `DetailPanel.tsx`, `SnippetCard.tsx`, `LangBadge.tsx`, `ThemeToggle.tsx`

---

## Database Schema

```
users ──┬──< snippets >──< snippet_tags >── tags
        └──< collections
                └──< snippets (collection_id, nullable)
```

| Table | Key Fields |
|---|---|
| `users` | `id`, `email` (unique), `password_hash`, `created_at` |
| `snippets` | `id`, `title`, `code`, `language`, `visibility`, `user_id`, `collection_id` |
| `collections` | `id`, `name`, `user_id` |
| `tags` | `id`, `name`, `user_id` |
| `snippet_tags` | `snippet_id`, `tag_id` (composite PK) |

---

## Getting Started (Local Development)

### Prerequisites
- Node.js 22+
- pnpm 9+
- PostgreSQL (running locally)

### Setup

```bash
# Clone the repo
git clone https://github.com/Zlatanoski/snippet-vault.git
cd snippet-vault

# Install dependencies
pnpm install

# Configure environment
cp .env.example .env
# Edit .env with your DATABASE_URL and JWT_SECRET
```

**.env example:**
```env
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/snippet_vault
JWT_SECRET=your-secret-key-here
```

```bash
# Push the database schema
pnpm --filter @snippet-vault/db db:push

# Start the API (in one terminal)
pnpm --filter @snippet-vault/api dev

# Start the frontend (in another terminal)
pnpm --filter @snippet-vault/web dev
```

Frontend runs at: `http://localhost:5173`  
API runs at: `http://localhost:3000`

---

## Roadmap

- [ ] Connect frontend to live API (currently uses mock data)
- [ ] Search and filter snippets by language / tag
- [ ] Collection management UI
- [ ] Tag management UI
- [ ] Public snippet sharing (shareable links)
- [ ] Syntax highlighting in detail panel
- [ ] User settings page
- [ ] Docker Compose setup for easy self-hosting
- [ ] API documentation

---

## Contributing

Contributions are welcome! This is a learning project being built in public.

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push and open a Pull Request

Please open an issue before working on large changes.

---

## License

MIT © [Zlatanoski](https://github.com/Zlatanoski)
