/**
 * Scroll-driven motion for the whole site: GSAP ScrollTrigger + Lenis smooth scroll.
 *
 * Recipes (Svelte actions):
 *   use:pinUnder   — pin a section while the next section slides over it; its content
 *                    fades/scales back a little so the cover reads as depth.
 *   use:parallax   — element drifts vertically with scroll (index-based offsets).
 *   use:riseIn     — content rises into place as its section enters the viewport.
 *   use:headingLines — each line of a heading slides up out of its own mask (once).
 *   use:imageReveal  — a photo is cut open from the bottom while it settles from a slight zoom.
 *
 * GSAP and Lenis are imported lazily inside the browser only: this module is also
 * evaluated during server-side rendering, where a top-level GSAP import breaks the
 * Vercel function. Actions only run in the browser, so they await the loader.
 *
 * All recipes are wrapped in gsap.matchMedia('(prefers-reduced-motion: no-preference)'),
 * so with motion disabled nothing pins or scrubs and the page is plain.
 * Call initScroll() once from the root layout's onMount.
 */

const MOTION_OK = '(prefers-reduced-motion: no-preference)';

type Gsap = typeof import('gsap')['gsap'];
type ST = typeof import('gsap/ScrollTrigger')['ScrollTrigger'];
type Split = typeof import('gsap/SplitText')['SplitText'];
type G = { gsap: Gsap; ScrollTrigger: ST; SplitText: Split };

let loader: Promise<G> | undefined;

function loadGsap() {
	loader ??= Promise.all([import('gsap'), import('gsap/ScrollTrigger'), import('gsap/SplitText')]).then(
		([{ gsap }, { ScrollTrigger }, { SplitText }]) => {
			gsap.registerPlugin(ScrollTrigger, SplitText);
			return { gsap, ScrollTrigger, SplitText };
		}
	);
	return loader;
}

export async function initScroll() {
	if (!window.matchMedia(MOTION_OK).matches) return () => {};
	// Lets CSS hold the start state of reveals so nothing flashes before GSAP arrives.
	document.documentElement.classList.add('motion');

	const [{ gsap, ScrollTrigger }, { default: Lenis }] = await Promise.all([loadGsap(), import('lenis')]);
	const lenis = new Lenis({
		lerp: 0.1,
		anchors: { offset: -80 }
	});
	lenis.on('scroll', ScrollTrigger.update);
	const tick = (time: number) => lenis.raf(time * 1000);
	gsap.ticker.add(tick);
	gsap.ticker.lagSmoothing(0);

	return () => {
		gsap.ticker.remove(tick);
		lenis.destroy();
	};
}

/** Runs `setup` once GSAP is loaded; returns a Svelte action result that reverts it. */
function withGsap(setup: (g: G) => (() => void) | void) {
	let revert: (() => void) | void;
	let destroyed = false;
	loadGsap().then((g) => {
		if (!destroyed) revert = setup(g);
	});
	return {
		destroy() {
			destroyed = true;
			revert?.();
		}
	};
}

export function pinUnder(section: HTMLElement) {
	const next = section.nextElementSibling as HTMLElement | null;
	const content = section.querySelector<HTMLElement>('[data-pin-content]') ?? section.firstElementChild;
	if (!next || !content) return;

	return withGsap(({ gsap, ScrollTrigger }) => {
		const mm = gsap.matchMedia();
		mm.add(MOTION_OK, () => {
			ScrollTrigger.create({
				trigger: section,
				start: 'bottom bottom',
				endTrigger: next,
				end: 'top top',
				pin: true,
				pinSpacing: false,
				anticipatePin: 1
			});
			gsap.to(content, {
				opacity: 0.25,
				scale: 0.94,
				yPercent: -6,
				ease: 'none',
				scrollTrigger: {
					trigger: section,
					start: 'bottom bottom',
					endTrigger: next,
					end: 'top top',
					scrub: true
				}
			});
		});
		return () => mm.revert();
	});
}

