<script lang="ts">
	import { onMount } from 'svelte';
	import { reveal, magnetic } from '$lib/actions/reveal';
	import { textLines, stackCards } from '$lib/actions/scroll';

	const steps = [
		['Persoonlijke intake', 'We komen langs, kijken naar de ondergrond en bespreken wat je wilt.'],
		['Heldere offerte op maat', 'Geen verrassingen achteraf. Je krijgt een gespecificeerde opdrachtbevestiging.'],
		['Duidelijke werkomschrijving', 'Je weet precies wat er gebeurt, met welk product, en wanneer.'],
		['Voortgang tijdens het werk', 'Je wordt regelmatig bijgepraat. Elke dag ruimen we de werkplek op.'],
		['Schoon opgeleverd, met garantie', 'Aan het eind is alles opgeruimd en schoongemaakt. Jarenlange garantie op het verfsysteem.']
	];

	let list: HTMLOListElement;
	let active = $state(-1);

	onMount(() => {
		const items = Array.from(list.querySelectorAll('li'));
		// Fires when a step crosses the middle band of the viewport.
		const io = new IntersectionObserver(
			(entries) => {
				for (const e of entries) {
					if (e.isIntersecting) active = items.indexOf(e.target as HTMLLIElement);
				}
			},
			{ rootMargin: '-45% 0px -45% 0px', threshold: 0 }
		);
		items.forEach((li) => io.observe(li));
		return () => io.disconnect();
	});
</script>

<section class="section" id="werkwijze">
	<div class="wrap inner">
		<div class="intro" use:reveal={{ stagger: 90 }}>
			<p class="eyebrow" use:textLines>Zo werken we</p>
			<h2 use:textLines>Klein bedrijf, dus je hebt altijd dezelfde persoon aan de lijn.</h2>
			<p class="lead" use:textLines={{ duration: 1.1 }}>
				Elite Schilderwerken is in 2011 opgericht na jaren aan opleidingen en cursussen. Klein genoeg
				voor persoonlijke aandacht, ervaren genoeg voor grote klussen.
			</p>
			<a class="btn btn-primary" href="/offerte" use:magnetic>Plan een intake</a>
		</div>
		<ol class="steps" bind:this={list} use:reveal={{ stagger: 80 }} use:stackCards>
			{#each steps as [title, text], i}
				<li class:active={i === active} class:done={i < active}>
					<span class="num"><span>{i + 1}</span></span>
					<div>
						<h3 use:textLines>{title}</h3>
						<p use:textLines={{ delay: 0.08 }}>{text}</p>
					</div>
				</li>
			{/each}
		</ol>
	</div>
</section>

<style>
	.inner {
		display: grid;
		gap: clamp(28px, 5vw, 72px);
		align-items: start;
	}

	.intro .btn {
		margin-top: 0.5rem;
	}

	.steps {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 0;
		position: relative;
	}

	.steps li {
		display: grid;
		grid-template-columns: 52px 1fr;
		gap: 20px;
		padding: clamp(18px, 2.5vw, 28px) 0;
		border-bottom: 1px solid var(--ink-200);
		transition: opacity var(--dur) var(--ease);
	}

	.steps h3 {
		margin-bottom: 0.25rem;
		font-size: 1.15rem;
		transition: color var(--dur) var(--ease);
	}

	.steps p {
		margin: 0;
		color: var(--ink-700);
		font-size: 0.97rem;
		max-width: 48ch;
	}

	/* Number: outline circle that fills red when active, teal once passed */
	.num {
		position: relative;
		width: 52px;
		height: 52px;
		border-radius: 50%;
		display: grid;
		place-items: center;
		border: 1.5px solid var(--ink-200);
		color: var(--ink-500);
		font-family: var(--font-head);
		font-weight: 700;
		font-size: 1.1rem;
		overflow: hidden;
		isolation: isolate;
		transition:
			color var(--dur) var(--ease),
			border-color var(--dur) var(--ease);
	}

	.num::before {
		content: '';
		position: absolute;
		inset: 0;
		z-index: -1;
		border-radius: 50%;
		background: var(--red-500);
		transform: scale(0);
		transition: transform var(--dur) var(--ease), background var(--dur) var(--ease);
	}

	li.active .num,
	li.done .num {
		color: var(--white);
		border-color: transparent;
	}

	li.active .num::before,
	li.done .num::before {
		transform: scale(1);
	}

	li.done .num::before {
		background: var(--teal-900);
	}

	li.active h3 {
		color: var(--red-500);
	}

	@media (min-width: 880px) {
		.inner {
			grid-template-columns: 0.9fr 1.1fr;
		}
		.intro {
			position: sticky;
			top: calc(var(--header-h) + 24px);
		}

		/* Stapel: elke stap zet zich vast, de volgende schuift eroverheen.
		   De marge onder elke kaart is de scrollafstand die de kaart blijft staan. */
		.steps {
			gap: 0;
			padding-bottom: 10vh;
		}

		.steps li + li {
			margin-top: 14px;
		}

		.steps li:not(:last-child) {
			margin-bottom: 42vh;
		}

		.steps li {
			position: sticky;
			background: var(--paper);
			border: 1px solid var(--ink-200);
			border-bottom: 1px solid var(--ink-200);
			border-radius: var(--radius-lg);
			padding: clamp(18px, 2.5vw, 28px);
			transform-origin: center top;
			will-change: transform;
		}

		.steps li:nth-child(1) {
			top: calc(var(--header-h) + 24px);
			z-index: 1;
		}
		.steps li:nth-child(2) {
			top: calc(var(--header-h) + 36px);
			z-index: 2;
		}
		.steps li:nth-child(3) {
			top: calc(var(--header-h) + 48px);
			z-index: 3;
		}
		.steps li:nth-child(4) {
			top: calc(var(--header-h) + 60px);
			z-index: 4;
		}
		.steps li:nth-child(5) {
			top: calc(var(--header-h) + 72px);
			z-index: 5;
		}
	}
</style>
