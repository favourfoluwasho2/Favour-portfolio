# Foluwasho Favour — Academic Portfolio & Student Management Platform

A multi-page personal academic portfolio built with plain HTML, CSS and JavaScript (no frameworks, no build step).

**Student:** Foluwasho Favour · **Department:** Computer Science · **Matric No:** 2025/B/CSC/0651 · **Email:** f.foluwasho3222@miva.edu.ng

## Pages

| Page | File | What it does |
|---|---|---|
| Home | `index.html` | Photo, welcome message, navigation, biography, quick stats, timeline |
| About Me | `about.html` | Education, career aspirations, technical skills (table + animated skill bars), hobbies |
| Projects | `projects.html` | Three projects with original SVG cover art, a self-produced showcase video, and links |
| Academic Planner | `planner.html` | Interactive task manager — add, complete, delete, filter, saved to `localStorage` |
| Contact | `contact.html` | Contact form with live JavaScript validation (empty fields, email format, digits-only phone) |

## Tech demonstrated

- **HTML:** semantic elements (`header`, `nav`, `main`, `section`, `article`, `footer`), a `<table>`, a `<form>`, a `<video>` element, ordered/unordered lists, images and hyperlinks throughout.
- **CSS:** external stylesheet (`css/styles.css`), CSS custom properties, Flexbox and Grid layouts, a mobile hamburger nav, hover/scroll animations, and a fully responsive layout down to small phones.
- **JavaScript:** `js/main.js` (nav toggle, scroll-reveal), `js/planner.js` (task CRUD with arrays/objects, event handling, DOM updates, `localStorage`), `js/contact.js` (form validation with regex).

## Run it locally

No build step needed — it's static HTML/CSS/JS.

```bash
# from inside this folder
python3 -m http.server 8000
# then open http://localhost:8000 in your browser
```

Or just double-click `index.html` (the planner and contact form JS both work fine opened directly from disk; the video and images use relative paths so keep the folder structure intact).

## Deploying it

**GitHub Pages (recommended, free):**
1. Create a new GitHub repository (e.g. `favour-portfolio`) and push this whole folder to it.
2. In the repo, go to **Settings → Pages**, set the source branch to `main` and folder to `/ (root)`.
3. GitHub will publish it at `https://<your-username>.github.io/favour-portfolio/`.

```bash
git init
git add .
git commit -m "Initial commit: academic portfolio site"
git branch -M main
git remote add origin https://github.com/<your-username>/favour-portfolio.git
git push -u origin main
```

**Netlify / Vercel:** drag-and-drop this folder into either dashboard for an instant live URL — no configuration required since there's no build step.

## Folder structure

```
├── index.html
├── about.html
├── projects.html
├── planner.html
├── contact.html
├── css/
│   └── styles.css
├── js/
│   ├── main.js
│   ├── planner.js
│   └── contact.js
├── assets/
│   ├── favour-hero.jpg
│   ├── favour-avatar.jpg
│   └── projects/
│       ├── portfolio-reel.mp4
│       └── portfolio-reel-poster.jpg
└── README.md
```
