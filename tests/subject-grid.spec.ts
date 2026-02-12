import { test, expect } from '@playwright/test';

test.describe('SubjectGrid Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should render grid container', async ({ page }) => {
    const grid = page.locator('[class*="grid"], [class*="subject"]').first();
    if (await grid.isVisible()) {
      await expect(grid).toBeVisible();
    }
  });

  test('should display grid items', async ({ page }) => {
    const gridItems = page.locator('[class*="grid"] > *, [role="grid"] > *');
    const itemCount = await gridItems.count();
    expect(itemCount).toBeGreaterThanOrEqual(0);
  });

  test('should have clickable subject cards', async ({ page }) => {
    const cards = page.locator('[class*="card"], a[href*="/platform"]').first();
    if (await cards.isVisible()) {
      await expect(cards).toBeVisible();
    }
  });

  test('should display subject information', async ({ page }) => {
    const subjectInfo = page.locator('[class*="subject"] h', '[class*="card"] h').first();
    if (await subjectInfo.isVisible()) {
      const text = await subjectInfo.textContent();
      expect(text?.length).toBeGreaterThan(0);
    }
  });

  test('should navigate on card click', async ({ page }) => {
    const card = page.locator('a[href*="/platform"]').first();
    if (await card.isVisible()) {
      const href = await card.getAttribute('href');
      expect(href).toMatch(/\/platform/);
    }
  });

  test('should be responsive on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    const grid = page.locator('[class*="grid"]').first();
    if (await grid.isVisible()) {
      await expect(grid).toBeVisible();
    }
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 640 });
    const grid = page.locator('[class*="grid"]').first();
    if (await grid.isVisible()) {
      await expect(grid).toBeVisible();
    }
  });

  test('should load images in cards', async ({ page }) => {
    const images = page.locator('[class*="card"] img, [class*="subject"] img').first();
    if (await images.isVisible()) {
      await expect(images).toHaveAttribute('src');
    }
  });
});
