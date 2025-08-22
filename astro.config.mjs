import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  output: 'static',
  integrations: [react(), tailwind({ config: './tailwind.config.ts' })],
});
