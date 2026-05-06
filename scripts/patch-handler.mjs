/**
 * Post-build patch for Windows Cloudflare deploy.
 *
 * On Windows, turbopack generates mangled WASM chunk paths (spaces removed,
 * separators concatenated). Wrangler's esbuild can't resolve them.
 * We don't use @vercel/og OG image generation so stub those imports out.
 */
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const handlerPath = join(__dirname, '../.open-next/server-functions/default/handler.mjs');

let content = readFileSync(handlerPath, 'utf8');

// Replace any dynamic import that contains a mangled Windows path (identifiable by
// "BusinessesWeb" — spaces removed from our directory "Businesses\Web Builder\...")
const wasmImportPattern = /\(await import\("F:\/Businesses\/Web Builder\/Glowhouse Gaming\/[^"]*BusinessesWeb[^"]*\.wasm[^"]*"\)\)\.default/g;

let count = 0;
content = content.replace(wasmImportPattern, () => {
  count++;
  return 'null';
});

writeFileSync(handlerPath, content, 'utf8');
console.log(`✓ Patched ${count} mangled WASM import(s) in handler.mjs`);
if (count === 0) {
  console.log('  (No mangled imports found — may already be patched or path changed)');
}
