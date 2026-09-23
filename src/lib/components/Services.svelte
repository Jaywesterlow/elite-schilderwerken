<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { textLines } from '$lib/actions/scroll';

	const services = [
		{
			title: 'Buitenschilderwerk',
			text: 'Kozijnen, deuren, gevels en dakranden. Inclusief houtrotrenovatie waar nodig, zodat het werk jaren meegaat.'
		},
		{
			title: 'Binnenschilderwerk',
			text: 'Wanden, plafonds, deuren, kasten en lambrisering. Plafonds en wanden altijd twee keer gewit voor een volle, dekkende laag.'
		},
		{
			title: 'Traprenovatie',
			text: 'Van versleten trap naar strak geschilderd of gelakt. Een van onze meest gevraagde klussen.'
		},
		{
			title: 'Behang en glasvlies',
			text: 'Behangen, glasweefsel of glasvlies plakken, spachtelputz en sierpleisters.'
		},
		{
			title: 'Stucwerk en plafonds',
			text: 'Nieuw stucwerk, herstel na lekkage of schimmel, en restauratie van oude plafonds met ornamenten.'
		},
		{
			title: 'Kleur- en productadvies',
			text: 'Samen met onze verfleveranciers kiezen we het verfsysteem dat het langst meegaat op jouw ondergrond.'
		}
	];
</script>

<section class="section" id="diensten">
	<div class="wrap">
		<div class="head" use:reveal={{ stagger: 90 }}>
			<p class="eyebrow" use:textLines>Wat we doen</p>
			<h2 use:textLines={{ duration: 1.4 }}>Alles wat te schilderen valt, en wat erbij komt kijken.</h2>
			<p class="lead" use:textLines={{ duration: 1.1 }}>
				Bij een schilderklus komt vaak meer kijken. Daarom regelen we ook de voorbereiding, het
				glaswerk en de afwerking, zodat je met één partij te maken hebt.
			</p>
		</div>
		<ol class="list" use:reveal={{ stagger: 70 }}>
			{#each services as s, i}
				<li class="row">
					<span class="num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
					<div class="body">
						<h3 use:textLines>{s.title}</h3>
						<p use:textLines={{ delay: 0.08 }}>{s.text}</p>
					</div>
				</li>
			{/each}
		</ol>
	</div>
</section>

<style>
	.head {
		margin-bottom: clamp(2rem, 5vw, 4rem);
	}

	.list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		border-top: 1px solid var(--ink-200);
	}

	.row {
		position: relative;
		display: grid;
		grid-template-columns: 3.6rem 1fr;
		gap: 16px;
		align-items: start;
		padding: clamp(22px, 3vw, 34px) 12px;
		border-bottom: 1px solid var(--ink-200);
		isolation: isolate;
		overflow: hidden;
	}

	/* Paint swipe on hover */
	.row::before {
		content: '';
		position: absolute;
		inset: 0;
		z-index: -1;
		background: var(--teal-100);
		transform: scaleX(0);
		transform-origin: left;
		transition: transform var(--dur) var(--ease);
	}

	.row:hover::before {
		transform: scaleX(1);
	}

	.num {
		font-family: var(--font-head);
		font-weight: 700;
		font-size: clamp(1.6rem, 2.6vw, 2.2rem);
		line-height: 1;
		color: #aeb9b6;
		transition: color var(--dur) var(--ease);
		padding-top: 0.15em;
	}

	.row:hover .num {
		color: var(--red-500);
	}

	.body h3 {
		margin-bottom: 0.35rem;
		font-size: 1.25rem;
	}

	.body p {
		margin: 0;
		color: var(--ink-700);
		max-width: 46ch;
		font-size: 0.98rem;
	}

	@media (min-width: 820px) {
		.list {
			grid-template-columns: 1fr 1fr;
			column-gap: clamp(24px, 4vw, 56px);
		}
	}
</style>
