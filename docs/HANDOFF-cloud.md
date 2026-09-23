# Hand-off: Elite Schilderwerken demo → cloud-sessie

Plak dit als eerste bericht. Pak `elite-demo/` uit in de projectmap. Reden voor de overdracht: nano banana is nodig en die is alleen vanuit de cloud bereikbaar.

## Wat dit is

Een one-page demo-site voor een cold-outreach prospect: Edwin van Elite Schilderwerken, schilder in Almere, eenmanszaak sinds 2011. De demo wordt in een mail gelinkt zodat hij ziet hoe zijn site eruit kan zien. Hij is niet het eindproduct; hij moet vooral indruk maken en urgentie geven.

- Live: https://elite-schilderwerken-demo.vercel.app
- Vercel project `elite-schilderwerken-demo`, team `jaywesterlows-projects` (`team_lLWEBAmgSB3Sra1PonSxPooO`, project `prj_4LYnnGXWKnShbPosSMQXaPXYf8pQ`). Deployment Protection staat bewust uit, laat dat zo.
- Deploy: `npx vercel deploy --prod --yes` (de CLI is ingelogd op de PC; in de cloud opnieuw inloggen of de Vercel-connector gebruiken). `.vercel/project.json` zit in de zip.
- Stack: SvelteKit + Svelte 5 runes, TypeScript strict, plain CSS met tokens in `src/app.css`, `@sveltejs/adapter-vercel`. Config in `vite.config.ts`, geen `svelte.config.js`. Geen git.
- `npm install`, dan `npm run check` en `npm run build` moeten schoon zijn.

## De enige openstaande taak

**Blueprint-illustratie genereren met nano banana en op de site zetten.**

1. Genereer één beeld met de prompt in `nanobanana-blueprint-prompt.md`. Alleen de blueprint, niet de kleurversie. Kleur kost een tweede generatie en dat mag pas als Jaymar de blueprint goedkeurt.
2. Laat het beeld aan Jaymar zien voordat je het inbouwt.
3. Goedgekeurd? Zet het in `static/` en toon het in de Feiten-sectie (`src/lib/components/Facts.svelte`), links naast de feitentabel. Die sectie staat nu op één kolom omdat de illustratie eruit is gehaald; zet hem terug op `grid-template-columns: 0.9fr 1.1fr` in de media query.
4. Pas daarna: kleurversie met dezelfde compositie genereren, beide lagen over elkaar, en het inktmasker eroverheen. De actie daarvoor staat klaar: `inkReveal` in `src/lib/actions/scroll.ts`. Vraag: lijnlaag onder, kleurlaag erboven met `mask`, de `.wipe` zakt op scroll.

Wat er eerder misging: een met de hand getekende SVG-illustratie is afgekeurd ("ziet eruit alsof iemand het in Paint met vormen heeft gemaakt"). Niet opnieuw zelf tekenen. `src/lib/components/InkHouse.svelte` staat nog in de map als referentie voor de maskertechniek, maar wordt nergens meer gebruikt en mag weg zodra het echte beeld er is.

## Regels die Jaymar heeft gesteld

- **Eén bewegingstaal per element.** Alle tekst op de site schuift omhoog uit een masker (`textLines`). Nooit een tweede stijl ernaast zetten. Containers mogen alleen faden, niet zweven.
- **Consistentie boven inspiratie.** Nooit de vormtaal van een voorbeeldsite overnemen: geen lettertypes, labels, kaders of sectietypes van elders. Alleen bewegingssystemen, vertaald naar de tokens van deze site. Hij herkent de bronsite meteen.
- **Geen verzonnen gegevens.** Alleen feiten uit de intake. Geen aantallen projecten, geen sterren, geen reviews. De drie lege review-slots blijven bewust leeg.
- **Vangrails:** tekst binnen 300 ms leesbaar, geen scroll-lock, reduced motion is een volwaardige site, Lighthouse mobiel 90 of hoger, geen WebGL.
- **Antwoorden kort houden.** Lange lappen tekst leest hij niet.
- **Demo werkt met bestaand materiaal.** Alleen bij een echte site of redesign mag je de eigenaar om nieuwe foto's vragen.

## Hoe de site nu beweegt

Alles zit in `src/lib/actions/scroll.ts` (GSAP + ScrollTrigger + SplitText + Lenis) en `src/lib/actions/reveal.ts` (IntersectionObserver-fade en magnetische knoppen).

| Recept | Waar |
|---|---|
| `textLines` | alle koppen, eyebrows, leads, dienst- en staptitels. De enige tekstbeweging |
| `pinUnder` | hero blijft staan terwijl Diensten eroverheen schuift; idem Projecten onder Reviews |
| `imageReveal` | projectfoto's knippen van onder open, foto zakt van 115 % terug |
| `stackCards` | Werkwijze: stappen stapelen op elkaar (desktop) |
| `marquee` | werkgebiedband, versnelt kort met de scroll |
| `countUp` | "15+ jaar" in de hero |
| `riseIn`, `parallax`, `drawOnScroll`, `inkReveal` | beschikbaar; `inkReveal` wacht op het blueprint-beeld |

Belangrijk: GSAP wordt **lazy** geïmporteerd binnen de acties en staat in `ssr.noExternal` in `vite.config.ts`. Een top-level import breekt de Vercel-functie met een 500.

## Inhoud van de site

Header, Hero, Diensten (6 genummerde rijen), Feiten (tabel), Werkgebiedband, Projecten (4 foto's), Reviews (3 lege slots), Werkwijze (5 stappen), Contact (formulier doet niets, met opzet), Footer, DemoOverlay.

De DemoOverlay vangt elke klik op een link of knop af en toont "Dit is een demo-site" met mailto naar jay@jwcreative.nl. De listener staat in de **capture-fase**, anders navigeert SvelteKit eerst. Niet veranderen.

Foto's zijn gehotlinkt van eliteschilderwerken.nl. Ze zijn matig (slider-uitsnedes 1920×695, zwaar gecomprimeerd, 2018) en te weinig voor een beeld-eerst opzet. Het logo staat als `static/logo.webp` in de map.

## Bestanden in deze zip

- `elite-demo/` — de volledige broncode zonder `node_modules`
- `nanobanana-blueprint-prompt.md` — de prompt plus wat het onderzoek zegt over prompten
- `bewegingsconcept.md` — waarom de site beweegt zoals hij beweegt
- `HANDOFF-cloud.md` — dit bestand

Niet meegeleverd, staat op Jaymars pc in `Downloads/animatie-catalogus/`: de animatiecatalogus (53 ontlede sites, systemen S1–S14) en de animatiebibliotheek (49 losse HTML-demo's). Vraag erom als je een nieuw effect nodig hebt. Regel daarbij: ideeën toepassen, nooit code kopiëren.
