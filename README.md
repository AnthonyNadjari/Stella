# STELLA

Structured quantitative-finance notes, built with **Next.js** (static export) and hosted on **GitHub Pages**.

## Architecture (single source of truth)

| Branch | Role | You should… |
|--------|------|-------------|
| **`main`** | Application source: `app/`, `components/`, `content/notes/`, `styles/`, config | Commit and push here only. |
| **`gh-pages`** | **Generated** static site (`out/` after `next run build`) | **Do not edit by hand.** It is overwritten on every deploy. |
| **`claude/build-stella-platform-Y1Bda`** *(legacy)* | Old snapshot; was mistakenly set as the **default** branch | **Delete** after switching default to `main` (see below). |

**GitHub Pages** must serve the **built** site from branch **`gh-pages`**, folder **`/ (root)`** — not from `main`. The live URL is:

**https://anthonynadjari.github.io/Stella/**

### “Page not found” on GitHub Pages

If **Settings → Pages** is set to **Branch: `main` / Folder: `/docs`**, the site will **404**. This repo has **no** `docs/` folder on `main`; the workflow writes the static export to the **`gh-pages`** branch.

**Fix (repository Settings → Pages → Build and deployment):**

1. **Source:** *Deploy from a branch* (or leave as-is if that is the only option).
2. **Branch:** select **`gh-pages`**, not `main`.
3. **Folder:** **`/ (root)`**, not `/docs`.
4. Save and wait ~1–2 minutes for the site to rebuild.

This repo uses `basePath: "/Stella"` in production, so every path includes `/Stella` (e.g. `/Stella/notes/equity/basket-skew/`).

## How the site updates

1. Push to **`main`** (or merge a PR into `main`).
2. GitHub Actions runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml): `npm ci` → `npm run build` → deploys the `out/` folder to **`gh-pages`** (clean deploy).

If the **workflow is disabled** or fails, `gh-pages` will stay stale — check the **Actions** tab on GitHub.

## Fix “I only see old code / old notes on GitHub”

The repository default branch must be **`main`**. If it still points at `claude/build-stella-platform-Y1Bda`, the GitHub **Code** tab and “default” clones show an **outdated tree** (old workflows and old MDX), even when **Pages** already built from the latest `main`.

**Owner steps (GitHub UI):**

1. **Settings** → **General** → **Default branch** → switch to **`main`** → Update.
2. **Branches** → delete **`claude/build-stella-platform-Y1Bda`** (optional but recommended).

After that, `github.com/…/Stella` shows the same source as production builds.

## Local development

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — locally there is **no** `/Stella` prefix (`basePath` is only set when `NODE_ENV === "production"` during `next build`).

To mimic production URLs locally, use `npm run build` and serve `out/` with a static server, or rely on the deployed site.

## Content

Notes live in **`content/notes/`** as `.mdx` (MDX + KaTeX). The sidebar and routes are generated from the filesystem.
