# Soumyakant Tripathy - Developer RPG Portfolio

> The portfolio of a Senior Software Engineer (Backend · Automation · Cloud), built as a cyberpunk "Developer RPG" with a one-click plain view for recruiters.

Built with React 19, Vite and Tailwind CSS v4. Instead of borrowing a franchise theme, the site makes the developer the character. Every RPG element maps to something a hiring manager wants to know: the character card is the summary, the Journey is the career timeline and Quests are project case studies. The site itself is tested like a product, with unit tests, Playwright end-to-end tests and a CI pipeline.

---

## 🎮 Two Ways to Explore

| | **Play Mode** (default) | **Recruiter Mode** ("Skip Cutscenes") |
| --- | --- | --- |
| Look | Cyberpunk HUD: cyan + magenta on dark slate, monospace headings | Clean resume layout, light or dark theme |
| Homepage | Character card (Class, XP, Guild, Status, Current Quest) and a System Status panel | Compact intro: title, summary, experience, availability, focus |
| Sections | Journey · Skills & Loadout · Knowledge Tree · Quests · Achievements · Party Up | Experience · Skills · Currently Learning · Projects · Achievements · Contact |
| Empty sections | Shown as locked content | Hidden |

Visitors switch with the **Play | Recruiter** toggle in the navbar, and the choice is remembered. To send someone straight to the plain view, share **`/?view=recruiter`**.

---

## 🚀 Key Features

* **Character Card Homepage:** Class, XP (calculated from the career start date, so it never goes stale), Guild, Status and Current Quest, next to a live System Status panel listing current focus areas.
* **Evidence-Based Skills:** Skills are grouped into tiers (Main Weapons / Equipped) and backed by real results instead of percentage bars, with the full toolbox shown as a Loadout.
* **Quests as Case Studies:** Each project is framed as Mission → Strategy → Loot (Problem → Approach → Results in Recruiter Mode).
* **Hidden Easter Egg:** Type the Konami code (↑ ↑ ↓ ↓ ← → ← → B A), or tap the hint in the footer, to unlock the **New Game+** terminal. Try `help`, `stats`, `skills`, `goto experience` or `sudo hire-me`.
* **AI Portfolio Assistant:** A floating chat widget that answers recruiter questions, opens the resume, GitHub or LinkedIn, and scrolls to any section. Replies are rule-based, run entirely in the browser and are built from the same data as the page.
* **Scroll-Spy Navigation:** The active section is highlighted in the navbar and synced to the URL hash.
* **Fast by Default:** Below-the-fold sections, the chatbot and the terminal are lazy-loaded, vendor code is split into cacheable chunks, and photos are served as resized WebP files.
* **Accessible:** Skip link, labelled controls, keyboard support (Escape closes menus, chat and terminal), visible focus styles, readable contrast in Play Mode and reduced-motion support.

---

## 🛠️ Tech Stack

| Area | Tools |
| --- | --- |
| Framework | React 19 (functional components and hooks) |
| Build tool | Vite 8 |
| Styling | Tailwind CSS v4 |
| Icons | `lucide-react` plus inline brand SVGs |
| Typography | Google Fonts (`Outfit`) |
| Unit tests | Vitest and React Testing Library |
| E2E tests | Playwright (desktop and mobile viewports) |
| CI | GitHub Actions |

---

## 📁 Project Structure

```
src/
├── components/      # Page sections (Hero, Experience, Skills, Quests, ...) and shared UI
├── data/            # ALL content lives here — edit these files to update the site
│   ├── profile.js       # Name, title, class, focus, career start date, contact links
│   ├── experience.js    # Journey / work history
│   ├── skills.js        # Skill tiers with evidence + Loadout (toolbox)
│   ├── learning.js      # Knowledge Tree / learning roadmap
│   ├── quests.js        # Projects as case studies (Mission, Strategy, Loot)
│   ├── achievements.js  # Awards and certifications
│   └── sections.js      # Section order and names in each mode
├── lib/             # Pure logic: chatbot replies, terminal commands, XP maths, preferences
├── hooks/           # useKonamiCode
├── context/         # Play / Recruiter mode context
└── __tests__/       # Vitest unit tests
tests/               # Playwright end-to-end tests
public/              # Resume PDF, award photos, favicon
scripts/             # Image optimization helper
```

---

## 💻 Local Development

### Prerequisites
[Node.js](https://nodejs.org/) 20.19+ or 22.12+ (required by Vite 8).

### Setup

```bash
git clone https://github.com/soumyakant1211/my-portfolio.git
cd my-portfolio
npm install
npm run dev
```

Then open `http://localhost:5173`.

### Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server with hot reload |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |
| `npm test` | Run unit tests in watch mode |
| `npm run test:run` | Run unit tests once |
| `npm run test:e2e` | Run Playwright end-to-end tests (starts the dev server automatically) |

The first time you run E2E tests, install the browser with `npx playwright install chromium`.

### Adding photos

Drop a `.jpg`/`.png` into `public/` and run `python scripts/optimize_images.py public/<file>` (needs `pip install Pillow`). It writes a resized `.webp` next to the original. Reference the `.webp` and delete the original.

---

## ✅ Continuous Integration

Every push and pull request to `main` runs [`.github/workflows/ci.yml`](.github/workflows/ci.yml):

1. **Lint, Unit Tests & Build:** ESLint, Vitest and a production build.
2. **E2E Tests:** Playwright on Chromium. The HTML report is uploaded as a build artifact.

---

## 📞 Contact
**Soumyakant Tripathy**
- LinkedIn: [linkedin.com/in/soumyakant-tripathy](https://www.linkedin.com/in/soumyakant-tripathy/)
- GitHub: [github.com/soumyakant1211](https://github.com/soumyakant1211)
