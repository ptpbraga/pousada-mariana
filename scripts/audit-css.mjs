import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

// Let's inspect dist HTML files (the actual rendered output)
const distIndex = fs.readFileSync(path.join(ROOT, 'dist/index.html'), 'utf8');
const distPasseios = fs.readFileSync(path.join(ROOT, 'dist/passeios.html'), 'utf8');
const distCreditos = fs.readFileSync(path.join(ROOT, 'dist/creditos.html'), 'utf8');
const allDistHtml = distIndex + '\n' + distPasseios + '\n' + distCreditos;

// Function to find CSS classes
function getCssFiles(dir) {
  let results = [];
  fs.readdirSync(dir).forEach(file => {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) {
      results = results.concat(getCssFiles(full));
    } else if (file.endsWith('.css')) {
      results.push(full);
    }
  });
  return results;
}

const cssFiles = getCssFiles(path.join(ROOT, 'src/styles'));

console.log('=== CSS SELECTORS / CLASSES AUDIT ===');
cssFiles.forEach(cf => {
  const rel = path.relative(path.join(ROOT, 'src/styles'), cf).replace(/\\/g, '/');
  const content = fs.readFileSync(cf, 'utf8');
  
  // extract class selectors .class-name
  const classMatches = [...content.matchAll(/\.([a-zA-Z0-9_-]+)(?=[^a-zA-Z0-9_-]|$)/g)].map(m => m[1]);
  const uniqueClasses = [...new Set(classMatches)].filter(c => !['scrolled', 'open', 'menu-open', 'active', 'is-visible'].includes(c));
  
  const unusedInHtml = uniqueClasses.filter(cls => !allDistHtml.includes(`class="`) || !allDistHtml.includes(cls));
  
  if (unusedInHtml.length > 0) {
    console.log(`\nFile: ${rel}`);
    unusedInHtml.forEach(cls => {
      // Check if it really doesn't appear in dist
      const inDist = allDistHtml.includes(cls);
      if (!inDist) {
        console.log(`  ⚠️ Class .${cls} not found in any rendered HTML`);
      }
    });
  }
});
