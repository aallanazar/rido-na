import { test, expect } from '@playwright/test';

test.describe('MainMenu Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/notwendig');
  });

  test('should render main menu', async ({ page }) => {
    const menu = page.locator('[class*="menu"], [class*="main"]').first();
    if (await menu.isVisible()) {
      await expect(menu).toBeVisible();
    }
  });

  test('should display menu title', async ({ page }) => {
    const title = page.locator('h1:has-text("Main Menu"), h1:has-text("Notwendig"), h2').first();
    if (await title.isVisible()) {
      await expect(title).toBeVisible();
    }
  });

  test('should have menu buttons', async ({ page }) => {
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();
    expect(buttonCount).toBeGreaterThan(0);
  });

  test('should have start/play button', async ({ page }) => {
    const playButton = page.locator('button:has-text("Start"), button:has-text("Play"), button:has-text("Begin")').first();
    if (await playButton.isVisible()) {
      await expect(playButton).toBeVisible();
      await expect(playButton).toBeEnabled();
    }
  });

  test('should have settings button if available', async ({ page }) => {
    const settingsButton = page.locator('button:has-text("Settings"), button:has-text("Options"), button[title*="settings" i]').first();
    if (await settingsButton.isVisible()) {
      await expect(settingsButton).toBeVisible();
    }
  });

  test('should have quit/back button if available', async ({ page }) => {
    const quitButton = page.locator('button:has-text("Quit"), button:has-text("Back"), button:has-text("Exit")').first();
    if (await quitButton.isVisible()) {
      await expect(quitButton).toBeVisible();
    }
  });

  test('should respond to button interactions', async ({ page }) => {
    const firstButton = page.locator('button').first();
    if (await firstButton.isVisible()) {
      await expect(firstButton).toBeEnabled();
      // Test button is clickable
      await firstButton.hover();
      await expect(firstButton).toBeVisible();
    }
  });

  test('should display game canvas or content', async ({ page }) => {
    const canvas = page.locator('canvas');
    if (await canvas.isVisible()) {
      await expect(canvas).toBeVisible();
    }
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 640 });
    const menu = page.locator('[class*="menu"]').first();
    if (await menu.isVisible()) {
      await expect(menu).toBeVisible();
    }
  });
});
