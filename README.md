# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```sh
# create a new project
npx sv create my-app
```

To recreate this project with the same configuration:

```sh
# recreate this project
npx sv@0.17.0 create --template minimal --types ts --no-install elite-demo
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

## v2 "impress" pass (2026-09-16)

Wat is gedaan: full-bleed hero met Ken Burns + verfstreep, echte logo (WebP) in header/footer,
scroll reveals via `use:reveal`, diensten als genummerde 2-koloms lijst met paint-swipe,
projecten als staggered grid (desktop) / scroll-snap rail (mobiel), werkwijze-stappen die
oplichten in het midden van het scherm, knoppen met colour-wipe + magnetic hover.
DemoOverlay-listener naar capture-fase (SvelteKit's router zat er anders voor).

Bewust overgeslagen: reviews-marquee, lightbox, before/after, hover-foto's bij diensten,
git/GitHub-koppeling, prospect.ts-splitsing.

Budget: ongeveer één sessie. Grootste kostenposten: de deploy via de Vercel-connector
(alle bronbestanden inline meesturen, want CLI was niet ingelogd) en de screenshots.
Volgende keer: `npx vercel login` één keer doen, dan is deploy één commando.

Deploy: Vercel-connector `deploy_to_vercel`, target production, zonder package-lock.json.

## v3 GSAP pass (2026-09-16)

- `gsap` + `lenis` toegevoegd. Recepten in `src/lib/actions/scroll.ts`: `pinUnder`, `parallax`, `riseIn`; `initScroll()` in `+layout.svelte`.
- Sectie-stack: hero blijft staan onder Diensten, Projecten blijft staan onder Reviews. `main > *` krijgt z-index en achtergrond in `app.css`.
- Gotcha: GSAP top-level importeren breekt SSR op Vercel ("does not provide an export named ScrollTrigger"). Oplossing: lazy `import()` in de actions plus `ssr.noExternal: ['gsap','lenis']` in `vite.config.ts`.
- Deploy: `npx vercel deploy --prod --yes` (CLI is ingelogd en gelinkt).

## v4 S14 feitentabel (2026-09-18)

- `Facts.svelte` tussen Diensten en Projecten: kozijn-lijntekening die zich intekent (`pathLength="1"` + `stroke-dashoffset`), feitentabel met haarlijnen, monospace-labels, titelblok. Alleen feiten uit de intake.
- Concept en herkomst: `bewegingsconcept.md` (stap 0 uit de animatie-systemen-catalogus).

## v5 ideeën uit de animatiebibliotheek (2026-09-21)

- `headingLines`: sectiekoppen per regel uit een masker (SplitText, expo.out 0,9 s, eenmalig). Idee uit bibliotheek 11 (zachte variant).
- `imageReveal`: projectfoto's knippen van onder open terwijl de foto van 115 % terugzoomt. Idee uit bibliotheek 12. Vervangt de parallax.
- Bewegingssoorten blijven drie: sectie-stack, maskers (tekst en beeld), lijntekening.

## v6 (2026-09-23)
- Werkwijze: stapelende kaarten (bibliotheek 22). Feiten: huis in twee lagen dat wordt ingekleurd op scroll (48), met rafelig inktmasker. Werkgebiedband met kinetische marquee (42). Teller in de hero (37).
- nano banana niet bereikbaar (Weave vraagt om koppeling met Figma-account), dus de twee lagen zijn met de hand als SVG getekend: één vormdefinitie, twee keer gebruikt.
