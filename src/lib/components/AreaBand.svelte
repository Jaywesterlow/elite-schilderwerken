<script lang="ts">
	import { marquee } from '$lib/actions/scroll';

	// Werkgebied uit de intake. De rij staat twee keer in de markup, zodat de lus naadloos is.
	const places = [
		'Almere',
		'Lelystad',
		'Amsterdam',
		'Hilversum',
		"'t Gooi",
		'Amersfoort',
		'Naarden',
		'Weesp'
	];
</script>

<section class="band" aria-label="Werkgebied">
	<div class="track" use:marquee>
		{#each [0, 1] as copy}
			<ul aria-hidden={copy === 1 ? 'true' : undefined}>
				{#each places as place}
					<li>{place}<span class="dot" aria-hidden="true"></span></li>
				{/each}
			</ul>
		{/each}
	</div>
</section>

<style>
	.band {
		border-block: 1px solid var(--ink-200);
		background: var(--paper);
		overflow: hidden;
		padding-block: 18px;
		/* Randen uitfaden zodat de woorden niet afgesneden lijken */
		mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent);
	}

	.track {
		display: flex;
		width: max-content;
		will-change: transform;
	}

	ul {
		display: flex;
		align-items: center;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	li {
		display: flex;
		align-items: center;
		gap: clamp(20px, 4vw, 44px);
		padding-right: clamp(20px, 4vw, 44px);
		font-family: var(--font-head);
		font-weight: 700;
		font-size: clamp(1.1rem, 2.2vw, 1.6rem);
		color: var(--teal-900);
		white-space: nowrap;
	}

	.dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: var(--red-500);
		flex: none;
	}

	@media (prefers-reduced-motion: reduce) {
		.band {
			mask-image: none;
		}
		.track {
			width: 100%;
			overflow-x: auto;
		}
	}
</style>
