import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import vue from '@astrojs/vue';
import solid from '@astrojs/solid-js';

// Astro renders Kumo's published Svelte + Vue + Solid components directly.
// Default `output: 'static'` produces a fully static site for Cloudflare assets.
export default defineConfig({
  integrations: [svelte(), vue(), solid()],
});
