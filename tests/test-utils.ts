import { Page, expect } from '@playwright/test';

/**
 * Common test utilities for Playwright tests
 */

export class TestUtils {
  /**
   * Wait for element to be visible and return it
   */
  static async waitForElement(page: Page, selector: string, timeout = 5000) {
    await page.waitForSelector(selector, { timeout });
    return page.locator(selector);
  }

  /**
   * Click element and wait for navigation
   */
  static async clickAndWaitForNavigation(page: Page, selector: string) {
    await Promise.all([
      page.waitForNavigation(),
      page.locator(selector).click(),
    ]);
  }

  /**
   * Fill input and verify the value
   */
  static async fillInput(page: Page, selector: string, value: string) {
    const input = page.locator(selector);
    await input.fill(value);
    expect(await input.inputValue()).toBe(value);
  }

  /**
   * Get all visible buttons matching text
   */
  static async getButtonsByText(page: Page, text: string) {
    return page.locator(`button:has-text("${text}")`);
  }

  /**
   * Check if element is visible
   */
  static async isVisible(page: Page, selector: string): Promise<boolean> {
    try {
      await page.waitForSelector(selector, { timeout: 1000 });
      return await page.locator(selector).isVisible();
    } catch {
      return false;
    }
  }

  /**
   * Wait for loading state to complete
   */
  static async waitForLoadComplete(page: Page) {
    await page.waitForLoadState('networkidle');
  }

  /**
   * Take screenshot with timestamp
   */
  static async takeScreenshot(page: Page, name: string) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    await page.screenshot({ path: `screenshots/${name}-${timestamp}.png` });
  }

  /**
   * Verify element has attribute with value
   */
  static async verifyAttribute(
    page: Page,
    selector: string,
    attribute: string,
    expectedValue: string | RegExp
  ) {
    const element = page.locator(selector);
    const value = await element.getAttribute(attribute);
    if (expectedValue instanceof RegExp) {
      expect(value).toMatch(expectedValue);
    } else {
      expect(value).toBe(expectedValue);
    }
  }

  /**
   * Check viewport size
   */
  static async setViewport(page: Page, width: number, height: number) {
    await page.setViewportSize({ width, height });
  }

  /**
   * Mobile viewport
   */
  static async setMobileViewport(page: Page) {
    await this.setViewport(page, 360, 640);
  }

  /**
   * Tablet viewport
   */
  static async setTabletViewport(page: Page) {
    await this.setViewport(page, 768, 1024);
  }

  /**
   * Desktop viewport
   */
  static async setDesktopViewport(page: Page) {
    await this.setViewport(page, 1920, 1080);
  }

  /**
   * Get all console errors
   */
  static async getConsoleErrors(page: Page): Promise<string[]> {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    return errors;
  }

  /**
   * Verify page has no critical errors
   */
  static async verifyNoErrors(page: Page) {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    // Wait a bit for errors to populate
    await page.waitForTimeout(1000);

    const criticalErrors = errors.filter(e =>
      !e.includes('404') &&
      !e.includes('NEXT') &&
      !e.includes('hydration') &&
      !e.includes('ResizeObserver')
    );

    expect(criticalErrors).toHaveLength(0);
  }

  /**
   * Perform keyboard shortcut
   */
  static async pressKey(page: Page, key: string) {
    await page.keyboard.press(key);
  }

  /**
   * Hold and press key combination
   */
  static async pressKeyCombo(page: Page, ...keys: string[]) {
    for (const key of keys.slice(0, -1)) {
      await page.keyboard.down(key);
    }
    await page.keyboard.press(keys[keys.length - 1]);
    for (const key of keys.slice(0, -1)) {
      await page.keyboard.up(key);
    }
  }

  /**
   * Scroll to element
   */
  static async scrollToElement(page: Page, selector: string) {
    const element = page.locator(selector);
    await element.scrollIntoViewIfNeeded();
  }

  /**
   * Get element styles
   */
  static async getStyles(page: Page, selector: string) {
    const element = page.locator(selector);
    return element.evaluate((el) => window.getComputedStyle(el).cssText);
  }

  /**
   * Check element visibility with custom options
   */
  static async checkVisibility(
    page: Page,
    selector: string,
    shouldBeVisible: boolean = true
  ) {
    const element = page.locator(selector).first();
    if (shouldBeVisible) {
      await expect(element).toBeVisible();
    } else {
      await expect(element).toBeHidden();
    }
  }

  /**
   * Wait for element text to contain value
   */
  static async waitForText(page: Page, selector: string, text: string) {
    const element = page.locator(selector);
    await expect(element).toContainText(text);
  }

  /**
   * Get all text from multiple elements
   */
  static async getAllText(page: Page, selector: string): Promise<string[]> {
    const elements = page.locator(selector);
    const count = await elements.count();
    const texts: string[] = [];
    for (let i = 0; i < count; i++) {
      const text = await elements.nth(i).textContent();
      if (text) texts.push(text);
    }
    return texts;
  }
}