export function parallax(node: HTMLElement, opts: { from: number; to: number; min?: number } = { from: 40, to: -40 }) {
	return withGsap(({ gsap }) => {
		const mm = gsap.matchMedia();
		mm.add(`${MOTION_OK} and (min-width: ${opts.min ?? 760}px)`, () => {
			gsap.fromTo(
				node,
				{ y: opts.from },
				{
					y: opts.to,
					ease: 'none',
					scrollTrigger: {
						trigger: node.parentElement,
						start: 'top bottom',
						end: 'bottom top',
						scrub: true
					}
				}
			);
		});
		return () => mm.revert();
	});
}

export function riseIn(node: HTMLElement) {
	return withGsap(({ gsap }) => {
		const mm = gsap.matchMedia();
		mm.add(MOTION_OK, () => {
			gsap.fromTo(
				node,
				{ y: 90, opacity: 0.4 },
				{
					y: 0,
					opacity: 1,
					ease: 'none',
					scrollTrigger: {
						trigger: node.parentElement,
						start: 'top bottom',
						end: 'top 35%',
						scrub: true
					}
				}
			);
		});
		return () => mm.revert();
	});
}

/**
 * The one text motion on this site: every line slides up out of its own mask.
 * Soft curve, so the line is readable almost at once and then settles. autoSplit
 * re-splits when fonts load or the width changes, so line breaks stay right.
 * Use it on headings, leads, eyebrows and list text — never a second style next to it.
 */
export function textLines(node: HTMLElement, opts: { duration?: number; delay?: number } = {}) {
	node.dataset.lines = '';
	return withGsap(({ gsap, SplitText }) => {
		const mm = gsap.matchMedia();
		mm.add(MOTION_OK, () => {
			const split = SplitText.create(node, {
				type: 'lines',
				mask: 'lines',
				autoSplit: true,
				onSplit: (self) =>
					gsap.from(self.lines, {
						yPercent: 105,
						duration: opts.duration ?? 0.9,
						delay: opts.delay ?? 0,
						ease: 'expo.out',
						stagger: (opts.duration ?? 0.9) * 0.12,
						scrollTrigger: { trigger: node, start: 'top 90%', once: true }
					})
			});
			return () => split.revert();
		});
		return () => mm.revert();
	});
}

/**
 * Photo is cut open from the bottom edge while the image inside settles from 115 % to 100 %.
 * The final clip stays inline (not cleared) because CSS holds the hidden start state.
 * The image transform is cleared afterwards so the hover zoom in CSS works again.
 */
export function imageReveal(node: HTMLElement, opts: { delay?: number } = {}) {
	const img = node.querySelector('img');
	node.classList.add('img-rv');
	return withGsap(({ gsap, ScrollTrigger }) => {
		const mm = gsap.matchMedia();
		mm.add(MOTION_OK, () => {
			const tl = gsap.timeline({ paused: true, delay: opts.delay ?? 0 });
			tl.fromTo(
				node,
				{ clipPath: 'inset(100% 0% 0% 0% round 10px)' },
				{ clipPath: 'inset(0% 0% 0% 0% round 10px)', duration: 1.1, ease: 'power3.out' },
				0
			);
			if (img) tl.fromTo(img, { scale: 1.15 }, { scale: 1, duration: 1.8, ease: 'power2.out', clearProps: 'transform' }, 0);
			ScrollTrigger.create({ trigger: node, start: 'top 85%', once: true, onEnter: () => tl.play() });
		});
		return () => mm.revert();
	});
}

/**
 * SVG strokes draw themselves while the section scrolls past, instead of on entry.
 * Each path needs pathLength="1" and a dash offset of 1 in CSS; the scrub turns the
 * scroll into the pen. Later the same section can swap to a colour-in reveal.
 */
