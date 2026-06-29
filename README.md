# Kumo + Astro

**Astro consuming [Kumo](https://www.npmjs.com/package/@acoyfellow/kumo-svelte) design-system components directly — no React in the loop, and no hand-approximated tokens.** If your docs (or app) are built on Astro and you previously couldn't consume the React build of Kumo, this is the clean path: install Kumo's published Svelte (or Vue) package and render the real components inside Astro. The styling is Kumo's own — you stop re-creating it by hand.

**Live demo:** https://kumo-astro-demo.coy.workers.dev

## The whole recipe (Svelte — recommended)

Five lines. This is the entire integration.

```bash
npm i @acoyfellow/kumo-svelte
```

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
export default defineConfig({ integrations: [svelte()] });
```

```astro
---
// any .astro page
import { Button, Badge, Field, Input } from '@acoyfellow/kumo-svelte';
import '@acoyfellow/kumo-svelte/styles.css';
---
<Button client:load variant="primary">Get started</Button>
```

That's it. Components server-render and hydrate via `client:load` with **zero** errors on the Svelte path. (Kumo also ships `@acoyfellow/kumo-svelte/tokens.css`; this demo imports both `tokens.css` and `styles.css` in the layout.)

## Run it locally

```bash
npm install && npm run dev
```

Then open the printed localhost URL. To produce the static build that gets deployed:

```bash
npm run build      # -> ./dist (static)
npm run preview    # serve the build locally
```

## Version pinning — important

These versions are pinned because they are the **known-good** combination:

| package          | version  | note |
|------------------|----------|------|
| `astro`          | `5.18.2` | Astro 5 |
| `@astrojs/svelte`| `7.2.5`  | works with Astro 5 + Svelte 5 |
| `svelte`         | `5.56.4` | |
| `@astrojs/vue`   | `5.1.4`  | for the optional Vue page |
| `vue`            | `3.5.39` | |
| `@astrojs/solid-js`| `7.0.0` | for the optional Solid components |
| `solid-js`       | `1.9.13` | |
| `@acoyfellow/kumo-svelte` | `^0.0.2` | real published package |
| `@acoyfellow/kumo-vue`    | `^0.0.2` | real published package |
| `@acoyfellow/kumo-solid`  | `^0.0.2` | real published package |

> ⚠️ **Do not jump `@astrojs/svelte` to v9.** v9 requires an Astro 7 alpha and will not work with the stable Astro 5 used here. Stick to the `@astrojs/svelte@7.x` line shown above.

## Vue path (optional `/vue` page)

Vue works too via `@acoyfellow/kumo-vue` — the same clean path as Svelte. As of `0.0.2` the Vue components server-render and hydrate cleanly under Astro with normal `client:load` (the earlier SSR `ssrRender` issue is fixed), and render their real per-variant colors:

```astro
<Button client:load variant="primary">Get started</Button>
<Field  client:load id="email" label="Work email" required />
<Input  client:load placeholder="Search…" />
```

Svelte, Vue, and Solid (`@acoyfellow/kumo-solid`) all work the same way — full SSR + hydrate, full per-variant color, no special handling on any path.

## What's in here

```
src/
  layouts/Docs.astro   # plain-HTML docs chrome (sidebar/header) — deliberately NOT Kumo,
                       #   so every Kumo component on the page is unambiguous
  pages/index.astro    # primary: Svelte Kumo showcase (buttons, badges, field, input)
  pages/vue.astro      # optional: Vue path — clean client:load SSR + hydrate
astro.config.mjs       # svelte() + vue() + solid() integrations
wrangler.jsonc         # Cloudflare static-assets deploy config
```

## Deploy (Cloudflare static assets)

```bash
npm run build
npx wrangler deploy    # serves ./dist as Workers static assets
```

## License

MIT © acoyfellow
