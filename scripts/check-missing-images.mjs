import { readFile, access } from 'node:fs/promises';
import { join } from 'node:path';

const root = 'c:\\Users\\Pedro\\Desktop\\Pousada Mariana - Novo Site';

async function checkImages() {
  const files = ['index.html', 'passeios.html', 'creditos.html'];
  const missing = [];
  const found = [];

  for (const file of files) {
    const html = await readFile(join(root, file), 'utf-8');
    const regex = /<img[^>]+src=["']([^"']+)["']/gi;
    let match;
    while ((match = regex.exec(html)) !== null) {
      const src = match[1];
      // strip leading slash if present
      const relPath = src.startsWith('/') ? src.slice(1) : src;
      const fullPath = join(root, relPath);
      try {
        await access(fullPath);
        found.push({ file, src });
      } catch (e) {
        missing.push({ file, src, fullPath });
      }
    }
  }

  console.log('=== Imagens Ausentes (MISSING) ===');
  if (missing.length === 0) {
    console.log('Nenhuma imagem ausente no disco!');
  } else {
    missing.forEach(m => console.log(`[${m.file}] MISSING: ${m.src} (caminho: ${m.fullPath})`));
  }

  console.log(`\nTotal encontradas: ${found.length}, Total ausentes: ${missing.length}`);
}

checkImages();
