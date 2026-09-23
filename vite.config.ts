import adapter from '@sveltejs/adapter-vercel';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	// gsap ships CJS; bundle it into the server build instead of letting Node
	// import it as ESM (breaks with "does not provide an export named ...").
	ssr: { noExternal: ['gsap', 'lenis'] },
	plugins: [
		sveltekit({
			compilerOptions: {
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			adapter: adapter()
		})
	]
});
