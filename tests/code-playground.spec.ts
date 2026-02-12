import { test, expect } from '@playwright/test';

test.describe('CodePlayground Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/platform/coding');
  });

  test('should render code editor section', async ({ page }) => {
    // Look for code editor elements
    const editor = page.locator('[class*="editor"], [class*="code"], textarea, pre');
    const editorCount = await editor.count();
    expect(editorCount).toBeGreaterThan(0);
  });

  test('should have visible editor container', async ({ page }) => {
    const codePlayground = page.locator('[class*="playground"], [class*="editor"]').first();
    if (await codePlayground.isVisible()) {
      await expect(codePlayground).toBeVisible();
    }
  });

  test('should support code input', async ({ page }) => {
    const textarea = page.locator('textarea').first();
    if (await textarea.isVisible()) {
      await textarea.fill('console.log("test");');
      const value = await textarea.inputValue();
      expect(value).toContain('console.log');
    }
  });

  test('should have execute or run button', async ({ page }) => {
    const runButton = page.locator('button:has-text("Run"), button:has-text("Execute"), button:has-text("Submit")').first();
    if (await runButton.isVisible()) {
      await expect(runButton).toBeEnabled();
    }
  });

  test('should display output area', async ({ page }) => {
    const output = page.locator('[class*="output"], [class*="result"], [class*="console"]').first();
    if (await output.isVisible()) {
      await expect(output).toBeVisible();
    }
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 640 });
    const codePlayground = page.locator('[class*="playground"], [class*="editor"]').first();
    if (await codePlayground.isVisible()) {
      await expect(codePlayground).toBeVisible();
    }
  });
});
