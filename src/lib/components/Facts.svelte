<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { textLines } from '$lib/actions/scroll';

	// Alleen feiten uit de intake, geen verzonnen cijfers.
	// Vormgeving volgt de rest van de site (tokens, Roboto Slab/Inter, kaarten, haarlijnen).
	const facts = [
		['Sinds', '2011'],
		['Werk', 'Binnen- en buitenschilderwerk, traprenovatie, behang, stucwerk'],
		['Garantie', 'Jarenlange garantie op het verfsysteem'],
		['Aanspreekpunt', 'Eén persoon, van intake tot oplevering'],
		['Advies', 'Gratis kleur- en productadvies'],
		['Adres', 'Spinnakerplantsoen 58, Almere']
	];
</script>

<section class="section facts" id="feiten">
	<div class="wrap inner">
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

	@media (min-width: 880px) {
		.inner {
			grid-template-columns: 1fr;
			max-width: 780px;
		}
	}

	@media (max-width: 480px) {
		.row {
			grid-template-columns: 1fr;
			gap: 4px;
		}
	}

</style>
