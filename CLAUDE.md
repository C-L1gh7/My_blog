# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal blog (Chinese-language, `lang="zh-CN"`) built with Astro 5, React 18, and Tailwind CSS 3. Features a retro/tape aesthetic with black borders, hard shadows, and yellow highlights. Deployed to GitHub Pages via `withastro/action@v2`.

## Development Commands

```bash
npm run dev      # Start dev server at localhost:4321 (alias: npm start)
npm run build    # Build for production to ./dist/
npm run preview  # Preview production build locally
```

No linting or test suites are configured — the project is content-driven with no application logic to test.

## Architecture

### Content Collections

Four collections defined in `src/content/config.ts`, all Zod-schema-validated markdown:

- **posts** — `title`, `date`, `tag` (optional, defaults to `'GENERAL'`), `excerpt` (optional), `image` (optional)
- **notes** — `title`, `date`, `file` (optional), `tags` (optional string array)
- **studies** — `title`, `course`, `date`, `image` (optional)
- **projects** — `title`, `description` (optional), `date`, `image` (optional), `technologies` (required string array), `codeUrl`/`docsUrl`/`videoUrl` (all optional)

Content is queried via `getCollection()` from `astro:content`. Standard sort pattern across all pages:
```ts
items.sort((a, b) => new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf())
```

### Asset Strategy

**All images are hosted on Cloudflare R2 CDN**, not locally. Pattern: `https://pub-f15d478863f747a68de4bbf631ccfe.r2.dev/PicGo/[filename]`

- No image optimization or processing at build time
- Components use standard `<img>` tags with CDN URLs as strings
- `public/` directory exists for local static files (CV PDF, favicon) but is not used for blog images

### Component Architecture

**React Components** (in `src/components/`, require `client:load` directive):
- `Navbar.tsx` — Fixed header with NASA-style color palette per nav link, scroll-animated rotating disc icon (framer-motion), mobile hamburger with fullscreen overlay and ESC-to-close
- `PostCard.tsx` — Article preview with spring-animated hover (framer-motion, `LayoutGroup`-compatible), image zoom + film gradient overlay, conditional `line-clamp-2` excerpt
- `PostList.tsx` — Thin wrapper that maps posts to PostCards inside a `LayoutGroup`
- `PostHub.tsx` — Full filtering/search UI: text search, tag filter buttons, newest/oldest sort, "Surprise Me" (random 3-pick mode)
- `ProjectCard.tsx` — Project showcase card with tech tags and conditional Code/Docs/Video action buttons
- `ProjectHub.tsx` — Filtering UI mirroring PostHub (search, tech filter, sort). Not currently used in pages — `projects.astro` renders projects inline instead
- `ProfileCard.tsx` — Sticky sidebar with avatar, bio, social links (GitHub, Bilibili, Email). Accepts a `timeline` prop — a merged list of recent posts/projects/notes rendered as an animated vertical rail (color-coded by content type)
- `Icons.tsx` — SVG icon library (Disc, ArrowRight, Search, Filter, Sort, Shuffle, Github, Bilibili, Mail). **No emoji icons**

**Astro Components**:
- `BaseLayout.astro` — Root HTML wrapper with Google Fonts (Inter + JetBrains Mono), KaTeX CDN CSS, SVG `feTurbulence` noise texture overlay at 3% opacity, custom scrollbar CSS, `.content-container` utility class
- `NoteCard.astro` — Note display with optional file attachment download
- `PDFViewer.astro` — Iframe-based PDF viewer with download link
- `VideoPlayer.astro` — Styled `<video>` player with black border + hard shadow. Available for use in MDX content (not currently imported in any page)

### MDX Support

`@astrojs/mdx` is configured in `astro.config.mjs`. MDX files (`.mdx`) can be used in content collections alongside `.md`. Components like `VideoPlayer.astro` are available for embedding in MDX without explicit imports.

### Styling System

