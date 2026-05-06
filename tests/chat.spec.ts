import { test, expect } from '@playwright/test';

test.describe('Chat widget', () => {
  test('chat bubble is present on home page', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const bubble = page.locator('.chat-widget');
    await expect(bubble).toBeVisible({ timeout: 10000 });
  });

  test('chat bubble is present on book page', async ({ page }) => {
    await page.goto('/book', { waitUntil: 'domcontentloaded' });
    const bubble = page.locator('.chat-widget');
    await expect(bubble).toBeVisible({ timeout: 10000 });
  });

  test('no horizontal overflow with chat widget visible', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const w = await page.evaluate(() => document.body.scrollWidth);
    expect(w).toBeLessThanOrEqual(376);
  });
});
