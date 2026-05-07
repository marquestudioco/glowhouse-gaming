import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  await page.goto('http://localhost:3014/services', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  await page.evaluate(() => {
    const el = document.getElementById('silent-disco');
    el?.scrollIntoView({ behavior: 'instant' });
  });
  await page.waitForTimeout(600);
  await page.evaluate(() => window.scrollBy(0, 400));
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'screenshots/services-disco-gallery.png' });

  await browser.close();
  console.log('Done');
}

main().catch(console.error);
