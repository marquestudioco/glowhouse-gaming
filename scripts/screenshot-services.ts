import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  await page.goto('http://localhost:3014/services', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // Full page scroll to trigger whileInView animations
  await page.evaluate(() => window.scrollTo(0, 500));
  await page.waitForTimeout(500);

  await page.screenshot({ path: 'screenshots/services-top.png', fullPage: false });

  // Scroll to gaming lounge section
  await page.evaluate(() => {
    const el = document.getElementById('gaming-lounge');
    el?.scrollIntoView({ behavior: 'instant' });
  });
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'screenshots/services-lounge.png', fullPage: false });

  // Scroll to silent disco section
  await page.evaluate(() => {
    const el = document.getElementById('silent-disco');
    el?.scrollIntoView({ behavior: 'instant' });
  });
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'screenshots/services-disco.png', fullPage: false });

  // Scroll to outdoor movies
  await page.evaluate(() => {
    const el = document.getElementById('outdoor-movies');
    el?.scrollIntoView({ behavior: 'instant' });
  });
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'screenshots/services-outdoor.png', fullPage: false });

  await browser.close();
  console.log('Done — screenshots in screenshots/');
}

main().catch(console.error);
