# The 650

**🟢 Live: [amyleesterling.github.io/the650](https://amyleesterling.github.io/the650/)**

**Feel all 650.** You have ~650 skeletal muscles. On any given day you
consciously feel maybe a dozen — the other ~640 are working anyway, holding
your head up, catching your balance, pumping your blood and lymph. The 650 is a
wellness site about gentle, alignment-based stretching, built around an
interactive visualization that makes the hidden orchestra of muscles inside
ordinary movement visible.

The spine of the project is a principle: **numerical precision and source
transparency over soft wellness claims.** Named prime movers are counted;
stabilizer swarms are shown as ranges with a note; popular factoids ("200
muscles to take a step") are labelled as estimates, not measurements. Every
claim is presented at the strength its evidence supports.

## The experience

- **The Hidden Effort** (`/`) — pick an everyday action and watch its prime
  movers light up on a stylized body figure, with a live count, a "hidden load"
  fact, and the persistent **650 meter** showing how much is still waiting to be
  felt.
- **Explore a Muscle** (`/muscles`) — the "if X is tight, then Y" teaching
  layer, built on Janda's crossed syndromes and reciprocal inhibition (framed as
  a clinical model, not gospel).
- **Why Gentle & Slow** (`/why`) — a three-beat scrollytell (Lymph / Blood /
  Calm) using verified, cited physiology.
- **The Practice** (`/practice`) — what The 650 actually is.
- **About & Sources** (`/about`) — the manifesto and the public, cited sources
  list.

## Tech

- **React + Vite + TypeScript** SPA, deployable to **GitHub Pages**.
- **Data-driven**: the whole visualization reads from two typed collections in
  `src/data/` (`actions.ts`, `muscles.ts`) plus `sources.ts`. Adding an action
  or a muscle never requires touching component internals.
- **Stylized SVG muscle map** with per-muscle addressable nodes keyed by
  `MuscleId`.
- **Design tokens** defined once in `src/styles/tokens.css` (colour, type scale,
  spacing, motion) and honoured throughout.
- **Slow, eased motion** everywhere; full `prefers-reduced-motion` support. The
  UX embodies the thesis: nothing snaps, everything settles.

## Develop

```bash
npm install
npm run dev        # local dev server at /
npm run build      # type-check + production build to dist/ (base /the650/)
npm run preview    # preview the production build
```

## Deploy

The site is live at **https://amyleesterling.github.io/the650/**.

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and
publishes `dist/` to GitHub Pages (repo **Settings → Pages → Source: GitHub
Actions**). The production build uses a **relative** asset base (`base: './'`
in `vite.config.ts`), so the bundled CSS/JS resolve correctly whatever sub-path
Pages serves from — combined with `HashRouter`, deep links work without any
server-side rewrite.

---

*The 650 is educational and not medical advice. Gentle movement is broadly safe,
but if you have pain, an injury, or a medical condition, check with a clinician
before starting a new practice.*
