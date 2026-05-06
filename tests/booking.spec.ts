import { test, expect } from '@playwright/test';

test.describe('Booking wizard', () => {
  test('shows step 1 on load', async ({ page }) => {
    await page.goto('/book', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('h2', { hasText: 'When and what?' })).toBeVisible({ timeout: 10000 });
  });

  test('step 1 next button disabled without date and service', async ({ page }) => {
    await page.goto('/book', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('h2', { hasText: 'When and what?' })).toBeVisible({ timeout: 10000 });
    const next = page.locator('button', { hasText: 'Next: Choose Package' });
    await expect(next).toBeDisabled();
  });

  test('Next button enabled when date and service pre-filled', async ({ page }) => {
    // Pre-populate via URL params (server-side) so button state is in SSR HTML — no JS execution needed
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
    await page.goto(`/book?date=${tomorrow}&service=gaming-lounge`, { waitUntil: 'domcontentloaded' });
    await expect(page.locator('h2', { hasText: 'When and what?' })).toBeVisible({ timeout: 10000 });
    await expect(page.locator('button', { hasText: 'Next: Choose Package' })).not.toBeDisabled();
  });

  test('no horizontal overflow on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/book', { waitUntil: 'domcontentloaded' });
    const w = await page.evaluate(() => document.body.scrollWidth);
    expect(w).toBeLessThanOrEqual(376);
  });
});
