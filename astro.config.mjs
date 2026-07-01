import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import svelte from '@astrojs/svelte';
import vue from '@astrojs/vue';
import solid from '@astrojs/solid-js';

// Homepage renders the canonical @cloudflare/kumo React components directly via
// @astrojs/react. The Svelte/Vue/Solid subpages render Kumo's compiled-native
// packages. React and Solid both claim .jsx, so we scope each integration:
// React owns src/components/react/**, Solid excludes it.
// Default `output: 'static'` produces a fully static site for Cloudflare assets.
export default defineConfig({
  integrations: [
    react({ include: ['**/components/react/**'] }),
    svelte(),
    vue(),
    solid({ exclude: ['**/components/react/**'] }),
  ],
});
