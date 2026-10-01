# Hand-off: Elite Schilderwerken

Plak dit als eerste bericht in een nieuwe cloud-sessie. Bijgewerkt 2026-10-01; vervangt `HANDOFF-cloud.md`.

## Waar alles staat

- **Repo (bron van waarheid):** https://github.com/Jaywesterlow/elite-schilderwerken. Clone en werk hierin.
- **Live:** https://elite-schilderwerken-demo.vercel.app
- **Vercel:** project `elite-schilderwerken-demo`, team `jaywesterlows-projects` (`team_lLWEBAmgSB3Sra1PonSxPooO`, `prj_4LYnnGXWKnShbPosSMQXaPXYf8pQ`). Deployment Protection staat bewust uit.
- **Let op: de repo is niet aan Vercel gekoppeld.** Een push zet niets live. Na commit en push: deployen met `npx vercel deploy --prod --yes` (na `vercel link`) of via de Vercel-connector vanuit de git-ref. Jaymar kan de koppeling zelf aanzetten in Vercel onder Settings, Git.
- Herhaald pollen met curl triggert de Vercel Security Checkpoint (403). Controleer de live site in een browser.
- Bestanden hebben CRLF-regeleinden.

## Stand van zaken

**De klant.** Edwin, Elite Schilderwerken, Almere, eenmanszaak sinds 2011. Hij heeft de demo gezien, vond hem goed en wil verder. Wat hij zei:
- Alleen nog binnenwerk, geen buitenwerk meer.
- Minder zelf schilderen.
- Uitbreiden naar iets nieuws. Jaymar verstond "vastgoed", maar dat is onzeker.
- Hij wil "alles kunnen beheren vanuit één plek". Wat "alles" is, is nog onbekend.

Edwin zou maandag reageren en heeft dat niet gedaan. Hij heeft het druk, dat is normaal voor deze doelgroep.

**De site** is omgezet naar alleen binnenwerk (commit `b54632b`): hero met keukenfoto, diensten zonder buitenwerk, projecten alleen keuken en trap. De geverfde huisplaat in Feiten staat uit, omdat een gevel niet meer past. De code staat klaar: in `src/lib/components/Facts.svelte` de `plate`-constante invullen, dan staat hij weer aan.

## Openstaande taken, in volgorde

1. **Kamerbeelden genereren met Nano Banana.** Prompt staat in `docs/nanobanana-interieur-prompt.md`. Eerst alleen de lege witte kamer en die aan Jaymar laten zien. Pas na zijn akkoord de ingerichte versie, als **bewerking** van het eerste beeld zodat de lagen exact op elkaar passen. Twee generaties kosten geld, dus niet allebei tegelijk.
2. **Beelden inbouwen.** WebP in `static/`, `plate` invullen in Facts, controleren op desktop en mobiel, deployen.
3. **Opvolging Edwin.** Bericht klaar om te sturen zodra de site live is (zie hieronder). Bel daarna met twee concrete dagen.
4. **Intakedocument.** Jaymar maakt dat in een andere chat met de prompt `prompt-intakedocument-edwin.md` (staat ook in `docs/`). Dit hoort niet in deze sessie.

**Bericht aan Edwin (WhatsApp):**
> Hoi Edwin, ik heb de site alvast omgezet naar alleen binnenwerk, zoals je zei: https://elite-schilderwerken-demo.vercel.app. Eén vraag: die uitbreiding waar je het over had, was dat vastgoed? Dan neem ik dat mee. Past dinsdag of woensdag om even te bellen?

## Advies dat al gegeven is

- **Website eerst, vaste prijs.** Met één kleine automatisering die hem tijd scheelt, bijvoorbeeld een offerteformulier dat ruimtes en foto's uitvraagt.
- **Daarna één module die hij elke week gebruikt**, liefst gekoppeld aan een bestaand pakket in plaats van zelf gebouwd.
- **Strippenkaart pas na vertrouwen** (advies van Laura). Niet aan fase 2 beginnen voordat fase 1 betaald is.
- Focus op één branche: elke schilder, vloerlegger of stukadoor heeft hetzelfde offerteprobleem.

## Regels van Jaymar

- **Antwoorden kort.** Lange tekst leest hij niet.
- **Eén tekstbeweging op de hele site:** alles schuift uit een masker omhoog (`textLines`). Nooit een tweede stijl ernaast.
- **Consistentie boven inspiratie:** geen lettertypes, labels of kaders van andere sites overnemen, alleen bewegingsideeën in de eigen huisstijl.
- **Geen verzonnen gegevens:** alleen feiten uit de intake. De drie review-slots blijven leeg tot er echte reviews zijn.
- **Nooit zelf een illustratie tekenen.** Een handgemaakte SVG is afgekeurd. Illustraties komen uit Nano Banana.
- **Vangrails:** tekst binnen 300 ms leesbaar, geen scroll-lock, reduced motion is een volledige site, Lighthouse mobiel 90 of hoger, geen WebGL.

## Techniek

SvelteKit met Svelte 5 runes, TypeScript strict, plain CSS met tokens in `src/app.css`, adapter-vercel. Beweging in `src/lib/actions/scroll.ts` (GSAP, ScrollTrigger, SplitText, Lenis) en `src/lib/actions/reveal.ts`.

- GSAP **lazy** importeren binnen de acties en in `ssr.noExternal` houden, anders geeft Vercel een 500.
- De DemoOverlay vangt kliks af in de **capture-fase**, anders navigeert SvelteKit eerst. Niet veranderen.
- `npm run check` en `npm run build` moeten schoon blijven.

## Mensen

- **Laura:** ex-WordPress-specialist, nu bij allaboutai, werkt met Lovable, Claude en Paperclip. Geeft advies over klanten.
- **Aren** (zo gespeld): wordt binnenkort vader, legt vloeren, heeft geen tijd om zijn intakedocument in te vullen. Volgende klant in dezelfde doelgroep.
