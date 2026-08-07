/**
 * Converte as fotos originais em WebP otimizado.
 *
 *   originais/imagens/**.jpg  ->  src/assets/images/**.webp
 *   originais/imagens/**.png  ->  src/assets/images/**.png (comprimido)
 *
 * Rode com:  npm run imagens
 * Os originais nunca sao alterados: sao a copia de seguranca.
 */

import { mkdir, readdir, writeFile } from 'node:fs/promises';
import { dirname, extname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const raiz = fileURLToPath(new URL('..', import.meta.url));
const ORIGEM = join(raiz, 'originais', 'imagens');
const DESTINO = join(raiz, 'src', 'assets', 'images');

// 1200px = largura maxima do container do site. Acima disso o navegador
// so descartaria pixels. Qualidade 74 e o ponto onde o arquivo cai bastante
// sem diferenca visivel em foto.
const LARGURA_MAXIMA = 1200;
const QUALIDADE_WEBP = 74;

async function listarArquivos(pasta) {
  const entradas = await readdir(pasta, { withFileTypes: true });

  const listas = await Promise.all(
    entradas.map((entrada) => {
      const caminho = join(pasta, entrada.name);
      return entrada.isDirectory() ? listarArquivos(caminho) : [caminho];
    }),
  );

  return listas.flat();
}

function redimensionar(imagem) {
  return imagem.resize({
    width: LARGURA_MAXIMA,
    withoutEnlargement: true,
  });
}

async function converter(arquivoOrigem) {
  const ehPng = extname(arquivoOrigem).toLowerCase() === '.png';
  const relativo = relative(ORIGEM, arquivoOrigem);
  const destino = join(DESTINO, ehPng ? relativo : relativo.replace(/\.jpe?g$/i, '.webp'));

  await mkdir(dirname(destino), { recursive: true });

  const base = redimensionar(sharp(arquivoOrigem));
  const dados = ehPng
    ? await base.png({ compressionLevel: 9, palette: true }).toBuffer()
    : await base.webp({ quality: QUALIDADE_WEBP, effort: 6 }).toBuffer();

  await writeFile(destino, dados);

  return { relativo, destino, bytes: dados.length };
}

function kb(bytes) {
  return `${Math.round(bytes / 1024)} kB`;
}

async function main() {
  const arquivos = await listarArquivos(ORIGEM);
  const resultados = await Promise.all(arquivos.map(converter));

  const totalFinal = resultados.reduce((soma, item) => soma + item.bytes, 0);

  resultados
    .sort((a, b) => a.relativo.localeCompare(b.relativo))
    .forEach((item) => console.log(`  ${item.relativo.padEnd(38)} ${kb(item.bytes).padStart(9)}`));

  console.log(`\n  ${arquivos.length} imagens processadas -> ${kb(totalFinal)} no total`);
}

main().catch((erro) => {
  console.error(erro);
  process.exitCode = 1;
});
