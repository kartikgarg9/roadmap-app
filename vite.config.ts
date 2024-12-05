import { defineConfig } from 'vite';

export default defineConfig({
  css: {
    postcss: './postcss.config.js',  // Ensure Vite uses the correct PostCSS config
  },
});
