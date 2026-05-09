# STELLA

Structured quantitative-finance notes, built with **Next.js** (static export) and hosted on **GitHub Pages**.

## Architecture

| Branch | Role |
|--------|------|
| **`main`** | Source code: `app/`, `components/`, `content/notes/`, `styles/`, config. **Only branch you edit.** |

The deployment workflow (`.github/workflows/deploy.yml`) builds the site and deploys directly via `actions/deploy-pages`. There is **no** `gh-pages` branch involved — GitHub Actions handles everything.

**Live URL:** **https://anthonynadjari.github.io/Stella/**

This repo uses `basePath: "/Stella"` in production, so all paths include `/Stella`.

## How the site updates

1. Push to **`main`** (or merge a PR into `main`).
2. GitHub Actions: `npm ci` → `npm run build` → uploads the `out/` folder → deploys to Pages.

## GitHub Pages configuration (one-time)

In **Settings → Pages → Build and deployment**:

- **Source:** select **GitHub Actions** (not "Deploy from a branch").

That is the only required setting. No branch or folder selection is needed — the workflow file controls everything.

## Local development

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The `/Stella` prefix only applies in production builds.

## Content

Notes live in `content/notes/` as `.mdx` (MDX + KaTeX). Routes and sidebar are generated from the file system.