**Retro Aesthetic** — Black borders (`border-black`), hard shadows (`shadow-[4px_4px_0px_#000]`, `shadow-[8px_8px_0px_#ccc]`), yellow highlights (`bg-yellow-200`), uppercase `font-mono` labels, slight decorative rotations (`-rotate-2`)

**Colors**: Background `#f0f0ed`, foreground `#1a1a1a`, accent red `#dc2626` (hover states), selection yellow `#f2c94c`

**Typography**: Inter (sans, body), JetBrains Mono (mono, labels/metadata/code). Custom Tailwind prose plugin config: black bold headings, red links on hover, inline code in red on light gray bg (backtick pseudo-elements removed), left-black-border blockquotes, centered images

**Noise Texture**: SVG `feTurbulence` filter (`baseFrequency="0.65"`, `numOctaves="3"`) rendered as fixed overlay at 3% opacity — core to the retro/analog aesthetic

### Page Structure

All pages: `Navbar` (client:load) → `.content-container` (max-width 1100px, mx auto) → content

- `index.astro` — 12-col grid: 4-col sticky sidebar (ProfileCard with merged timeline) + 8-col main (rendered project bodies, then PostList of latest 2). Mobile: inline profile below navbar
- `posts/index.astro` — PostHub with full filtering/search
- `posts/[...slug].astro` — Individual post with smart back button (JS checks `document.referrer` for same-origin → `history.back()`, otherwise → `/posts/`). Content in prose wrapper with optional header image
- `notes.astro` — 3-col grid of NoteCards
- `studies/index.astro` — Grouped by course
- `projects.astro` — Renders projects inline with rendered body `Content` (not via ProjectHub)
- `about.astro` — Static Chinese-language page with tech stack cards
- `cv.astro` — PDF viewer (expects `public/cv.pdf` or CDN URL)

### Navigation

Order: HOME | POSTS | PROJECTS | NOTES | STUDIES | ABOUT | CV

Each link has a distinct NASA-inspired hover color defined in `Navbar.tsx`. Uses `import.meta.env.BASE_URL` for base path handling (currently `/`).

## Math Support

LaTeX math via `remark-math` + `rehype-katex`. KaTeX CSS loaded from jsDelivr CDN in `BaseLayout.astro`.

## Adding Content

### New Blog Post

Create `src/content/posts/your-post.md`:

```yaml
---
title: "Post Title"
date: "2024-01-01"
tag: "CATEGORY"  # optional, defaults to 'GENERAL'
excerpt: "Brief summary"
image: "https://pub-f15d478863f747a68de4bbf631ccfe.r2.dev/PicGo/image.jpg"  # optional
---

Markdown content here. LaTeX math $E = mc^2$ is supported.
```

### New Project

Create `src/content/projects/your-project.md`:

```yaml
---
title: "Project Name"
description: "Brief description"
date: "2024-01-01"
image: "https://..."
technologies: ["Python", "OpenCV"]
codeUrl: "https://github.com/..."  # optional
docsUrl: "https://..."  # optional
videoUrl: "https://bilibili.com/..."  # optional
---

Detailed project description with markdown.
```

All three link fields are optional — buttons only render if URLs are provided.

## Key Patterns

- **No emoji as icons** — Use SVG from `Icons.tsx` instead (though `about.astro` hardcodes some emoji for decoration)
- **Framer Motion** — Spring hover animations on cards, `LayoutGroup` for layout transitions between PostCards in PostList/PostHub
- **Content sorting** — Collections sorted by date descending using the standard pattern shown above
- **Base URL handling** — All internal links use `${import.meta.env.BASE_URL}/path` pattern
- **Smart back navigation** — Post detail page checks `document.referrer` for same-origin; uses `history.back()` if so, otherwise navigates to `/posts/`
- **timeline merging** — `index.astro` merges latest posts, projects, and notes into a single sorted timeline for ProfileCard
- **Unused dependency** — `lucide-react` is in `package.json` but not imported anywhere in `src/`; all icons come from the custom `Icons.tsx` SVG library
