import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { htmlPartials } from './build/html-partials.js';
import { pages, shared } from './build/site-data.js';

const raiz = fileURLToPath(new URL('.', import.meta.url));
const arquivo = (nome) => resolve(raiz, nome);

export default defineConfig({
  // Caminhos relativos: o site funciona na raiz do domínio ou em subpasta.
  base: './',

  plugins: [
    htmlPartials({
      partialsDir: arquivo('src/partials'),
      pages,
      shared,
    }),
  ],

  build: {
    outDir: 'dist',
    emptyOutDir: true,
    // Alvo moderno: menos polyfill, arquivo final menor.
    target: 'es2020',
    // Imagens acima de 4 kB viram arquivos com hash (cache eterno).
    assetsInlineLimit: 4096,
    reportCompressedSize: false,

    rollupOptions: {
      input: {
        index: arquivo('index.html'),
        passeios: arquivo('passeios.html'),
        creditos: arquivo('creditos.html'),
      },
      output: {
        // Hash no nome = cache do navegador por 1 ano sem risco de versão velha.
        entryFileNames: 'assets/js/[name].[hash].js',
        chunkFileNames: 'assets/js/[name].[hash].js',
        assetFileNames: 'assets/[ext]/[name].[hash].[ext]',
      },
    },
  },

  server: {
    open: '/index.html',
  },
});
