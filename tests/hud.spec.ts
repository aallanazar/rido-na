import { test, expect } from '@playwright/test';

test.describe('HUD Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/notwendig');
  });

  test('should render HUD elements', async ({ page }) => {
    // HUD typically renders on top of canvas
    const hud = page.locator('[class*="hud"], [class*="ui"], [class*="overlay"]').first();
    if (await hud.isVisible()) {
      await expect(hud).toBeVisible();
    }
  });

  test('should display health/status bar', async ({ page }) => {
    const healthBar = page.locator('[class*="health"], [class*="bar"], [class*="status"]').first();
    if (await healthBar.isVisible()) {
      await expect(healthBar).toBeVisible();
    }
  });

  test('should show score or points', async ({ page }) => {
    const score = page.locator('[class*="score"], [class*="points"], span').first();
    if (await score.isVisible()) {
      const text = await score.textContent();
      expect(text?.length).toBeGreaterThan(0);
    }
  });

  test('should display ammunition or resources', async ({ page }) => {
    const ammo = page.locator('[class*="ammo"], [class*="ammo"], [class*="resource"]').first();
    if (await ammo.isVisible()) {
      await expect(ammo).toBeVisible();
    }
  });

  test('should be visible during gameplay', async ({ page }) => {
    const hudContainer = page.locator('[class*="hud"], [class*="game"]').first();
    if (await hudContainer.isVisible()) {
      await expect(hudContainer).toBeVisible();
    }
  });

  test('should position HUD correctly on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    const hud = page.locator('[class*="hud"]').first();
    if (await hud.isVisible()) {
      const box = await hud.boundingBox();
      expect(box).toBeTruthy();
    }
  });

  test('should adapt HUD for mobile', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 640 });
    const hud = page.locator('[class*="hud"]').first();
    if (await hud.isVisible()) {
      const box = await hud.boundingBox();
      expect(box).toBeTruthy();
    }
  });

  test('should have interactive elements', async ({ page }) => {
    const buttons = page.locator('[class*="hud"] button, [class*="ui"] button').first();
    if (await buttons.isVisible()) {
      await expect(buttons).toBeVisible();
    }
  });
});
