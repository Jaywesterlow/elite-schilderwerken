<script lang="ts">
	import { inkReveal } from '$lib/actions/scroll';

	// Eén tekening, twee keer gebruikt: onder de kale lijnen, erboven dezelfde tekening
	// ingekleurd. Het inktmasker zakt op scroll naar beneden, dus het huis wordt geverfd
	// terwijl je leest. De kleuren komen uit de tokens via custom properties, zodat
	// beide lagen dezelfde vormen delen en nooit uit elkaar kunnen lopen.
	const uid = 'ink-' + Math.random().toString(36).slice(2, 8);
</script>

<figure class="plate">
	<svg viewBox="0 0 300 320" role="img" aria-label="Tekening van een woning die wordt geschilderd">
		<defs>
			<!-- De rafelige rand: ruis verschuift de maskerrand, blur smeert uit, de
			     transfer hakt de zachte rand weer hard af tot een inktlijn. -->
			<filter id="{uid}-edge" x="-20%" y="-20%" width="140%" height="140%">
				<feTurbulence type="fractalNoise" baseFrequency="0.04 0.05" numOctaves="4" seed="7" result="noise" />
				<feDisplacementMap in="SourceGraphic" in2="noise" scale="26" xChannelSelector="R" yChannelSelector="G" />
				<feGaussianBlur stdDeviation="1.6" />
				<feComponentTransfer>
					<feFuncA type="linear" slope="2.4" intercept="-0.7" />
				</feComponentTransfer>
			</filter>

			<mask id="{uid}-mask" maskUnits="userSpaceOnUse">
				<rect class="wipe" x="-30" y="-30" width="360" height="380" fill="#fff" filter="url(#{uid}-edge)" />
			</mask>

			<g id="{uid}-house">
				<!-- schoorsteen -->
				<rect x="196" y="48" width="20" height="34" fill="var(--c-brick, none)" />
				<!-- dak -->
				<path d="M24 118 L150 36 L276 118 Z" fill="var(--c-roof, none)" />
				<path d="M24 118 L276 118" />
				<!-- gevel -->
				<rect x="46" y="118" width="208" height="160" fill="var(--c-wall, none)" />
				<!-- stucrand tussen de verdiepingen, loopt niet door de ramen -->
				<path d="M46 188 H254" stroke-width="0.9" opacity="0.55" />
				<!-- ramen boven -->
				<rect x="70" y="134" width="52" height="42" fill="var(--c-glass, none)" />
				<path d="M96 134 V176 M70 155 H122" stroke-width="1" />
				<rect x="178" y="134" width="52" height="42" fill="var(--c-glass, none)" />
				<path d="M204 134 V176 M178 155 H230" stroke-width="1" />
				<!-- raam beneden -->
				<rect x="70" y="200" width="60" height="54" fill="var(--c-glass, none)" />
				<path d="M100 200 V254 M70 227 H130" stroke-width="1" />
				<!-- deur -->
				<rect x="176" y="196" width="54" height="82" fill="var(--c-door, none)" />
				<path d="M176 214 H230" stroke-width="1" />
				<circle cx="222" cy="240" r="2.6" fill="var(--c-line, #0b3b37)" />
				<!-- dorpel en stoep -->
				<path d="M34 278 H266" stroke-width="2.5" />
			</g>
		</defs>

		<g class="lines"><use href="#{uid}-house" /></g>
		<g class="paint" mask="url(#{uid}-mask)" aria-hidden="true"><use href="#{uid}-house" /></g>
	</svg>
	<figcaption>Zo gaat het in het echt ook: eerst de ondergrond, dan de verf.</figcaption>
</figure>


<style>
	.plate {
		margin: 0;
	}

	svg {
		width: 100%;
		height: auto;
		display: block;
		background: var(--white);
		border: 1px solid var(--ink-200);
		border-radius: var(--radius-lg);
		padding: clamp(12px, 2vw, 24px);
	}

	/* Beide lagen delen dezelfde vormen; alleen de kleurwaarden verschillen. */
	.lines,
	.paint {
		fill: none;
		stroke: var(--teal-900);
		stroke-width: 1.6;
		stroke-linejoin: round;
		stroke-linecap: round;
	}

	.paint {
		--c-wall: #f3f1ec;
		--c-roof: var(--teal-900);
		--c-brick: #d9d2c7;
		--c-glass: var(--teal-100);
		--c-door: var(--red-500);
		--c-line: var(--teal-900);
	}

	/* Zonder JS of met minder beweging staat het huis gewoon geschilderd op de plaat. */
	.wipe {
		transform: translateY(0);
	}

	figcaption {
		margin-top: 12px;
		font-size: 0.9rem;
		color: var(--ink-500);
	}
</style>
