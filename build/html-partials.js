import { readFileSync } from 'node:fs';
import { basename, join } from 'node:path';

/**
 * Plugin de HTML modular, sem dependencias externas.
 *
 * Sintaxe suportada dentro dos arquivos .html:
 *   <!-- include: header.html -->   inclui um arquivo de src/partials
 *   {{titulo}}                      substitui por um valor de build/site-data.js
 *
 * Cada funcao abaixo faz uma coisa so, para manter a complexidade baixa.
 */

const INCLUDE_TAG = /<!--\s*include:\s*([\w./-]+?)\s*-->/g;
const VARIABLE_TAG = /\{\{\s*(\w+)\s*\}\}/g;
const MAX_DEPTH = 6;

function readPartial(partialsDir, name) {
  return readFileSync(join(partialsDir, name), 'utf8');
}

function expandIncludes(html, partialsDir, depth = 0) {
  if (depth >= MAX_DEPTH) {
    throw new Error(`[html-partials] Includes aninhados demais (limite: ${MAX_DEPTH}).`);
  }
  return html.replace(INCLUDE_TAG, (_match, name) =>
    expandIncludes(readPartial(partialsDir, name), partialsDir, depth + 1),
  );
}

function applyVariables(html, data, pageName) {
  return html.replace(VARIABLE_TAG, (_match, key) => {
    const value = data[key];
    if (value === undefined) {
      throw new Error(`[html-partials] Variavel "{{${key}}}" nao definida para ${pageName}.`);
    }
    return value;
  });
}

function renderPage(html, { partialsDir, data, pageName }) {
  return applyVariables(expandIncludes(html, partialsDir), data, pageName);
}

export function htmlPartials({ partialsDir, pages, shared = {} }) {
  return {
    name: 'pousada-html-partials',

    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
        const pageName = basename(ctx.path);
        const page = pages[pageName];

        if (!page) {
          throw new Error(`[html-partials] Pagina "${pageName}" nao esta em build/site-data.js.`);
        }

        return renderPage(html, {
          partialsDir,
          pageName,
          data: { ...shared, ...page },
        });
      },
    },

    configureServer(server) {
      server.watcher.add(partialsDir);
      server.watcher.on('change', (file) => {
        if (file.startsWith(partialsDir)) {
          server.ws.send({ type: 'full-reload' });
        }
      });
    },
  };
}
