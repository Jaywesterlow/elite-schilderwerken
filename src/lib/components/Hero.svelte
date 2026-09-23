<script lang="ts">
	import { magnetic } from '$lib/actions/reveal';
	import { pinUnder, countUp, textLines } from '$lib/actions/scroll';

	const hero =
		'https://www.eliteschilderwerken.nl/wp-content/uploads/2018/12/elite_schilderwerken-slider-tall-buitenschilderwerk-villa-almere-01-1920-65.jpg';
</script>

<section class="hero" id="top" use:pinUnder>
	<div class="media" aria-hidden="true">
		<img src={hero} alt="" fetchpriority="high" decoding="async" />
		<div class="shade"></div>
	</div>

	<div class="wrap inner" data-pin-content>
		<div class="copy">
			<p class="eyebrow" use:textLines={{ delay: 0.15 }}>Schildersbedrijf in Almere · sinds 2011</p>
			<h1 use:textLines={{ delay: 0.3, duration: 1.1 }}>
				Vakschilder voor binnen en buiten, met
				<span class="stroke-word">
					garantie
					<svg class="stroke" viewBox="0 0 200 22" preserveAspectRatio="none" aria-hidden="true">
						<path d="M3 15 C 40 8, 80 20, 120 12 S 180 6, 197 13" />
					</svg>
				</span>
				op het werk.
			</h1>
			<p class="lead" use:textLines={{ delay: 0.5 }}>
				Onderhoud, renovatie en nieuwbouw. Persoonlijke intake, heldere offerte en elke dag een
				opgeruimde werkplek. Almere, Lelystad, Amsterdam, 't Gooi en omstreken.
			</p>
			<div class="actions in" style="--i: 3.5">
				<a class="btn btn-primary" href="/offerte" use:magnetic>Gratis offerte aanvragen</a>
				<a class="btn btn-ghost" href="tel:0646461625" use:magnetic>Bel 06-46 46 16 25</a>
			</div>
			<ul class="proof in" style="--i: 4.2" aria-label="Kort overzicht">
				<li><strong><span use:countUp={15}>15</span>+ jaar</strong> ervaring</li>
				<li><strong>Jarenlange garantie</strong> op het verfsysteem</li>
				<li><strong>Gratis</strong> kleuradvies</li>
			</ul>
		</div>
	</div>

	<a class="scroll-hint" href="#diensten" aria-label="Scroll naar diensten">
		<span></span>
	</a>
</section>

<style>
	.hero {
		position: relative;
		min-height: 100svh;
		display: grid;
		align-items: end;
		color: var(--white);
		overflow: hidden;
		isolation: isolate;
	}

	.media {
		position: absolute;
		inset: 0;
		z-index: -1;
		background: var(--teal-900);
	}

	.media img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: 60% 40%;
		transform-origin: 55% 45%;
		animation: kenburns 9s var(--ease) both;
	}

	.shade {
		position: absolute;
		inset: 0;
		background:
			linear-gradient(
				to top,
				rgba(9, 22, 21, 0.92) 0%,
				rgba(9, 22, 21, 0.55) 40%,
				rgba(9, 22, 21, 0.15) 75%,
				rgba(9, 22, 21, 0.25) 100%
			),
			linear-gradient(to right, rgba(9, 22, 21, 0.35), transparent 60%);
	}

	.inner {
		padding-block: calc(var(--header-h) + 40px) clamp(72px, 10vh, 120px);
	}

	.copy {
		max-width: 780px;
	}

	.hero .eyebrow {
		color: #ff9a80;
	}

	.hero h1 {
		color: var(--white);
		margin-bottom: 0.45em;
	}

	.hero .lead {
		color: rgba(255, 255, 255, 0.82);
		font-size: clamp(1.05rem, 1.5vw, 1.25rem);
		max-width: 56ch;
	}

	/* Painted underline under one word */
	.stroke-word {
		position: relative;
		display: inline-block;
		white-space: nowrap;
	}

	.stroke {
		position: absolute;
		left: -2%;
		bottom: -0.08em;
		width: 104%;
		height: 0.28em;
		overflow: visible;
	}

	.stroke path {
		fill: none;
		stroke: var(--red-500);
		stroke-width: 7;
		stroke-linecap: round;
		stroke-dasharray: 230;
		stroke-dashoffset: 230;
		animation: draw 1.1s var(--ease) 1.1s forwards;
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		margin: 1.8rem 0 2.2rem;
	}

	.proof {
		list-style: none;
		padding: 1.4rem 0 0;
		margin: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 10px 30px;
		color: rgba(255, 255, 255, 0.7);
		font-size: 0.92rem;
		border-top: 1px solid rgba(255, 255, 255, 0.18);
	}

	.proof strong {
		color: var(--white);
		font-weight: 600;
	}

	/* Knoppen en bewijsregel verschijnen alleen; bewegen doet de tekst zelf. */
	.in {
		opacity: 0;
		animation: appear 0.7s var(--ease) calc(0.15s + var(--i) * 0.11s) forwards;
	}

	.scroll-hint {
		position: absolute;
		right: clamp(16px, 4vw, 40px);
		bottom: 28px;
		width: 28px;
		height: 46px;
		border: 1.5px solid rgba(255, 255, 255, 0.45);
		border-radius: 999px;
		display: none;
		opacity: 0;
		animation: fade 1s var(--ease) 1.6s forwards;
	}

	.scroll-hint span {
		position: absolute;
		left: 50%;
		top: 8px;
		width: 3px;
		height: 8px;
		margin-left: -1.5px;
		border-radius: 2px;
		background: var(--white);
		animation: nudge 2.2s var(--ease) infinite;
	}

	@media (min-width: 880px) {
		.scroll-hint {
			display: block;
		}
	}

	@keyframes kenburns {
		from {
			transform: scale(1);
		}
		to {
			transform: scale(1.08);
		}
	}

	@keyframes draw {
		to {
			stroke-dashoffset: 0;
		}
	}

	@keyframes appear {
		to {
			opacity: 1;
		}
	}

	@keyframes fade {
		to {
			opacity: 1;
		}
	}

	@keyframes nudge {
		0%,
		100% {
			transform: translateY(0);
			opacity: 1;
		}
		60% {
			transform: translateY(16px);
			opacity: 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.media img,
		.in,
		.scroll-hint,
		.scroll-hint span {
			animation: none;
		}
		.in,
		.scroll-hint {
			opacity: 1;
			transform: none;
		}
		.stroke path {
			animation: none;
			stroke-dashoffset: 0;
		}
	}
</style>
