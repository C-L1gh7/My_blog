# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal blog built with Astro 5, React 18, and Tailwind CSS. Features a retro/tape aesthetic with black borders, shadows, and yellow highlights. Deployed to GitHub Pages at `https://c-l1gh7.github.io/My_blog`.

## Development Commands

```bash
npm run dev      # Start dev server at localhost:4321
npm run build    # Build for production to ./dist/
npm run preview  # Preview production build locally
```

## Architecture

### Content Collections

Four content collections defined in `src/content/config.ts`:

- **posts** - Blog articles with `title`, `date`, `tag`, `excerpt`, `image`
- **notes** - Quick thoughts with `title`, `date`, `file`, `tags`
- **studies** - Course notes with `title`, `course`, `date`, `image`
- **projects** - Project showcase with `title`, `description`, `date`, `image`, `technologies`, `codeUrl`, `docsUrl`, `videoUrl`

All collections use markdown files with frontmatter. Content is queried via `getCollection()` from `astro:content`.

### Asset Strategy

**All images are hosted on Cloudflare R2 CDN**, not locally. Pattern: `https://pub-f15d478863f747a68de4bbf631ccfe.r2.dev/PicGo/[filename]`

- No image optimization or processing at build time
- Components use standard `<img>` tags with CDN URLs as strings
- `public/` directory exists for local static files (e.g., CV PDF) but is not used for images

### Component Architecture

**React Components** (in `src/components/`, use `client:load` directive):
- `Navbar.tsx` - Fixed header with scroll-animated disc icon (framer-motion)
- `PostCard.tsx` - Article preview with hover animations, optional image, tag/date metadata
- `ProjectCard.tsx` - Project showcase card with tech tags and optional Code/Docs/Video links
- `ProfileCard.tsx` - Sidebar profile with avatar, bio, social links
- `PostHub.tsx` - Advanced filtering UI with search, tag filters, sort, shuffle
- `Icons.tsx` - SVG icon library (no emoji icons, only SVG)

**Astro Components**:
- `BaseLayout.astro` - HTML wrapper with global styles, noise texture overlay, custom scrollbar
- `NoteCard.astro` - Note display with optional file attachment
- `PDFViewer.astro` - Iframe-based PDF viewer with download link

### Styling System

**Retro Aesthetic** - Black borders (`border-black`), hard shadows (`shadow-[4px_4px_0px_#000]`), yellow highlights (`bg-yellow-200`), uppercase font-mono labels

**Colors**:
- Background: `#f0f0ed`
- Foreground: `#1a1a1a`
- Accent: Red (`#dc2626` for hover states)
- Selection: Yellow (`#f2c94c`)

**Typography**:
- Sans: Inter (body text, headings)
- Mono: JetBrains Mono (labels, metadata, code)
- Loaded from Google Fonts in `BaseLayout.astro`

**Tailwind Prose** - Custom typography plugin config for markdown rendering (black headings, red links on hover, gray code backgrounds)

### Page Structure

All pages follow pattern: `Navbar` → `content-container` (max-width 1100px) → semantic sections

- `index.astro` - 12-col grid: 4-col sticky sidebar (ProfileCard) + 8-col main (PostList)
- `posts/index.astro` - PostHub with filtering/search
- `posts/[...slug].astro` - Individual post with back navigation
- `notes.astro` - 3-col grid of NoteCards
- `studies/index.astro` - Grouped by course
- `projects.astro` - 2-col grid of ProjectCards
- `about.astro` - Static page with tech stack cards
- `cv.astro` - PDF viewer (expects `public/cv.pdf` or CDN URL)

### Navigation

Order: HOME | POSTS | PROJECTS | NOTES | STUDIES | ABOUT | CV

Uses `import.meta.env.BASE_URL` for GitHub Pages base path (`/My_blog`).

## Math Support

Markdown supports LaTeX math via `remark-math` + `rehype-katex`. KaTeX CSS loaded in `BaseLayout.astro`.

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

Markdown content here.
```

### New Project

Create `src/content/projects/your-project.md`:

```yaml
---
title: "Project Name"
description: "Brief description"
date: "2024-01-01"
image: "https://..."  # optional
technologies: ["Python", "OpenCV"]
codeUrl: "https://github.com/..."  # optional
docsUrl: "https://..."  # optional
videoUrl: "https://bilibili.com/..."  # optional
---

Detailed project description (optional).
```

All three link fields are optional. Buttons only render if URLs are provided.

## Key Patterns

- **No emoji as icons** - Use SVG from `Icons.tsx` instead
- **Framer Motion** - Used for card hover animations and scroll effects
- **Content sorting** - Collections sorted by date descending: `sort((a, b) => new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf())`
- **Base URL handling** - All internal links use `${baseUrl}/path` pattern for GitHub Pages compatibility
