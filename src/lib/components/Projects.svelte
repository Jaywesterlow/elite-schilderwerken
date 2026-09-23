<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { pinUnder, textLines, imageReveal } from '$lib/actions/scroll';

	const base = 'https://www.eliteschilderwerken.nl/wp-content/uploads/';
	const projects = [
		{
			src: base + '2018/12/elite_schilderwerken-slider-tall-buitenschilderwerk-villa-almere-01-1920-65.jpg',
			alt: 'Buitenschilderwerk villa in Almere',
			title: 'Villa, Almere',
			tag: 'Buitenschilderwerk'
		},
		{
			src: base + '2018/12/elite_schilderwerken-slider-tall-binnenschilderwerk-keuken-01-1920-65.jpg',
			alt: 'Binnenschilderwerk van een keuken',
			title: 'Keuken',
			tag: 'Binnenschilderwerk'
		},
		{
			src: base + '2018/12/elite_schilderwerken-slider-tall-traprenovatie-schilderwerk-01-1920-65.jpg',
			alt: 'Traprenovatie met schilderwerk',
			title: 'Traprenovatie',
			tag: 'Trap'
		},
		{
			src: base + '2016/02/20151112_110013.jpg',
			alt: 'Schilderwerk aan een grachtenpand',
			title: 'Grachtenpand',
			tag: 'Buitenschilderwerk'
		}
	];
</script>

<section class="section projects" id="projecten" use:pinUnder>
	<div class="wrap">
		<div class="head">
			<div use:reveal={{ stagger: 90 }}>
				<p class="eyebrow" use:textLines>Recent werk</p>
				<h2 use:textLines>Foto's zeggen meer dan een offerte.</h2>
			</div>
			<a class="btn btn-secondary" href="/projecten" use:reveal={{ delay: 150 }}>Alle projecten</a>
		</div>
	</div>
	<div class="rail">
		<div class="wrap gallery">
			{#each projects as p, i}
				<figure use:imageReveal={{ delay: i * 0.1 }}>
					<img src={p.src} alt={p.alt} loading="lazy" decoding="async" />
					<figcaption>
						<span class="tag">{p.tag}</span>
						<span class="title">{p.title}</span>
					</figcaption>
				</figure>
			{/each}
		</div>
	</div>
</section>

<style>
	.projects {
		background: var(--white);
		border-block: 1px solid var(--ink-200);
	}

	.head {
		display: flex;
		flex-wrap: wrap;
		align-items: end;
		justify-content: space-between;
		gap: 16px;
		margin-bottom: clamp(1.6rem, 4vw, 3rem);
	}

	.head h2 {
		margin-bottom: 0;
	}

	/* Mobile: horizontal scroll-snap rail */
	.rail {
		overflow-x: auto;
		overscroll-behavior-x: contain;
		scroll-snap-type: x mandatory;
		scrollbar-width: none;
		padding-bottom: 4px;
	}

	.rail::-webkit-scrollbar {
		display: none;
	}

	.gallery {
		display: flex;
		gap: 14px;
	}

	figure {
		flex: 0 0 76vw;
		max-width: 360px;
		margin: 0;
		position: relative;
		border-radius: var(--radius);
		overflow: hidden;
		background: var(--teal-100);
		scroll-snap-align: start;
		scroll-margin-left: var(--gutter);
	}

	figure img {
		width: 100%;
		aspect-ratio: 3 / 4;
		object-fit: cover;
		transition: transform 0.9s var(--ease);
	}

	figure:hover img {
		transform: scale(1.04);
	}

	figcaption {
		position: absolute;
		inset: auto 0 0 0;
		padding: 18px 16px 16px;
		color: var(--white);
		background: linear-gradient(transparent, rgba(9, 22, 21, 0.85));
		display: flex;
		flex-direction: column;
		gap: 3px;
	}

	.tag {
		font-size: 0.72rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		opacity: 0.8;
	}

	.title {
		font-family: var(--font-head);
		font-weight: 700;
		font-size: 1.1rem;
	}

	/* Desktop: staggered 4-up grid, caption slides up on hover */
	@media (min-width: 760px) {
		.rail {
			overflow: visible;
			scroll-snap-type: none;
		}
		.gallery {
			display: grid;
			grid-template-columns: repeat(4, 1fr);
			gap: 18px;
			padding-block: 40px 90px;
		}
		figure {
			flex: none;
			max-width: none;
		}
		figure:nth-child(even) {
			transform: translateY(44px);
		}
		figure img {
			aspect-ratio: 3 / 4.2;
		}
		figcaption {
			transform: translateY(10px);
			opacity: 0;
			transition:
				transform var(--dur) var(--ease),
				opacity var(--dur) var(--ease);
		}
		figure:hover figcaption,
		figure:focus-within figcaption {
			transform: none;
			opacity: 1;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		figcaption {
			opacity: 1;
			transform: none;
		}
		figure:hover img {
			transform: none;
		}
	}
</style>
