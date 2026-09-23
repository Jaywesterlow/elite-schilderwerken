<script lang="ts">
	import { onMount } from 'svelte';

	let open = $state(false);

	function show() {
		open = true;
	}

	function close() {
		open = false;
	}

	onMount(() => {
		// Elke klik op een link of knop in de demo opent de overlay,
		// behalve links binnen de overlay zelf en pure ankerlinks (#).
		function onClick(e: MouseEvent) {
			const target = e.target as HTMLElement | null;
			if (!target) return;
			if (target.closest('[data-demo-ignore]')) return;
			const el = target.closest('a, button');
			if (!el) return;
			const href = el.getAttribute('href') ?? '';
			if (href.startsWith('#')) return;
			e.preventDefault();
			show();
		}
		function onKey(e: KeyboardEvent) {
			if (e.key === 'Escape') close();
		}
		// Capture phase: runs before SvelteKit's own link handler, so internal
		// links like /offerte open the overlay instead of navigating.
		document.addEventListener('click', onClick, true);
		document.addEventListener('keydown', onKey);
		return () => {
			document.removeEventListener('click', onClick, true);
			document.removeEventListener('keydown', onKey);
		};
	});
</script>

<button class="badge" type="button" onclick={show} data-demo-ignore>
	Demo · JWCreative
</button>

{#if open}
	<div class="overlay" data-demo-ignore role="dialog" aria-modal="true" aria-labelledby="demo-title">
		<div class="panel">
			<p class="eyebrow">Even tussendoor</p>
			<h2 id="demo-title">Dit is een demo-site</h2>
			<p>
				Deze pagina is een schets van hoe eliteschilderwerken.nl eruit kan zien: sneller, duidelijker
				en met ruimte voor jouw reviews en foto's. De knoppen doen nog niks, dat is bewust.
			</p>
			<p>
				Spreekt het je aan, of wil je iets anders zien? Mail me en ik pas het aan.
			</p>
			<div class="actions">
				<a class="btn btn-primary" href="mailto:jay@jwcreative.nl?subject=Demo%20Elite%20Schilderwerken">
					Mail Jaymar
				</a>
				<a class="btn btn-secondary" href="https://jwcreative.nl" target="_blank" rel="noopener">
					jwcreative.nl
				</a>
			</div>
			<button class="close" type="button" onclick={close}>Verder kijken</button>
		</div>
	</div>
{/if}

<style>
	.badge {
		position: fixed;
		right: 16px;
		bottom: 16px;
		z-index: 40;
		padding: 0.55rem 0.95rem;
		border-radius: 999px;
		border: 0;
		background: var(--ink-900);
		color: var(--white);
		font: 600 0.85rem var(--font-body);
		box-shadow: var(--shadow);
		cursor: pointer;
	}

	.overlay {
		position: fixed;
		inset: 0;
		z-index: 50;
		display: grid;
		place-items: center;
		padding: 20px;
		background: rgba(11, 59, 55, 0.72);
		backdrop-filter: blur(6px);
		animation: fade 0.35s ease both;
	}

	.panel {
		width: min(560px, 100%);
		background: var(--white);
		border-radius: var(--radius-lg);
		padding: clamp(24px, 4vw, 40px);
		box-shadow: var(--shadow);
		animation: rise 0.4s ease both;
	}

	.panel h2 {
		margin-top: 0;
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		margin-top: 1.5rem;
	}

	.close {
		margin-top: 1.25rem;
		background: none;
		border: 0;
		padding: 0;
		color: var(--ink-500);
		text-decoration: underline;
		cursor: pointer;
		font: inherit;
	}

	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes rise {
		from {
			opacity: 0;
			transform: translateY(14px);
		}
		to {
			opacity: 1;
			transform: none;
		}
	}
</style>
