import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  base: '/Melting-spot-picture/',
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0
  }
});
