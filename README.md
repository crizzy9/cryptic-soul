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
heroImage: "/post_img.webp"
tags: ["tag1", "tag2"]
---

Your content here...
```

### Projects
Add new projects in `src/content/project/` following the same pattern.

## 🚀 Deployment

The site is automatically deployed to Netlify on every push to the main branch.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
