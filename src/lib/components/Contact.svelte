<script lang="ts">
	import { reveal, magnetic } from '$lib/actions/reveal';
	import { textLines } from '$lib/actions/scroll';
</script>

<section class="section contact" id="offerte">
	<div class="wrap inner">
		<div class="copy" use:reveal={{ stagger: 90 }}>
			<p class="eyebrow" use:textLines>Offerte aanvragen</p>
			<h2 use:textLines>Vertel kort wat er geschilderd moet worden. Je hoort snel van ons.</h2>
			<p class="lead" use:textLines={{ duration: 1.1 }}>
				Liever bellen? Dat mag altijd, ook voor gratis advies over kleur of verfsysteem.
			</p>
			<div class="direct">
				<a href="tel:0646461625" class="line">
					<span class="lbl">Bellen</span>
					<strong>06-46 46 16 25</strong>
				</a>
				<a href="mailto:eliteschilderwerken@gmail.com" class="line">
					<span class="lbl">Mailen</span>
					<strong>eliteschilderwerken@gmail.com</strong>
				</a>
				<div class="line">
					<span class="lbl">Werkgebied</span>
					<strong>Almere, Lelystad, Amsterdam, Hilversum, 't Gooi, Amersfoort</strong>
				</div>
			</div>
		</div>
		<form class="card form" onsubmit={(e) => e.preventDefault()} use:reveal={{ delay: 150 }}>
			<label>
				<span>Naam</span>
				<input type="text" name="naam" autocomplete="name" />
			</label>
			<label>
				<span>Telefoon of e-mail</span>
				<input type="text" name="contact" />
			</label>
			<label>
				<span>Wat moet er gebeuren?</span>
				<textarea name="klus" rows="4" placeholder="Bijv. kozijnen en deuren buiten, rijtjeshuis in Almere Stad"></textarea>
			</label>
			<label class="check">
				<input type="checkbox" name="fotos" />
				<span>Ik wil graag foto's meesturen (kan ook via WhatsApp)</span>
			</label>
			<button class="btn btn-primary" type="submit" use:magnetic>Verstuur aanvraag</button>
			<p class="note">Vrijblijvend. Geen nieuwsbrief, geen gedoe.</p>
		</form>
	</div>
</section>

<style>
	.contact {
		background: var(--white);
		border-top: 1px solid var(--ink-200);
	}

	.inner {
		display: grid;
		gap: clamp(28px, 5vw, 64px);
		align-items: start;
	}

	.direct {
		display: grid;
		gap: 10px;
		margin-top: 1.5rem;
	}

	.line {
		display: flex;
		flex-direction: column;
		text-decoration: none;
		color: var(--ink-900);
		padding: 12px 16px;
		border-radius: var(--radius);
		background: var(--paper);
		border: 1px solid var(--ink-200);
	}

	.lbl {
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--ink-500);
	}

	.form {
		display: grid;
		gap: 16px;
	}

	label {
		display: grid;
		gap: 6px;
		font-weight: 600;
		font-size: 0.95rem;
	}

	input[type='text'],
	textarea {
		font: inherit;
		padding: 0.8rem 0.95rem;
		border-radius: var(--radius);
		border: 1px solid var(--ink-200);
		background: var(--paper);
	}

	input:focus,
	textarea:focus {
		outline: 2px solid var(--teal-500);
		outline-offset: 1px;
	}

	.check {
		grid-template-columns: auto 1fr;
		align-items: center;
		font-weight: 500;
	}

	.note {
		margin: 0;
		font-size: 0.85rem;
		color: var(--ink-500);
	}

	@media (min-width: 880px) {
		.inner {
			grid-template-columns: 1fr 1fr;
		}
	}
</style>
