<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { riseIn, textLines } from '$lib/actions/scroll';

	// Bewust placeholders: hier komen de echte reviews van Edwin (Google, Werkspot, of per mail).
	const slots = [
		{ who: 'Klant uit Almere Buiten', job: 'Buitenschilderwerk' },
		{ who: 'Klant uit Lelystad', job: 'Traprenovatie' },
		{ who: 'Klant uit Almere Haven', job: 'Binnenschilderwerk en stucwerk' }
	];
</script>

<section class="section reviews" id="reviews">
	<span class="mark" aria-hidden="true">&ldquo;</span>
	<div class="wrap" use:riseIn>
		<div class="head" use:reveal={{ stagger: 90 }}>
			<p class="eyebrow" use:textLines>Reviews</p>
			<h2 use:textLines>Wat klanten zeggen over het werk.</h2>
			<p class="lead" use:textLines={{ duration: 1.1 }}>
				Hier komen jouw echte reviews. Dit is het eerste waar een twijfelende klant naar zoekt, en
				het staat nu nergens op de site. Drie zijn genoeg: van Google, of uit een appje van een
				tevreden klant.
			</p>
		</div>
		<div class="grid grid-3" use:reveal={{ stagger: 100 }}>
			{#each slots as s}
				<blockquote class="card quote">
					<span class="stars" aria-label="Vijf sterren">★★★★★</span>
					<p class="placeholder">
						Plek voor een review. Twee of drie zinnen van een klant over hoe het werk ging en hoe het
						eruitziet.
					</p>
					<footer>
						<strong>{s.who}</strong>
						<span>{s.job}</span>
					</footer>
				</blockquote>
			{/each}
		</div>
	</div>
</section>

<style>
	.reviews {
		position: relative;
		background: var(--teal-900);
		color: var(--white);
		overflow: hidden;
	}

	.mark {
		position: absolute;
		top: -0.05em;
		right: clamp(8px, 4vw, 60px);
		font-family: var(--font-head);
		font-size: clamp(14rem, 30vw, 26rem);
		line-height: 1;
		color: var(--white);
		opacity: 0.06;
		pointer-events: none;
		user-select: none;
	}

	.reviews h2,
	.reviews .lead {
		color: var(--white);
	}

	.reviews .lead {
		color: rgba(255, 255, 255, 0.78);
	}

	.head {
		max-width: 720px;
		margin-bottom: clamp(2rem, 4vw, 3rem);
	}

	.quote {
		margin: 0;
		background: rgba(255, 255, 255, 0.05);
		border-color: rgba(255, 255, 255, 0.14);
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
		transition: background var(--dur) var(--ease);
	}

	.quote:hover {
		background: rgba(255, 255, 255, 0.09);
	}

	.stars {
		color: #f5b301;
		letter-spacing: 0.1em;
	}

	.placeholder {
		margin: 0;
		font-style: italic;
		color: rgba(255, 255, 255, 0.72);
		border-left: 3px dashed rgba(255, 255, 255, 0.35);
		padding-left: 0.9rem;
	}

	footer {
		display: flex;
		flex-direction: column;
		font-size: 0.9rem;
		color: rgba(255, 255, 255, 0.7);
	}

	footer strong {
		color: var(--white);
	}
</style>
