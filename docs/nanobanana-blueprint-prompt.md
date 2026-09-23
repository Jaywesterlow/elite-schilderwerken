# Nano Banana: blueprint van een woning (Elite Schilderwerken)

Eén beeld genereren, niet twee. Pas als deze blueprint goed is, maken we de ingekleurde versie met exact dezelfde compositie.

## Wat het onderzoek zegt over prompten

- **Benoem het beeldtype expliciet.** Nano Banana Pro kent "blueprint", "technical drawing", "orthographic elevation" als aparte types en stuurt daar hard op.
- **Vraag om variabele lijndiktes.** Dik voor doorsneden en contouren, dun voor projectie. Dat maakt het verschil tussen een tekening en een vormenspel.
- **Beschrijf per onderdeel.** Gevel, dak, kozijnen, deur, oprit, voortuin. Elk onderdeel dat je niet noemt, verzint het model zelf.
- **Zeg wat er niet in mag.** Geen tekst, geen maatvoering, geen mensen, geen logo, geen randen.
- **Zet stijl, camera en formaat apart neer.** Recht van voren, ooghoogte, geen perspectiefvertekening.

Bronnen: [Nano Banana voor architecten](https://www.myarchitectai.com/blog/nano-banana-for-architects), [Nano Banana Pro voor architectuur](https://imini.com/blogs/how-to-use-nano-banana-pro-for-architecture), [prompt-strategieën](https://www.techradar.com/ai-platforms-assistants/gemini/3-advanced-strategies-for-making-the-most-of-nano-banana-pro), [architectuurprompts](https://bestnanobananaprompt.com/prompts/subjects/architecture).

## De prompt (plakken in Google AI Studio of Gemini)

```
Architectural blueprint line drawing of a single detached family house, front
elevation, seen straight on at eye level, no perspective distortion.

The house: two storeys under a simple gable roof, plastered facade, four
windows with visible frames and glazing bars, a panelled front door with a
small canopy over it, gutter and downpipe, one chimney. In front of the house
a modest front garden with a low hedge, a paved path to the door and a small
patio beside it with two chairs. A calm, tidy suburban setting, no street name,
no house number, no recognisable location.

Style: precise technical line drawing, outlines only, as if the photograph of
a well-kept house has been traced. Dark ink lines on a plain off-white paper
background. Variable line weight: heavier lines for the outer contour of the
building and the ground line, medium for window and door frames, thin for
surface detail such as roof tiles, brick courses and hedge texture. Just enough
detail to read as real architecture, not a cartoon, and not shaded: no fills,
no colour, no hatching except a few fine lines to suggest the roof and the
paving. Clean, restrained, the drawing an architect makes before the paint.

Composition: the house centred, full building visible with generous margins,
portrait orientation 3:4. Nothing cropped.

Do not include: text, dimensions, labels, title blocks, arrows, people, cars,
watermarks, borders, colour, photographic textures, harsh shadows.
```

## Bijsturen als het niet klopt

- Te cartoonachtig: voeg toe `more architectural precision, drawn with a fine technical pen, subtle irregular hand-inked line`.
- Te druk: `fewer surface lines, leave the facade largely empty`.
- Te plat: `add slight depth through the canopy, window reveals and the roof overhang, still without shading`.
- Verkeerd huis: vervang de tweede alinea door het huistype dat je wilt. Vrijstaand, twee-onder-een-kap of rijtjeswoning.

## Daarna

Lever het beeld aan als PNG met transparante of egaal witte achtergrond. Dan zet ik het als blueprint op de site. Zodra jij die goedkeurt, maken we met dezelfde prompt plus `same composition, now painted` de kleurversie, en gaat het inktmasker eroverheen.
