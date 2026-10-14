# Soumyakant Tripathy - Senior SDET Portfolio

> A modern, high-performance engineering portfolio for a Senior Software Development Engineer in Test (SDET) and QA Automation Engineer.

Built with React 19, Vite and Tailwind CSS v4, the site focuses on speed, technical credibility and a clean experience for recruiters. Instead of a generic "frontend developer" template, it highlights hard engineering metrics, CI/CD work and a terminal-style test report in the hero. The site itself is tested like a product, with unit tests, Playwright end-to-end tests and a CI pipeline.

---

## 🚀 Key Features

* **Automation Terminal UI:** A macOS-style terminal in the hero that simulates a passing Playwright/PyTest suite run.
* **Metric-Driven Experience Section:** Work history quantified by business impact: coverage gains, faster regressions and reduced manual effort, with the tech stack used on each role.
* **AI Portfolio Assistant:** A floating chat widget that answers recruiter questions (experience, frameworks, CI/CD, skills, contact details), opens the resume, GitHub or LinkedIn, and can scroll to any section. Replies are rule-based and run entirely in the browser.
* **Scroll-Spy Navigation:** The active section is highlighted in the navbar and synced to the URL hash as you scroll.
* **Dark Mode First:** A glassmorphic design that defaults to dark, with a light theme that is remembered between visits and never flashes on load.
* **Fast by Default:** Below-the-fold sections and the chatbot are lazy-loaded, vendor code is split into cacheable chunks, and photos are served as resized WebP files.
* **Accessible:** Skip link, labelled controls, keyboard support (Escape closes menus and chat), visible focus styles and reduced-motion support.
* **SEO Ready:** Descriptive meta tags, Open Graph/Twitter tags and `Person` structured data.

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
├── components/      # Page sections (Hero, Experience, Skills, ...) and shared UI
├── data/profile.js  # Contact details and links — edit these in one place
├── lib/chatbot.js   # Chatbot intents and replies (pure, unit-tested)
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
