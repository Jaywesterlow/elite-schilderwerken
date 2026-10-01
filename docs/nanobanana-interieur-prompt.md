# Nano Banana: interieur dat wordt ingericht (vervangt het huis)

Elite doet alleen nog binnenwerk, dus de plaat in Feiten wordt een kamer in plaats van een gevel. Effect blijft hetzelfde: lege witte kamer onder, ingerichte kamer erboven, het inktmasker zakt op scroll.

## Werkwijze, in deze volgorde

1. **Beeld 1: de lege kamer genereren.** Laat het aan Jaymar zien. Pas na zijn akkoord verder.
2. **Beeld 2 maken als bewerking van beeld 1**, niet als nieuwe generatie. Geef beeld 1 mee als invoer en vraag om de inrichting. Dan blijven camera, perspectief, raam en muren exact gelijk, en passen de lagen pixel voor pixel op elkaar. Een tweede losse generatie loopt altijd uit de lijn.
3. Beide als WebP in `static/`, zelfde afmetingen. In `src/lib/components/Facts.svelte` de `plate`-constante invullen; de rest staat klaar.

## Prompt beeld 1: lege kamer

```
Photograph of an empty living room corner in a Dutch family home, seen from
a slight angle so two walls meet in the corner, eye level, natural
perspective. The room is completely empty and freshly plastered: bare white
walls, white ceiling, a light oak plank floor. One large window in the left
wall with slim white frames; through the window a soft, pale, overcast sky
and the faint outline of a tree, almost colourless. Even, soft daylight from
the window, gentle shadows in the corner.

Style: realistic architectural interior photography, like a well-made
estate-agent photo. Calm, clean, nothing staged. Straight vertical lines.

Composition: portrait orientation 4:5, the corner slightly right of centre,
floor visible in the lower third, the full window visible. Nothing cropped
awkwardly.

Do not include: furniture, people, text, logos, watermarks, paint tins,
ladders, tools, plants, curtains, light fittings, colour on the walls.
```

## Prompt beeld 2: dezelfde kamer, ingericht (bewerking van beeld 1)

```
Edit this exact photograph. Keep the camera, perspective, framing, window,
floor and light exactly the same; do not move or resize anything that is
already there.

Paint the back wall a deep sage green with a smooth matte finish; keep the
window wall and the ceiling warm white. Furnish the room: a low linen sofa in
oatmeal against the green wall, a round oak side table, a woven rug, a floor
lamp in brushed brass. Two trailing plants hanging from the ceiling near the
window and a tall plant in a ceramic pot in the corner. A simple framed print
on the green wall. Through the window the garden is now green and the sky is
soft blue: the colour comes in from outside too.

Style: same realistic interior photography as the original, warm and lived
in, not cluttered, no more than this.

Do not include: people, text, logos, watermarks, extra windows, changes to
the room's shape.
```

## Bijsturen

- Te steriel: `slightly warmer daylight, a bit more texture in the plaster`.
- Te druk ingericht: haal één meubelstuk uit de lijst; nooit iets toevoegen.
- Kleur te fel: `muted sage green, desaturated`.
- Lagen lopen uit de lijn: beeld 2 opnieuw als bewerking van beeld 1, met `do not change composition` vooraan.

## Gebruikt op 2026-10-01

Model `gemini-3-pro-image-preview`, 3:4, 2K. De fotoprompt hierboven gaf een te realistisch beeld; afgekeurd. Wat het werd:

1. **Lijntekening:** de oude huistekening (inmiddels verwijderd) meegestuurd als stijlreferentie, met deze prompt:

```
Use the attached drawing ONLY as a style reference: copy its exact drawing style (precise dark ink line drawing on plain off-white paper, variable line weight, no fills, no shading, no colour). Do not copy its subject.

Draw a new subject in that same style: an empty living room corner in a Dutch family home, seen from a slight angle so two walls meet in the corner, eye level, natural one-point-ish perspective with straight vertical lines. The room is completely empty: bare plastered walls, plain ceiling with a simple ceiling line, a wooden plank floor drawn with thin plank lines in perspective, a slim skirting board. One large window in the left wall with slim frames and glazing bars and a window sill; the window sits fairly low in the wall, its sill at about hip height, and the whole window is fully visible inside the image with wall around it on all sides. Through the window only a few thin lines suggest the outline of a tree.

Line weights: heavier lines for the wall corner, floor edges and window outline, medium for frames and skirting, thin for floor planks and the tree.

Composition: portrait orientation, the corner slightly right of centre, the floor in the lower third, generous margins, nothing cropped.

Do not include: furniture, people, text, labels, dimensions, logos, watermarks, borders, colour, photographic textures, hatching on the walls, paint tins, ladders, curtains, light fittings.
```

2. **Iets uitgezoomd**, als bewerking van stap 1:

```
Edit this exact drawing: zoom the camera out slightly, as if stepping one step back, so a little more of the room is visible on every side. Keep the exact same drawing style (dark ink lines on plain off-white paper, same line weights, no fills, no shading, no colour), the same viewing angle, the same room and the same window design.

Because of the zoom-out, the whole window in the left wall is now fully visible, with plain wall on its left side too, and a little more ceiling, floor and right-hand wall appear around the edges. The window sill stays at about hip height. The room stays completely empty.

Do not include: furniture, people, text, labels, dimensions, logos, watermarks, borders, colour, hatching on the walls.
```

3. **Geverfd en ingericht**, als bewerking van stap 2:

```
Do not change the composition. Edit this exact drawing: keep every existing ink line exactly where it is, same camera, perspective, framing, window, floor and walls; do not move or resize anything that is already there.

Now paint and furnish it, rendered as a clean, flat, realistic architectural colour illustration with the same dark ink outlines, like a coloured-in architect's drawing (not a photograph). Paint the right-hand back wall a deep sage green with a smooth matte finish; keep the window wall and the ceiling a warm soft white. Light oak floor planks. Furnish the room, drawn in the same ink-outline style and coloured in: a low linen sofa in oatmeal against the green wall, a round oak side table, a woven rug, a floor lamp in brushed brass. A tall plant in a ceramic pot in the corner and one trailing plant near the window. A simple framed print on the green wall. Through the window the tree is now leafy green against a soft blue sky.

Soft even daylight, subtle shading only, no harsh shadows, no gradients outside the room. Warm and lived in, not cluttered, no more than this.

Do not include: people, text, logos, watermarks, borders, extra windows, changes to the room's shape, photographic textures.
```

4. **Raamwand wit**, zonder generatie. De raamwand had de papierkleur van de lijntekening (crème), dus bij scrollen veranderde er niets. Lokaal bijgekleurd naar `#FDFDFB`; plafond bewust gelaten.
5. **Houten jaloezieën**, bewerking van stap 4. Daarna alleen het raamvlak teruggeplakt, zodat de rest pixel voor pixel gelijk bleef:

```
Do not change the composition. Edit this exact illustration: keep every existing line, colour, object and the camera exactly as they are. Change only the window.

Add light oak wooden venetian blinds inside the window recess: horizontal wooden slats with a thin pull cord on the side, raised about one third of the way so they cover only the top part of the window, slats tilted open. The tree and blue sky stay visible through the lower part of the window. Draw the blinds in the same style as the rest: clean flat colour with dark ink outlines, subtle shading only.

Do not change: the walls, wall colours, ceiling, floor, furniture, plants, the framed print, the window frame position or size. No text, no people.
```

Beide lagen bijgesneden tot 1792×2220 (vanaf y=120) en als WebP 1200×1487 in `static/kamer-lijn.webp` en `static/kamer-verf.webp`.
