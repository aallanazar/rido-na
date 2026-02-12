import { test, expect } from '@playwright/test';

test.describe('Navbar Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should render navbar with proper structure', async ({ page }) => {
    const navbar = page.locator('nav, header');
    await expect(navbar).toBeVisible();
  });

  test('should display navigation links', async ({ page }) => {
    const navLinks = page.locator('nav a, header a');
    const linkCount = await navLinks.count();
    expect(linkCount).toBeGreaterThan(0);
  });

  test('should have clickable navigation items', async ({ page }) => {
    const firstLink = page.locator('nav a, header a').first();
    await expect(firstLink).toBeVisible();
    // Verify link is clickable
    await expect(firstLink).toHaveAttribute('href');
  });

  test('should support dark mode toggle if present', async ({ page }) => {
    const darkModeButton = page.locator('button:has-text("Dark"), button:has-text("Light"), [role="button"][title*="mode"]').first();
    if (await darkModeButton.isVisible()) {
      await darkModeButton.click();
      // Verify dark mode class is applied
      const htmlElement = page.locator('html');
      const darkClass = await htmlElement.getAttribute('class');
      expect(darkClass).toContain('dark');
    }
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 640 });
    const navbar = page.locator('nav, header');
    await expect(navbar).toBeVisible();
  });
});
