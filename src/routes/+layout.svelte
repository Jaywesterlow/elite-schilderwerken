<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { initScroll } from '$lib/actions/scroll';

	let { children } = $props();

	onMount(() => {
		let cleanup: (() => void) | undefined;
		initScroll().then((fn) => (cleanup = fn));
		return () => cleanup?.();
	});
</script>

<svelte:head>
	<link rel="icon" type="image/png" href="/favicon.png" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link rel="preconnect" href="https://www.eliteschilderwerken.nl" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Roboto+Slab:wght@700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

{@render children()}
