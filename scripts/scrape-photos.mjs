import { chromium } from 'playwright';
import { createWriteStream, mkdirSync, existsSync } from 'fs';
import { get as httpsGet } from 'https';
import { get as httpGet } from 'http';
import path from 'path';

const OUT_DIR = 'F:/Businesses/Web Builder/Glowhouse Gaming/public/scraped';
if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

async function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = createWriteStream(dest);
    const lib = url.startsWith('https') ? httpsGet : httpGet;
    lib(url, res => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        download(res.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', reject);
  });
}

async function scrapeYelp(browser) {
  console.log('Scraping Yelp...');
  const page = await browser.newPage();
  await page.setExtraHTTPHeaders({ 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' });

  try {
    await page.goto('https://www.yelp.com/biz/glowhouse-gaming-valencia', { waitUntil: 'domcontentloaded', timeout: 20000 });
    await page.waitForTimeout(3000);

    // Try to click on photos tab
    const photoLink = page.locator('a[href*="/photos"]').first();
    if (await photoLink.count() > 0) {
      await photoLink.click();
      await page.waitForTimeout(3000);
    }

    const imgs = await page.$$eval('img', imgs =>
      imgs
        .map(img => img.src || img.getAttribute('src'))
        .filter(src => src && (src.includes('yelp') || src.includes('yelpcdn')) && src.includes('l.') && !src.includes('logo') && !src.includes('icon') && !src.includes('avatar') && src.startsWith('http'))
    );

    const unique = [...new Set(imgs)].slice(0, 30);
    console.log(`Yelp: found ${unique.length} images`);
    for (let i = 0; i < unique.length; i++) {
      const dest = path.join(OUT_DIR, `yelp-${String(i+1).padStart(2,'0')}.jpg`);
      try { await download(unique[i], dest); console.log(`  ✓ yelp-${i+1}`); }
      catch(e) { console.log(`  ✗ yelp-${i+1}: ${e.message}`); }
    }
  } catch(e) {
    console.log('Yelp error:', e.message);
  }
  await page.close();
}

async function scrapeInstagram(browser) {
  console.log('Scraping Instagram...');
  const page = await browser.newPage();
  await page.setExtraHTTPHeaders({ 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' });

  try {
    await page.goto('https://www.instagram.com/glowhousegaming/', { waitUntil: 'networkidle', timeout: 25000 });
    await page.waitForTimeout(4000);

    // Dismiss login popup if shown
    const notNow = page.locator('button:has-text("Not now"), button:has-text("Not Now")');
    if (await notNow.count() > 0) await notNow.first().click();
    await page.waitForTimeout(1500);

    // Scroll to load more
    for (let i = 0; i < 3; i++) {
      await page.evaluate(() => window.scrollBy(0, 800));
      await page.waitForTimeout(1000);
    }

    const imgs = await page.$$eval('img', imgs =>
      imgs
        .map(img => img.src)
        .filter(src => src && src.includes('cdninstagram') && !src.includes('profile_pic') && src.startsWith('http') && !src.includes('s150x150') && !src.includes('s320x320'))
    );

    const unique = [...new Set(imgs)].slice(0, 25);
    console.log(`Instagram: found ${unique.length} images`);
    for (let i = 0; i < unique.length; i++) {
      const dest = path.join(OUT_DIR, `instagram-${String(i+1).padStart(2,'0')}.jpg`);
      try { await download(unique[i], dest); console.log(`  ✓ instagram-${i+1}`); }
      catch(e) { console.log(`  ✗ instagram-${i+1}: ${e.message}`); }
    }
  } catch(e) {
    console.log('Instagram error:', e.message);
  }
  await page.close();
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  await scrapeYelp(browser);
  await scrapeInstagram(browser);
  await browser.close();
  console.log(`\nDone! Check ${OUT_DIR}`);
}

main().catch(console.error);
