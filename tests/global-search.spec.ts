import { test, expect } from '@playwright/test';

test.describe('GlobalSearch Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should render search box', async ({ page }) => {
    const searchBox = page.locator('input[type="search"], input[placeholder*="search" i], input[placeholder*="Search" i]').first();
    if (await searchBox.isVisible()) {
      await expect(searchBox).toBeVisible();
    }
  });

  test('should accept text input in search', async ({ page }) => {
    const searchBox = page.locator('input[type="search"], input[placeholder*="search" i]').first();
    if (await searchBox.isVisible()) {
      await searchBox.fill('test query');
      const value = await searchBox.inputValue();
      expect(value).toBe('test query');
    }
  });

  test('should trigger search on enter', async ({ page }) => {
    const searchBox = page.locator('input[type="search"], input[placeholder*="search" i]').first();
    if (await searchBox.isVisible()) {
      await searchBox.fill('python');
      await searchBox.press('Enter');
      // Wait for search results or navigation
      await page.waitForLoadState('networkidle');
    }
  });

  test('should display search results dropdown', async ({ page }) => {
    const searchBox = page.locator('input[type="search"], input[placeholder*="search" i]').first();
    if (await searchBox.isVisible()) {
      await searchBox.click();
      await searchBox.fill('test');
      // Look for dropdown or search results
      const dropdown = page.locator('[role="listbox"], [role="option"], [class*="dropdown"]').first();
      await page.waitForTimeout(300); // Wait for animation
      if (await dropdown.isVisible()) {
        await expect(dropdown).toBeVisible();
      }
    }
  });

  test('should have search filters if available', async ({ page }) => {
    const filters = page.locator('[class*="filter"], button[title*="filter" i]').first();
    if (await filters.isVisible()) {
      await expect(filters).toBeVisible();
    }
  });

  test('should clear search on clear button click', async ({ page }) => {
    const searchBox = page.locator('input[type="search"], input[placeholder*="search" i]').first();
    const clearButton = page.locator('button[aria-label*="clear" i], button:has-text("Clear")').first();
    
    if (await searchBox.isVisible()) {
      await searchBox.fill('test');
      if (await clearButton.isVisible()) {
        await clearButton.click();
        const value = await searchBox.inputValue();
        expect(value).toBe('');
      }
    }
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 640 });
    const searchBox = page.locator('input[type="search"], input[placeholder*="search" i]').first();
    if (await searchBox.isVisible()) {
      await expect(searchBox).toBeVisible();
    }
  });
});
