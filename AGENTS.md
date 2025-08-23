# AGENTS.md - Development Guide

## Build/Test Commands
- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- No test framework configured

## Code Style Guidelines

### TypeScript
- Use explicit function signatures for exported utilities
- Prefer descriptive variable names; avoid 1-2 character identifiers
- Keep utilities pure and side-effect free
- Import shared config from `src/config.ts` instead of duplicating constants

### Astro Components
- Prefer Astro-native features (layouts, islands, content collections)
- Use layouts for page chrome; keep pages focused on data fetching
- Keep frontmatter minimal; put long logic in imported utilities
- Import types from `astro:content` for type-safe content usage

### Styling
- Use Tailwind utility classes and DaisyUI components
- Prefer semantic DaisyUI components (`btn`, `card`, `badge`) with Tailwind utilities
- Avoid inline styles; prefer semantic classes

### Content & Routing
- Always use `createSlug(title, slug)` for blog URLs consistency
- Use `getCollection("blog" | "project" | "store")` for content access
- Sort posts by `pubDate` descending when listing
- Frontmatter must conform to schemas in `src/content/config.ts`