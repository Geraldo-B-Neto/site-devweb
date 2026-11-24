/**
 * Pós-build: pré-renderiza o HTML da página inicial, injeta os dados
 * estruturados (JSON-LD) e gera sitemap.xml e robots.txt em dist/.
 */
import { readFile, writeFile, rm } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const serverDir = path.join(root, 'dist-server');

const { render, buildStructuredData, SITE } = await import(
  pathToFileURL(path.join(serverDir, 'entry-server.js')).href
);

const indexPath = path.join(dist, 'index.html');
let html = await readFile(indexPath, 'utf-8');

// Caminhos relativos para funcionar tanto no domínio próprio quanto em subpasta (GitHub Pages).
const appHtml = render().replace(/(src|href)="\/assets\//g, '$1="./assets/');
const jsonLd = JSON.stringify(buildStructuredData()).replace(/</g, '\\u003c');

if (!html.includes('<!--app-html-->') || !html.includes('<!--structured-data-->')) {
  throw new Error('Marcadores de pré-renderização não encontrados em dist/index.html');
}

html = html
  .replace('<!--app-html-->', appHtml)
  .replace('<!--structured-data-->', `<script type="application/ld+json">${jsonLd}</script>`);
await writeFile(indexPath, html);

const today = new Date().toISOString().slice(0, 10);
await writeFile(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE.url}/</loc>
    <lastmod>${today}</lastmod>
  </url>
</urlset>
`
);

await writeFile(
  path.join(dist, 'robots.txt'),
  `User-agent: *
Allow: /

Sitemap: ${SITE.url}/sitemap.xml
`
);

await rm(serverDir, { recursive: true, force: true });
console.log(`✓ pré-renderização concluída (${(appHtml.length / 1024).toFixed(1)} kB de HTML), sitemap.xml e robots.txt gerados`);
