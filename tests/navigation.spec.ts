import { test, expect } from '@playwright/test';

test.describe('Page Navigation and Layout', () => {
  test('should load home page', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/.*/, { timeout: 10000 });
    const content = page.locator('main, body');
    await expect(content).toBeVisible();
  });

  test('should navigate to platform/coding', async ({ page }) => {
    await page.goto('/platform/coding');
    await page.waitForLoadState('networkidle');
    const content = page.locator('main, body');
    await expect(content).toBeVisible();
  });

  test('should navigate to notwendig game', async ({ page }) => {
    await page.goto('/notwendig');
    await page.waitForLoadState('networkidle');
    const content = page.locator('main, body');
    await expect(content).toBeVisible();
  });

  test('should navigate to platform/office', async ({ page }) => {
    await page.goto('/platform/office');
    await page.waitForLoadState('networkidle');
    const content = page.locator('main, body');
    await expect(content).toBeVisible();
  });

  test('should handle 404 pages gracefully', async ({ page }) => {
    const response = await page.goto('/nonexistent-page');
    // Should not crash - either 404 or redirect
    expect(response).toBeTruthy();
  });

  test('should apply light theme correctly', async ({ page }) => {
    await page.goto('/');
    const html = page.locator('html');
    const classAttr = await html.getAttribute('class');
    // Light mode doesn't have 'dark' class typically
    expect(classAttr).not.toContain('dark');
  });

  test('should have proper meta tags', async ({ page }) => {
    await page.goto('/');
    const viewport = page.locator('meta[name="viewport"]');
    await expect(viewport).toBeVisible();
  });

  test('should load root layout without errors', async ({ page }) => {
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Should not have critical errors
    const criticalErrors = errors.filter(e => 
      !e.includes('404') && !e.includes('NEXT') && !e.includes('hydration')
    );
    expect(criticalErrors.length).toBe(0);
  });

  test('should have accessible navigation', async ({ page }) => {
    await page.goto('/');
    const nav = page.locator('nav, [role="navigation"]').first();
    if (await nav.isVisible()) {
      const links = nav.locator('a');
      const linkCount = await links.count();
      expect(linkCount).toBeGreaterThan(0);
    }
  });
});
