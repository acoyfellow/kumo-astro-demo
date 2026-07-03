import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import svelte from '@astrojs/svelte';
import vue from '@astrojs/vue';
import solid from '@astrojs/solid-js';
import tailwindcss from '@tailwindcss/vite';

// The `/` route is the GOLDEN baseline: the kumo-ui.com homepage rendered by
// the canonical @cloudflare/kumo React components as a client:only island via
// @astrojs/react — mirroring cloudflare/fe/kumo's kumo-docs-astro exactly.
// Tailwind v4 (@tailwindcss/vite) generates HomeGrid's layout utilities and the
// @cloudflare/kumo theme supplies every kumo-* token, matching the golden's own
// build pipeline. The /svelte, /vue, /solid routes render Kumo's compiled-native
// packages. React and Solid both claim .jsx, so each integration is scoped:
// React owns src/components/react/**, Solid excludes it.
export default defineConfig({
  integrations: [
    react({ include: ['**/components/react/**'] }),
    svelte(),
    vue(),
    solid({ exclude: ['**/components/react/**'] }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
