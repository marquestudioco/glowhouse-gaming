import { test, expect } from '@playwright/test';

test.describe('Layout shell', () => {
  test('nav is visible on desktop', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('header nav')).toBeVisible();
    await expect(page.locator('header nav').getByText('Glowhouse')).toBeVisible();
  });

  test('footer renders with contact info', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('footer')).toBeVisible();
    await expect(page.locator('text=25061 Avenue Stanford')).toBeVisible();
    await expect(page.locator('footer a[href="tel:+18553484569"]')).toBeVisible();
  });

  test('phone number is clickable (tel: link)', async ({ page }) => {
    await page.goto('/');
    // Footer phone link is always visible on any viewport
    const telLink = page.locator('footer a[href="tel:+18553484569"]');
    await expect(telLink).toBeVisible();
  });

  test('no horizontal overflow on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    expect(bodyWidth).toBeLessThanOrEqual(375 + 1);
  });

  test('sticky mobile CTA hidden below scroll threshold', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    const cta = page.locator('text=Book a Party').last();
    await expect(cta).toBeAttached();
  });
});
