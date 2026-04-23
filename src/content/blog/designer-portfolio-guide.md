---
title: "How to Build a Portfolio Website Without Writing Code"
description: "A step-by-step guide for designers to go from inspiration to a live portfolio site using AI tools like Claude Code — for free."
pubDate: "Apr 23 2026"
heroImage: "/portfolio_guide.jpg"
tags: ["ai", "portfolio", "web-design", "guide", "astro"]
---

# Build a Free Portfolio Website Without Writing Code

You're a designer with great work to show — but building a website feels like a developer's job. Not anymore. This guide walks you through creating a professional portfolio site using AI, without writing a single line of code yourself.

**What you'll get:** A fast, professional portfolio website hosted for free.

**What you'll need:** A computer (Mac or Windows), an internet connection, and about an hour.

**Total cost: $0** (or ~$10/year if you want a custom `.com` domain).

---

## Step 1: Browse Templates and Pick Your Vibe

Before anything else, browse existing Astro portfolio templates to find a design direction you like:

- **[astro.build/themes](https://astro.build/themes/?search=&categories%5B%5D=portfolio)** — Filter by "Portfolio" to see free templates with live demos
- **[astro.build/showcase](https://astro.build/showcase/)** — Real websites built with Astro for inspiration

Click through the live demos. Screenshot or bookmark anything that catches your eye — the layout, the colors, how projects are displayed. You'll describe what you like to the AI later.

A few popular portfolio templates worth checking:

| Template | Style | Best for |
|---|---|---|
| **Astro Nano** | Ultra-minimal, text-forward | Writers, typographers |
| **Dante** | Clean, dark/light mode | All-rounders |
| **Milky Way** | Image-heavy, gallery grid | Photographers, visual designers |

---

## Step 2: Install the Tools

You need two free things installed. Here's exactly how.

### 2a. Install Node.js

1. Go to [nodejs.org](https://nodejs.org/)
2. Click the big green **LTS** button (it will say something like "22.x.x LTS")
3. Open the downloaded file and follow the installer — click **Next/Continue** through everything, accept defaults
4. When it's done, close and reopen your terminal to confirm it worked

**How to open your terminal:**
- **Mac:** Press `Cmd + Space`, type `Terminal`, press Enter
- **Windows:** Press the Windows key, type `PowerShell`, click **Windows PowerShell**

Type this and press Enter to verify Node.js installed correctly:

```bash
node --version
```

You should see a version number like `v22.x.x`. If you see an error, restart your computer and try again.

### 2b. Install Claude Code

In the same terminal, type this and press Enter:

```bash
npm install -g @anthropic-ai/claude-code
```

Wait for it to finish (you'll see your cursor come back). That's it — Claude Code is an AI that lives in your terminal. You type in plain English, it writes the code.

> **What is a terminal?** It's just a text-based way to talk to your computer. Instead of clicking buttons, you type commands. Don't worry — you'll only need to type a handful of commands, and this guide gives you every one of them.

---

## Step 3: Create Your Portfolio

### 3a. Create a project folder and start Claude Code

Copy and paste these commands into your terminal one at a time, pressing Enter after each:

```bash
mkdir my-portfolio
cd my-portfolio
claude
```

This creates a folder called `my-portfolio`, moves into it, and launches Claude Code. You'll see a chat interface — this is where you talk to the AI.

### 3b. Give Claude the master prompt

Copy the prompt below, fill in the **[bracketed sections]** with your own details, and paste it into Claude Code. Take your time filling it in — the more specific you are, the better the result.

```
I'm a designer and I want to build a portfolio website from scratch using Astro.
I have no coding experience — handle everything for me.

## My Details
- Name: [Your Full Name]
- Role: [e.g., "Graphic Designer" / "UI/UX Designer" / "Photographer"]
- Location: [e.g., "Based in Toronto, Canada"]
- Short bio: [2-3 sentences about who you are and what you do]

## Design Direction
- Inspiration: [paste a URL to a portfolio you like, OR describe it
  — e.g., "minimal, dark background, big images" or "clean white
  grid, editorial typography"]
- Color palette: [e.g., "black + white + coral accent" /
  "warm neutrals" / "monochrome with one pop color"]
- Font style: [e.g., "clean sans-serif" / "editorial serif headings
  with sans-serif body" / "modern geometric"]
- Overall vibe: [e.g., "editorial and bold" / "soft and elegant" /
  "playful and colorful" / "dark and cinematic"]

## Site Structure
I need these pages:
1. **Home** — hero section with my name, role, and a brief tagline
2. **Work/Projects** — a grid or gallery of my projects (use
   placeholder content for now — I'll add real projects later)
3. **About** — my bio and a photo placeholder
4. **Contact** — my email and social links:
   [list your links, e.g., "email: you@email.com,
   Instagram: @yourhandle, LinkedIn: linkedin.com/in/yourname"]
5. **Resume** — a nav link that opens my resume PDF in a new tab

## Projects (placeholder for now)
Create 3 placeholder projects with these names:
1. [Project Name 1] — [one-line description]
2. [Project Name 2] — [one-line description]
3. [Project Name 3] — [one-line description]

## Instructions
1. Initialize a new Astro project in the current directory using
   the blog template: run `npm create astro@latest . -- --template blog --install --no-git --typescript relaxed`
2. Install and set up Tailwind CSS for styling
3. Build all pages and components from scratch to match my design
   direction above — do NOT use a third-party theme, build it custom
4. Store each project as a separate Markdown file in src/content/
   so I can easily edit them later
5. Put a resume link in the navigation that points to /resume.pdf
   (I'll drop the file into the public/ folder later)
6. Make the site fully responsive (looks good on phones and desktops)
7. Add smooth hover animations on project cards
8. After building everything, review ALL the code you wrote:
   - Run `npm run build` to check for build errors and fix any
   - Open each page mentally and verify no placeholder text like
     "Lorem ipsum" or "TODO" remains unless it's in the project
     placeholders
   - Verify all links and navigation work correctly
   - Check that the color palette and fonts are applied consistently
   - Fix any issues you find before telling me you're done
9. After the build succeeds, run `npm run dev` so I can preview it
```

Claude will now build your entire website. This takes a few minutes. It will:
- Set up the Astro project
- Create all your pages and components
- Apply your colors, fonts, and layout
- Review its own work and fix any errors
- Start a local preview server

### 3c. Preview your site

When Claude finishes, it will start a local server. Open your web browser and go to:

```
http://localhost:4321
```

You'll see your portfolio site with placeholder content. Look through every page and note anything you want to change.

---

## Step 4: Customize and Add Your Content

### Tell Claude what to change

Still in Claude Code, just describe what you want in plain English:

```
"Make the project grid 3 columns instead of 2"
"Add a hover zoom effect on the project images"
"Change the accent color to #E85D4A"
"Make the hero text bigger"
"Add a dark mode toggle"
```

Claude reads your project files, makes the changes, and you approve them.

### Add your real project content

Your projects are stored as simple text files (Markdown) in the `src/content/` folder. Tell Claude:

```
Update my projects with this real content:

Project 1:
- Title: [Project Name]
- Description: [2-3 sentences about the project]
- Image: project1.jpg (I'll put this in the public/images/ folder)

Project 2:
- Title: [Project Name]
- Description: [2-3 sentences about the project]
- Image: project2.jpg

Project 3:
- Title: [Project Name]
- Description: [2-3 sentences about the project]
- Image: project3.jpg

Replace all placeholder content with this.
```

### Add your images

Use your computer's file explorer to put your files in these locations inside the `my-portfolio` folder:

| File | Where to put it |
|---|---|
| Project images | `public/images/` folder — name them to match what you told Claude (e.g., `project1.jpg`) |
| Resume PDF | `public/resume.pdf` |
| Profile photo | `public/images/` folder |

**Image tips:**
- Use `.jpg` or `.webp` format — they load faster
- Keep each image under 1MB
- Use consistent dimensions across project thumbnails for a clean grid

### Edit text yourself (optional)

Once you're comfortable, you can edit content directly without Claude. Open any `.md` file in the `src/content/` folder with any text editor (TextEdit on Mac, Notepad on Windows). They look like this:

```markdown
---
title: "Brand Identity for Acme Co"
description: "Complete visual identity system"
image: "/images/acme-brand.jpg"
---

Acme Co needed a modern refresh of their decade-old brand...
```

Change the words between the `---` lines (metadata) or below them (your content), save, and the site updates instantly in your browser.

---

## Step 5: Put Your Site Online (Free)

### 5a. Push your code to GitHub

GitHub is where your website's code will live online. Netlify (your free host) reads from it.

1. Go to [github.com](https://github.com/) and create a free account (if you don't have one)
2. Click the **+** in the top right → **New repository**
3. Name it `my-portfolio`, keep it **Public**, and click **Create repository**
4. Back in Claude Code, type:

```
Push this project to my GitHub repository. My GitHub username
is [your-username] and the repo is called my-portfolio.
Set up git if it isn't already.
```

Claude will handle the git setup and push for you. It may ask you to authenticate with GitHub — follow the instructions it gives you.

### 5b. Deploy on Netlify

1. Go to [netlify.com](https://www.netlify.com/) and sign up using your **GitHub account**
2. Click **Add new site** → **Import an existing project**
3. Select **GitHub** and find your `my-portfolio` repository
4. Set these build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Click **Deploy site**

Your site will be live at `https://something-random.netlify.app` within 2-3 minutes. You can change the subdomain in **Site settings → Change site name** to something like `yourname.netlify.app`.

**From now on, every time you push updates to GitHub, Netlify automatically rebuilds and redeploys your site.**

### 5c. Get a custom domain (optional — ~$10/year)

If you want `yourname.com` instead of `yourname.netlify.app`:

1. Buy a domain at [Cloudflare Registrar](https://www.cloudflare.com/products/registrar/) (~$10/year, no markup) or [Namecheap](https://www.namecheap.com/) (~$10-12/year)
2. In Netlify: **Site settings → Domain management → Add custom domain**
3. Update your domain's DNS to point to Netlify (Netlify shows you the exact records to add)
4. HTTPS activates automatically — your site will be at `https://yourname.com`

---

## Step 6: Updating Your Site Later

Whenever you want to make changes in the future:

1. Open your terminal
2. Navigate to your project: `cd my-portfolio`
3. Start Claude Code: `claude`
4. Describe what you want to change
5. When you're happy, tell Claude: `"Push the changes to GitHub"`
6. Netlify auto-deploys — your live site updates in ~1 minute

---

## Quick Reference

| Task | How |
|---|---|
| Preview locally | `npm run dev` → open `localhost:4321` |
| Change text/content | Edit `.md` files in `src/content/` |
| Change colors, fonts, layout | Ask Claude Code in plain English |
| Add a new project | Tell Claude, or copy an existing `.md` file |
| Update your resume | Replace `public/resume.pdf` with the new file |
| Add or swap images | Drop files into `public/images/` |
| Deploy updates | Tell Claude to push to GitHub — Netlify auto-deploys |

---

## What It Costs

| Item | Cost |
|---|---|
| Astro framework | Free |
| Claude Code | Free |
| GitHub | Free |
| Netlify hosting | Free |
| Custom domain | ~$10/year (optional) |
| **Total** | **$0 - $10/year** |

No coding skills needed. No monthly subscriptions. Just describe what you want, drop in your work, and ship it.
