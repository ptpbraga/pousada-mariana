import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

// 1. Collect all HTML source files and partials
const htmlFiles = [
  path.join(ROOT, 'index.html'),
  path.join(ROOT, 'passeios.html'),
  path.join(ROOT, 'creditos.html'),
];

const partialsDir = path.join(ROOT, 'src/partials');
const partialFiles = fs.readdirSync(partialsDir).map(f => path.join(partialsDir, f));

const allHtmlAndPartials = [...htmlFiles, ...partialFiles];
const allHtmlContents = allHtmlAndPartials.map(f => ({
  file: path.relative(ROOT, f),
  content: fs.readFileSync(f, 'utf8')
}));

const combinedHtml = allHtmlContents.map(x => x.content).join('\n');

console.log('=== 1. HTML PARTIALS USAGE ===');
partialFiles.forEach(pf => {
  const base = path.basename(pf);
  const pattern = new RegExp(`<!--\\s*include:\\s*${base}\\s*-->`);
  const usedIn = htmlFiles.filter(hf => pattern.test(fs.readFileSync(hf, 'utf8'))).map(hf => path.basename(hf));
  console.log(`Partial: ${base} -> Used in: [${usedIn.join(', ')}] ${usedIn.length === 0 ? '⚠️ UNUSED ORPHAN' : '✅'}`);
});

console.log('\n=== 2. JAVASCRIPT MODULES & DOM TARGETS ===');
const mainJsPath = path.join(ROOT, 'src/scripts/main.js');
const mainJsContent = fs.readFileSync(mainJsPath, 'utf8');
const jsModulesDir = path.join(ROOT, 'src/scripts/modules');
const jsModules = fs.readdirSync(jsModulesDir).map(f => path.join(jsModulesDir, f));

jsModules.forEach(jm => {
  const base = path.basename(jm);
  const imported = mainJsContent.includes(base.replace('.js', ''));
  const content = fs.readFileSync(jm, 'utf8');
  
  // Find selectors used in module
  const selectors = [...content.matchAll(/querySelector(?:All)?\(['"]([^'"]+)['"]\)/g)].map(m => m[1]);
  const selectorChecks = selectors.map(sel => {
    let exists = false;
    if (sel.startsWith('[') && sel.endsWith(']')) {
      const attr = sel.slice(1, -1);
      exists = combinedHtml.includes(attr);
    } else if (sel.startsWith('.')) {
      exists = combinedHtml.includes(sel.slice(1));
    } else {
      exists = combinedHtml.includes(sel);
    }
    return { selector: sel, exists };
  });

  console.log(`JS Module: ${base}`);
  console.log(`  - Imported in main.js: ${imported ? '✅' : '❌ NOT IMPORTED'}`);
  selectorChecks.forEach(sc => {
    console.log(`  - Target DOM "${sc.selector}": ${sc.exists ? '✅ found in HTML' : '⚠️ NOT FOUND in any HTML/partial'}`);
  });
});

console.log('\n=== 3. CSS MODULES & STYLESHEET IMPORTS ===');
const mainCssPath = path.join(ROOT, 'src/styles/main.css');
const mainCssContent = fs.readFileSync(mainCssPath, 'utf8');

function getAllCssFiles(dir) {
  let results = [];
  fs.readdirSync(dir).forEach(file => {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) {
      results = results.concat(getAllCssFiles(full));
    } else if (file.endsWith('.css') && full !== mainCssPath) {
      results.push(full);
    }
  });
  return results;
}

const allCssFiles = getAllCssFiles(path.join(ROOT, 'src/styles'));
allCssFiles.forEach(cf => {
  const rel = path.relative(path.join(ROOT, 'src/styles'), cf).replace(/\\/g, '/');
  const isImported = mainCssContent.includes(rel);
  console.log(`CSS: ${rel} -> Imported in main.css: ${isImported ? '✅' : '⚠️ UNUSED / NOT IMPORTED'}`);
});

console.log('\n=== 4. IMAGE ASSETS USAGE ===');
function getAllImages(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  fs.readdirSync(dir).forEach(file => {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) {
      results = results.concat(getAllImages(full));
    } else if (/\.(webp|png|jpg|jpeg|svg)$/i.test(file)) {
      results.push(full);
    }
  });
  return results;
}

const allImages = getAllImages(path.join(ROOT, 'src/assets'));
const allCode = [
  ...allHtmlAndPartials,
  ...allCssFiles,
  mainCssPath,
  ...jsModules,
  mainJsPath,
  path.join(ROOT, 'build/site-data.js')
].map(f => fs.readFileSync(f, 'utf8')).join('\n');

allImages.forEach(img => {
  const base = path.basename(img);
  const rel = path.relative(ROOT, img).replace(/\\/g, '/');
  const isUsed = allCode.includes(base);
  console.log(`Image: ${rel} -> Referenced: ${isUsed ? '✅' : '⚠️ UNREFERENCED (DEAD ASSET)'}`);
});
