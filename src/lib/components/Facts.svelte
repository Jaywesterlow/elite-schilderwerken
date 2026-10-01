<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { textLines, inkReveal } from '$lib/actions/scroll';

	// Alleen feiten uit de intake, geen verzonnen cijfers.
	// Vormgeving volgt de rest van de site (tokens, Roboto Slab/Inter, kaarten, haarlijnen).
	const facts = [
		['Sinds', '2011'],
		['Werk', 'Binnenschilderwerk, traprenovatie, behang, stucwerk'],
		['Garantie', 'Jarenlange garantie op het verfsysteem'],
		['Aanspreekpunt', 'Eén persoon, van intake tot oplevering'],
		['Advies', 'Gratis kleur- en productadvies'],
		['Adres', 'Spinnakerplantsoen 58, Almere']
	];

	// De geverfde plaat: lege kamer als lijntekening onder, dezelfde kamer geverfd en
	// ingericht erboven. Op null zetten en de plaat staat uit.
	type Plate = { lines: string; paint: string; alt: string; w: number; h: number };
	const plate: Plate | null = {
		lines: '/kamer-lijn.webp',
		paint: '/kamer-verf.webp',
		alt: 'Lijntekening van een lege woonkamer die wordt geverfd en ingericht',
		w: 1200,
		h: 1487
	};
</script>

<section class="section facts" id="feiten">
	<div class="wrap inner" class:has-plate={plate}>
		<div class="sheet" use:reveal={{ stagger: 70 }}>
			<p class="eyebrow" use:textLines>Feiten</p>
			<h2 use:textLines>Geen beloftes, gewoon de gegevens.</h2>
			<dl>
				{#each facts as [label, value]}
					<div class="row">
						<dt>{label}</dt>
						<dd>{value}</dd>
					</div>
				{/each}
			</dl>
		</div>

		<!-- Eén tekening, twee lagen: de lijntekening onder, dezelfde tekening geverfd erboven.
		     Het inktmasker (.wipe) zakt op scroll, dus de kamer wordt geverfd terwijl je leest. -->
		{#if plate}
		<figure class="plate" use:reveal use:inkReveal>
			<div class="drawing">
				<img
					class="lines"
					src={plate.lines}
					alt={plate.alt}
					width={plate.w}
					height={plate.h}
					loading="lazy"
					decoding="async"
				/>
				<div class="wipe" aria-hidden="true">
					<img class="paint" src={plate.paint} alt="" width={plate.w} height={plate.h} loading="lazy" decoding="async" />
				</div>
			</div>
			<figcaption>Zo gaat het in het echt ook: eerst de ondergrond, dan de verf.</figcaption>
		</figure>
		{/if}
	</div>
</section>

<style>
	.facts {
		background: var(--paper);
	}

	.inner {
		display: grid;
		gap: clamp(28px, 5vw, 72px);
		align-items: start;
	}

	dl {
		margin: 1.5rem 0 0;
		border-top: 1px solid var(--ink-200);
	}

	.row {
		display: grid;
		grid-template-columns: 8.5rem 1fr;
		gap: 16px;
		padding: 14px 0;
		border-bottom: 1px solid var(--ink-200);
	}

	dt {
		font-size: 0.8rem;
		font-weight: 600;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--ink-500);
		padding-top: 0.2em;
	}

	dd {
		margin: 0;
		font-family: var(--font-head);
		font-weight: 700;
		font-size: 1.05rem;
		line-height: 1.35;
		color: var(--teal-900);
	}

	.plate {
		margin: 0;
	}

	.drawing {
		position: relative;
		overflow: hidden;
		border: 1px solid var(--ink-200);
		border-radius: var(--radius-lg);
		/* Papiertint van de tekening zelf, zodat de rand nooit kleurt bij het laden. */
		background: #f3eae2;
		--edge: 6%;
	}

	.drawing img {
		width: 100%;
		height: auto;
		display: block;
	}

	.wipe {
		position: absolute;
		inset: 0;
		overflow: hidden;
		/* Bovenste deel dicht, onderste 6 % een rafelige inktrand. Samen één masker. */
		mask:
			linear-gradient(#000, #000) top / 100% calc(100% - var(--edge)) no-repeat,
			url('/inkrand.svg') bottom / 100% var(--edge) no-repeat;
		-webkit-mask:
			linear-gradient(#000, #000) top / 100% calc(100% - var(--edge)) no-repeat,
			url('/inkrand.svg') bottom / 100% var(--edge) no-repeat;
		will-change: transform;
	}

	.paint {
		position: absolute;
		inset: 0;
		will-change: transform;
	}

	/* Startstand zolang GSAP nog laadt, alleen met beweging aan (html.motion uit initScroll).
	   Zonder JS of met minder beweging staat de kamer gewoon geverfd op de plaat. */
	:global(html.motion) .wipe {
		transform: translateY(-104%);
	}

	:global(html.motion) .paint {
		transform: translateY(104%);
	}

	figcaption {
		margin-top: 12px;
		font-size: 0.9rem;
		color: var(--ink-500);
	}

	@media (min-width: 880px) {
		.inner {
			max-width: 780px;
		}

		.inner.has-plate {
			max-width: none;
			grid-template-columns: 0.9fr 1.1fr;
		}

		.plate {
			order: -1;
		}
	}

	@media (max-width: 480px) {
		.row {
			grid-template-columns: 1fr;
			gap: 4px;
		}
	}
</style>
