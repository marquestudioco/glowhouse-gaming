import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:3014/services', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  const sections = ['gaming-lounge', 'vr-rental', 'outdoor-movies', 'party-van', 'silent-disco', 'after-school'];
  for (const id of sections) {
    await page.evaluate((sectionId) => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'instant' });
    }, id);
    await page.waitForTimeout(700);
    await page.screenshot({ path: `screenshots/svc-${id}.png` });
  }

  await browser.close();
  console.log('Done');
}

main().catch(console.error);
