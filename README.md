# CrypticSoul - Personal Portfolio & Blog

A modern portfolio website and blog built with Astro, showcasing projects, blog posts, and professional experience. Features a clean, responsive design with dark/light theme support.

## About

This site serves as the personal portfolio of **Shyam Padia**, a Software Engineer and Entrepreneur with expertise in Web Development, Big Data, AI, Robotics, and Networking.

The site features:
- **Portfolio**: Showcase of technical projects and professional work
- **Blog**: Technical articles and insights on software engineering
- **CV**: Professional experience and skills
- **Store**: Digital products and services (coming soon)

## 🚀 Project Structure

The site is organized as follows:

```text
/
├── public/                # Static assets (images, favicon, etc.)
├── src/
│   ├── components/        # Reusable Astro components
│   ├── content/          # Content collections
│   │   ├── blog/         # Blog posts (Markdown)
│   │   ├── project/      # Portfolio projects (Markdown)
│   │   └── store/        # Store items (Markdown)
│   ├── layouts/          # Page layouts
│   ├── lib/              # Utility functions
│   ├── pages/            # Site pages and routing
│   └── styles/           # Global CSS styles
└── package.json
```

## ✨ Features

- **Fast & Modern**: Built with Astro for optimal performance
- **Responsive Design**: Mobile-first design with Tailwind CSS and DaisyUI
- **Content Management**: Type-safe content collections for blogs and projects
- **SEO Optimized**: Built-in sitemap and RSS feed generation
- **Theme Support**: Dark/light mode toggle
- **TypeScript**: Fully typed for better development experience

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command           | Action                                           |
| :---------------- | :----------------------------------------------- |
| `pnpm install`    | Installs dependencies                            |
| `pnpm dev`        | Starts local dev server at `localhost:4321`     |
| `pnpm build`      | Build your production site to `./dist/`         |
| `pnpm preview`    | Preview your build locally, before deploying    |
| `pnpm astro ...`  | Run CLI commands like `astro add`, `astro check`|

## 🛠️ Tech Stack

- **Framework**: [Astro](https://astro.build) - Static Site Generator
- **Styling**: [Tailwind CSS](https://tailwindcss.com) + [DaisyUI](https://daisyui.com)
- **Content**: Markdown with frontmatter, type-safe content collections
- **Deployment**: [Netlify](https://netlify.com)
- **Development**: TypeScript, ESLint, Prettier

## 📝 Adding Content

### Blog Posts
Create new markdown files in `src/content/blog/` with proper frontmatter:

```markdown
---
title: "Your Post Title"
description: "Post description"
pubDate: 2024-01-01
draft: true
heroImage: "/post_img.webp"
tags: ["tag1", "tag2"]
---

Your content here...
```

Blog images are self-hosted under `public/blog/`. Add descriptive `heroImageAlt`,
`heroImageCredit`, and `heroImageSource` metadata; photo sources and licensing are
recorded in [blog image credits](docs/blog-image-credits.md).

Drafts appear in `pnpm dev` and Netlify PR deploy previews (`CONTEXT=deploy-preview`).
PR previews are marked noindex, omit the sitemap, and disable analytics. The live
production build excludes drafts from the homepage, blog index, tags, article routes,
sitemap, and RSS.
After editorial review, set `draft: false` and check the production build before
publishing. RSS always includes published posts only, including during development.

### Projects
Add new projects in `src/content/project/` following the same pattern.
Set `featured: true` to include a project on the homepage. The CV project list is
curated independently in `src/data/profile.ts`. Keep development or research status
explicit, and omit repository links until verified.

### Resume

Public career facts live in `src/data/profile.ts`, aligned with
`resume/OnePage/cv.tex`. The CV includes the fuller source details, including substantive commented bullets,
and an independently curated project list. The download is
`public/Shyam-Padia-Resume.pdf`; regenerate it after reviewing resume changes:

```sh
mkdir -p /tmp/crypticsoul-resume
pdflatex -interaction=nonstopmode -halt-on-error -output-directory=/tmp/crypticsoul-resume resume/OnePage/cv.tex
pdflatex -interaction=nonstopmode -halt-on-error -output-directory=/tmp/crypticsoul-resume resume/OnePage/cv.tex
cp /tmp/crypticsoul-resume/cv.pdf public/Shyam-Padia-Resume.pdf
```

## Analytics

Umami integration measures page views, article progress and active time, project
clicks, resume downloads, contact clicks, and outbound domains. It respects browser
privacy preferences and offers an opt-out on `/privacy`. The owner's Umami Cloud
tracking code is configured in `src/config.ts`; collection starts after production
deployment. See
[analytics setup and event reference](docs/analytics.md); `.env.example` lists the
optional public build-time overrides for a later self-hosted instance. No account
credentials or API keys belong in this repo.

## 🚀 Deployment

The site is automatically deployed to Netlify on every push to the main branch.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
