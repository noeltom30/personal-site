// @ts-check
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: "https://noeltom.pages.dev",
  // Use server output so dynamic API routes (e.g., /api/lastfm/[lastfm])
  // can run at request time on Cloudflare.
  output: 'server',
  adapter: cloudflare()
});