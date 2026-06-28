import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import vue from '@astrojs/vue';

// Astro renders Kumo's published Svelte + Vue components directly.
// Default `output: 'static'` produces a fully static site for Cloudflare assets.
export default defineConfig({
  integrations: [svelte(), vue()],
});