export function drawOnScroll(node: SVGSVGElement | HTMLElement) {
	node.classList.add('draw-scrub');
	return withGsap(({ gsap }) => {
		const mm = gsap.matchMedia();
		mm.add(MOTION_OK, () => {
			const paths = node.querySelectorAll<SVGGeometryElement>('[data-draw]');
			gsap.fromTo(
				paths,
				{ strokeDashoffset: 1 },
				{
					strokeDashoffset: 0,
					ease: 'none',
					stagger: 0.25,
					scrollTrigger: {
						trigger: node.closest('section') ?? node,
						start: 'top 75%',
						end: 'bottom 75%',
						scrub: 0.6
					}
				}
			);
		});
		return () => mm.revert();
	});
}

/** A real number counts up once, the first time it is seen. */
export function countUp(node: HTMLElement, to: number) {
	return withGsap(({ gsap, ScrollTrigger }) => {
		const mm = gsap.matchMedia();
		mm.add(MOTION_OK, () => {
			const n = { v: 0 };
			const tween = gsap.to(n, {
				v: to,
				duration: 1.4,
				ease: 'power2.out',
				paused: true,
				onUpdate: () => (node.textContent = String(Math.round(n.v)))
			});
			node.textContent = '0';
			ScrollTrigger.create({ trigger: node, start: 'top 95%', once: true, onEnter: () => tween.play() });
		});
		return () => mm.revert();
	});
}

/**
 * A band of words loops sideways at walking pace and briefly speeds up with the scroll,
 * so it reads as part of the page rather than a separate ticker. The row is duplicated
 * in the markup, so shifting it half its width loops seamlessly.
 */
export function marquee(node: HTMLElement, speed = 26) {
	return withGsap(({ gsap, ScrollTrigger }) => {
		const mm = gsap.matchMedia();
		mm.add(MOTION_OK, () => {
			const loop = gsap.to(node, {
				xPercent: -50,
				duration: speed,
				ease: 'none',
				repeat: -1
			});
			const clamp = gsap.utils.clamp(1, 3.5);
			const st = ScrollTrigger.create({
				onUpdate: (self) => {
					loop.timeScale(clamp(1 + Math.abs(self.getVelocity()) / 1200));
				}
			});
			// Ease the speed back to walking pace after a scroll burst.
			const settle = () => {
				loop.timeScale(gsap.utils.interpolate(loop.timeScale(), 1, 0.03));
			};
			gsap.ticker.add(settle);
			return () => {
				gsap.ticker.remove(settle);
				st.kill();
				loop.kill();
			};
		});
		return () => mm.revert();
	});
}

/**
 * Steps stack: the cards are made sticky in CSS (desktop only); this settles each card
 * back a little as the next one slides over it.
 */
export function stackCards(list: HTMLElement) {
	return withGsap(({ gsap }) => {
		const mm = gsap.matchMedia();
		mm.add(`${MOTION_OK} and (min-width: 880px)`, () => {
			const cards = Array.from(list.children) as HTMLElement[];
			cards.forEach((card, i) => {
				if (i === cards.length - 1) return;
				gsap.to(card, {
					scale: 0.96,
					opacity: 0.55,
					ease: 'none',
					scrollTrigger: {
						trigger: cards[i + 1],
						start: 'top 70%',
						end: 'top 30%',
						scrub: true
					}
				});
			});
			return () => cards.forEach((c) => gsap.set(c, { clearProps: 'transform,opacity' }));
		});
		return () => mm.revert();
	});
}

/**
 * Colour floods into a line drawing while the section scrolls past: the mask wipe
 * starts above the plate and comes down, with a ragged edge from the SVG filter.
 * Without motion the wipe stays where the markup puts it, so the drawing is simply
 * shown painted.
 */
export function inkReveal(node: HTMLElement) {
	return withGsap(({ gsap }) => {
		const wipe = node.querySelector('.wipe');
		if (!wipe) return;
		const mm = gsap.matchMedia();
		mm.add(MOTION_OK, () => {
			gsap.fromTo(
				wipe,
				{ yPercent: -102 },
				{
					yPercent: 0,
					ease: 'none',
					scrollTrigger: {
						trigger: node,
						start: 'top 88%',
						end: 'bottom 45%',
						scrub: 0.5
					}
				}
			);
		});
		return () => mm.revert();
	});
}
