import { test, expect } from '@playwright/test';

test.describe('Home page', () => {
  test('hero renders with headline', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('h1')).toBeAttached();
  });

  test('date picker is present in hero', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('input[type="date"]')).toBeVisible();
  });

  test('services grid has 6 cards', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    // Scope to the services grid section specifically (not footer links)
    const grid = page.locator('section').filter({ hasText: 'Pick your party' });
    const cards = grid.locator('a[href^="/services#"]');
    await expect(cards).toHaveCount(6);
  });

  test('testimonial marquee is present', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('text=5.0 stars, every time').first()).toBeVisible();
  });

  test('CTA band has Book a Party link', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const cta = page.locator('a[href="/book"]').last();
    await expect(cta).toBeAttached();
  });

  test('no horizontal overflow on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    expect(bodyWidth).toBeLessThanOrEqual(376);
  });

  test('horizontal scrubber mobile section attached', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const mobileStack = page.locator('.md\\:hidden').first();
    await expect(mobileStack).toBeAttached();
  });
});
