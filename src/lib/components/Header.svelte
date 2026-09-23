<script lang="ts">
	import { onMount } from 'svelte';
	import { magnetic } from '$lib/actions/reveal';

	const phone = '06-46 46 16 25';
	let solid = $state(false);

	onMount(() => {
		const onScroll = () => (solid = window.scrollY > 40);
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});
</script>

<header class="header" class:solid>
	<div class="wrap bar">
		<a class="brand" href="#top" aria-label="Elite Schilderwerken, naar boven">
			<img src="/logo.webp" alt="Elite Schilderwerken" width="320" height="135" />
		</a>
		<nav class="nav" aria-label="Hoofdmenu">
			<a href="#diensten">Diensten</a>
			<a href="#projecten">Projecten</a>
			<a href="#werkwijze">Werkwijze</a>
			<a href="#reviews">Reviews</a>
		</nav>
		<a class="btn btn-primary call" href="tel:0646461625" use:magnetic>Bel {phone}</a>
	</div>
</header>

<style>
	.header {
		position: fixed;
		inset: 0 0 auto 0;
		z-index: 30;
		background: transparent;
		border-bottom: 1px solid transparent;
		transition:
			background var(--dur) var(--ease),
			border-color var(--dur) var(--ease);
	}

	.header.solid {
		background: rgba(255, 255, 255, 0.92);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		border-color: var(--ink-200);
	}

	.bar {
		display: flex;
		align-items: center;
		gap: 24px;
		min-height: var(--header-h);
	}

	.brand {
		display: block;
		background: var(--white);
		padding: 6px 10px;
		border-radius: 8px;
		line-height: 0;
		transition: box-shadow var(--dur) var(--ease);
		box-shadow: 0 4px 18px rgba(0, 0, 0, 0.18);
	}

	.solid .brand {
		box-shadow: none;
	}

	.brand img {
		height: 40px;
		width: auto;
	}

	.nav {
		display: none;
		gap: 26px;
		margin-left: auto;
	}

	.nav a {
		text-decoration: none;
		color: var(--white);
		font-weight: 500;
		font-size: 0.95rem;
		position: relative;
		transition: color var(--dur) var(--ease);
	}

	.nav a::after {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		bottom: -6px;
		height: 2px;
		background: var(--red-500);
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 0.4s var(--ease);
	}

	.nav a:hover::after {
		transform: scaleX(1);
	}

	.solid .nav a {
		color: var(--ink-700);
	}

	.solid .nav a:hover {
		color: var(--teal-900);
	}

	.call {
		margin-left: auto;
		padding: 0.7rem 1.15rem;
		font-size: 0.95rem;
	}

	@media (min-width: 820px) {
		.nav {
			display: flex;
		}
		.call {
			margin-left: 0;
		}
		.brand img {
			height: 44px;
		}
	}

	@media (max-width: 480px) {
		.call {
			padding: 0.6rem 0.9rem;
			font-size: 0.85rem;
		}
		.brand img {
			height: 34px;
		}
	}
</style>
