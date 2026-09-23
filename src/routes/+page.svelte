<script lang="ts">
	import { Header, Hero, Services, Facts, AreaBand, Projects, Reviews, Process, Contact, Footer, DemoOverlay } from '$lib';
</script>

<svelte:head>
	<title>Elite Schilderwerken · Schilder in Almere · demo</title>
	<meta
		name="description"
		content="Vakschilder in Almere voor binnen- en buitenschilderwerk, traprenovatie en stucwerk. Persoonlijke intake, heldere offerte, garantie."
	/>
	<meta name="robots" content="noindex" />
	<link
		rel="preload"
		as="image"
		fetchpriority="high"
		href="https://www.eliteschilderwerken.nl/wp-content/uploads/2018/12/elite_schilderwerken-slider-tall-buitenschilderwerk-villa-almere-01-1920-65.jpg"
	/>
</svelte:head>

<Header />
<main>
	<Hero />
	<Services />
	<Facts />
	<AreaBand />
	<Projects />
	<Reviews />
	<Process />
	<Contact />
</main>
<Footer />
<DemoOverlay />
