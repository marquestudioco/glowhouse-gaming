import { test, expect } from '@playwright/test';

test.describe('Birthday Parties page', () => {
  test('page loads with hero heading', async ({ page }) => {
    await page.goto('/birthday-parties', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('h1')).toBeVisible();
  });
  test('packages section has 3 packages', async ({ page }) => {
    await page.goto('/birthday-parties', { waitUntil: 'domcontentloaded' });
    const packages = page.locator('#packages .grid > div');
    await expect(packages).toHaveCount(3);
  });
  test('Book Now button links to /book', async ({ page }) => {
    await page.goto('/birthday-parties', { waitUntil: 'domcontentloaded' });
    const bookLink = page.locator('a[href="/book"]').first();
    await expect(bookLink).toBeVisible();
  });
  test('no horizontal overflow on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/birthday-parties', { waitUntil: 'domcontentloaded' });
    const w = await page.evaluate(() => document.body.scrollWidth);
    expect(w).toBeLessThanOrEqual(376);
  });
});
