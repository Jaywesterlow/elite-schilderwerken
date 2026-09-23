/**
 * use:reveal — fade + translate-up when the element enters the viewport (once).
 * Options: { stagger: ms between direct children, delay: ms before start }.
 * Adds .rv (hidden) then .rv-in (shown). Styles live in app.css.
 * Respects prefers-reduced-motion by showing immediately.
 */
export function reveal(node: HTMLElement, opts: { stagger?: number; delay?: number } = {}) {
	const { stagger = 0, delay = 0 } = opts;
	node.classList.add('rv');
	if (stagger) {
		node.classList.add('rv-group');
		Array.from(node.children).forEach((child, i) => {
			(child as HTMLElement).style.setProperty('--rv-d', `${delay + i * stagger}ms`);
		});
	} else if (delay) {
		node.style.setProperty('--rv-d', `${delay}ms`);
	}

	const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (reduced || !('IntersectionObserver' in window)) {
		node.classList.add('rv-in');
		return;
	}

	const io = new IntersectionObserver(
		(entries) => {
			for (const e of entries) {
				if (e.isIntersecting) {
					node.classList.add('rv-in');
					io.disconnect();
				}
			}
		},
		{ threshold: 0.15, rootMargin: '0px 0px -6% 0px' }
	);
	io.observe(node);
	return { destroy: () => io.disconnect() };
}

/**
 * use:magnetic — element drifts a few px toward the cursor on hover (max 4px).
 * Pointer-only; no-op on touch or with reduced motion.
 */
export function magnetic(node: HTMLElement, max = 4) {
	const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
	const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (!fine || reduced) return;

	function move(e: MouseEvent) {
		const r = node.getBoundingClientRect();
		const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
		const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
		node.style.transform = `translate(${dx * max}px, ${dy * max}px)`;
	}
	function leave() {
		node.style.transform = '';
	}
	node.addEventListener('mousemove', move);
	node.addEventListener('mouseleave', leave);
	return {
		destroy() {
			node.removeEventListener('mousemove', move);
			node.removeEventListener('mouseleave', leave);
		}
	};
}
