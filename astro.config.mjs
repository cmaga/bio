import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://christophermagana.com',
  vite: {
    plugins: [tailwindcss()],
  },
});
