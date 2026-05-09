# STELLA

Structured quantitative-finance notes, built with **Next.js** (static export) and hosted on **GitHub Pages**.

## Architecture

| Branch | Role |
|--------|------|
| **`main`** | Source code. The only branch you edit. |
| **`gh-pages`** | Auto-generated static site. Created by the deploy workflow. **Never edit by hand.** |

**Live URL:** **https://anthonynadjari.github.io/Stella/**

## How the site updates

1. Push to **`main`**.
2. GitHub Actions (`deploy.yml`): `npm ci` → `npm run build` → deploys `out/` to `gh-pages`.
3. GitHub Pages serves `gh-pages` at the live URL.

## GitHub Pages configuration (one-time)

In **Settings → Pages → Build and deployment**:

1. **Source:** Deploy from a branch
2. **Branch:** `gh-pages`
3. **Folder:** `/ (root)` — **not** `/docs`
4. Click **Save**

## Local development

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Content

Notes are `.mdx` files in `content/notes/`. Routes and sidebar are generated automatically.
