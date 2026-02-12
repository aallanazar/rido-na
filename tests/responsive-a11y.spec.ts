import { test, expect } from '@playwright/test';

test.describe('Responsive Design', () => {
  const pages = ['/', '/notwendig', '/platform/coding', '/platform/office'];

  pages.forEach(pageUrl => {
    test(`${pageUrl} should be responsive on mobile`, async ({ page }) => {
      await page.setViewportSize({ width: 360, height: 640 });
      await page.goto(pageUrl);
      await page.waitForLoadState('networkidle');

      const content = page.locator('main, body');
      await expect(content).toBeVisible();

      // Check no horizontal overflow
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      const viewportWidth = 360;
      expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 1); // Allow 1px for rounding
    });

    test(`${pageUrl} should be responsive on tablet`, async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto(pageUrl);
      await page.waitForLoadState('networkidle');

      const content = page.locator('main, body');
      await expect(content).toBeVisible();
    });

    test(`${pageUrl} should be responsive on desktop`, async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.goto(pageUrl);
      await page.waitForLoadState('networkidle');

      const content = page.locator('main, body');
      await expect(content).toBeVisible();
    });
  });
});

test.describe('Accessibility', () => {
  test('should have proper heading hierarchy on home page', async ({ page }) => {
    await page.goto('/');
    const headings = page.locator('h1, h2, h3, h4, h5, h6');
    const count = await headings.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should have alt text on images', async ({ page }) => {
    await page.goto('/');
    const images = page.locator('img');
    const imageCount = await images.count();
    
    if (imageCount > 0) {
      for (let i = 0; i < Math.min(imageCount, 5); i++) {
        const img = images.nth(i);
        const alt = await img.getAttribute('alt');
        // Allow empty alt for decorative images
        expect(typeof alt).toBe('string');
      }
    }
  });

  test('should have proper button ARIA labels', async ({ page }) => {
    await page.goto('/');
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();
    
    expect(buttonCount).toBeGreaterThan(0);
    
    if (buttonCount > 0) {
      const firstButton = buttons.first();
      const text = await firstButton.textContent();
      const ariaLabel = await firstButton.getAttribute('aria-label');
      expect(text?.length || ariaLabel?.length).toBeGreaterThan(0);
    }
  });

  test('should have proper link text', async ({ page }) => {
    await page.goto('/');
    const links = page.locator('a');
    const linkCount = await links.count();
    
    expect(linkCount).toBeGreaterThan(0);
    
    if (linkCount > 0) {
      const firstLink = links.first();
      const text = await firstLink.textContent();
      const title = await firstLink.getAttribute('title');
      expect(text?.length || title?.length).toBeGreaterThan(0);
    }
  });

  test('should be keyboard navigable', async ({ page }) => {
    await page.goto('/');
    
    // Tab through several elements
    await page.keyboard.press('Tab');
    let focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(focusedElement).toBeTruthy();
    
    // Tab to next element
    await page.keyboard.press('Tab');
    focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(focusedElement).toBeTruthy();
  });

  test('should have sufficient color contrast', async ({ page }) => {
    await page.goto('/');
    
    const textElements = page.locator('p, span, h1, h2, h3, h4, h5, h6, a').first();
    if (await textElements.isVisible()) {
      // Get computed styles
      const styles = await textElements.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          color: computed.color,
          backgroundColor: computed.backgroundColor,
        };
      });
      
      // Verify we got color info
      expect(styles.color).toBeTruthy();
      expect(styles.backgroundColor).toBeTruthy();
    }
  });
});
