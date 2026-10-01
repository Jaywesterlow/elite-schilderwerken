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
