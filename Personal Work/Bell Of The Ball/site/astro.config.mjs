import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://belloftheball.example',
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
