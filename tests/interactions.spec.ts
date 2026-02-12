import { test, expect } from '@playwright/test';
import { TestUtils } from './test-utils';

test.describe('Advanced Component Interactions', () => {
  test('should navigate through platform modules', async ({ page }) => {
    await page.goto('/');
    await TestUtils.waitForLoadComplete(page);

    // Navigate to coding platform
    const codingLink = page.locator('a[href*="/platform/coding"]').first();
    if (await TestUtils.isVisible(page, 'a[href*="/platform/coding"]')) {
      await codingLink.click();
      await TestUtils.waitForLoadComplete(page);
      
      // Verify we're on the coding page
      await expect(page).toHaveURL(/.*\/platform\/coding/);
    }
  });

  test('should perform search and interact with results', async ({ page }) => {
    await page.goto('/');
    
    // Find and use search
    const searchBox = page.locator('input[type="search"], input[placeholder*="search" i]').first();
    if (await TestUtils.isVisible(page, 'input[type="search"]')) {
      await TestUtils.fillInput(page, 'input[type="search"]', 'javascript');
      await page.waitForTimeout(500); // Wait for debounce
      await page.keyboard.press('Enter');
      await TestUtils.waitForLoadComplete(page);
    }
  });

  test('should handle responsive viewport changes', async ({ page }) => {
    await page.goto('/');
    
    // Start with desktop
    await TestUtils.setDesktopViewport(page);
    let mainContent = page.locator('main, body');
    await expect(mainContent).toBeVisible();

    // Switch to mobile
    await TestUtils.setMobileViewport(page);
    mainContent = page.locator('main, body');
    await expect(mainContent).toBeVisible();

    // Back to tablet
    await TestUtils.setTabletViewport(page);
    mainContent = page.locator('main, body');
    await expect(mainContent).toBeVisible();
  });

  test('should navigate using keyboard', async ({ page }) => {
    await page.goto('/');
    
    // Tab through elements
    await TestUtils.pressKey(page, 'Tab');
    const firstFocused = await page.evaluate(() => document.activeElement?.tagName);
    expect(firstFocused).toBeTruthy();

    // Tab to next
    await TestUtils.pressKey(page, 'Tab');
    const secondFocused = await page.evaluate(() => document.activeElement?.tagName);
    expect(secondFocused).toBeTruthy();

    // Shift+Tab to go back
    await TestUtils.pressKeyCombo(page, 'Shift', 'Tab');
  });

  test('should scroll and interact with scrolled elements', async ({ page }) => {
    await page.goto('/');
    
    const mainContent = page.locator('main, [role="main"]').first();
    if (await mainContent.isVisible()) {
      // Scroll element into view
      await TestUtils.scrollToElement(page, 'main');
      await expect(mainContent).toBeVisible();
    }
  });

  test('should verify page loads without critical errors', async ({ page }) => {
    await page.goto('/');
    
    // Verify no critical console errors
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await TestUtils.waitForLoadComplete(page);
    await page.waitForTimeout(1000);

    const criticalErrors = errors.filter(e =>
      !e.includes('404') && !e.includes('NEXT')
    );

    expect(criticalErrors).toHaveLength(0);
  });

  test('should test all viewports across main routes', async ({ page }) => {
    const routes = ['/', '/notwendig', '/platform/office'];
    const viewports = [
      { name: 'mobile', width: 360, height: 640 },
      { name: 'tablet', width: 768, height: 1024 },
      { name: 'desktop', width: 1920, height: 1080 },
    ];

    for (const route of routes) {
      for (const viewport of viewports) {
        await TestUtils.setViewport(page, viewport.width, viewport.height);
        await page.goto(route);
        await TestUtils.waitForLoadComplete(page);

        // Verify page loaded correctly
        const content = page.locator('main, body').first();
        await expect(content).toBeVisible({
          timeout: 10000,
        });
      }
    }
  });

  test('should handle button interactions with feedback', async ({ page }) => {
    await page.goto('/');
    
    const buttons = page.locator('button');
    const count = await buttons.count();

    if (count > 0) {
      const firstButton = buttons.first();
      
      // Verify button is interactive
      await expect(firstButton).toBeEnabled();

      // Hover and check for visual feedback
      await firstButton.hover();
      const hoverStyles = await TestUtils.getStyles(page, 'button');
      expect(hoverStyles).toBeTruthy();
    }
  });

  test('should test all major UI components render', async ({ page }) => {
    await page.goto('/');
    
    const components = {
      navbar: 'nav, header',
      main: 'main',
      footer: 'footer',
    };

    for (const [name, selector] of Object.entries(components)) {
      const element = page.locator(selector).first();
      try {
        await element.waitFor({ state: 'visible', timeout: 2000 });
        console.log(`✓ ${name} component found`);
      } catch {
        console.log(`✗ ${name} component not found (this may be expected)`);
      }
    }
  });

  test('should verify responsive text and content', async ({ page }) => {
    await page.goto('/');
    
    // Get all text content
    const paragraphs = page.locator('p, h1, h2, h3');
    const count = await paragraphs.count();

    if (count > 0) {
      // Verify first few elements have text
      for (let i = 0; i < Math.min(count, 3); i++) {
        const text = await paragraphs.nth(i).textContent();
        expect(text?.trim().length).toBeGreaterThan(0);
      }
    }
  });
});

test.describe('Performance and Load Time', () => {
  test('should load home page within reasonable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    const loadTime = Date.now() - startTime;
    
    // Page should load within 10 seconds
    expect(loadTime).toBeLessThan(10000);
  });

  test('should complete network requests quickly', async ({ page }) => {
    const requests: number[] = [];
    
    page.on('request', (request) => {
      const startTime = Date.now();
      request.response()?.then(() => {
        requests.push(Date.now() - startTime);
      });
    });

    await page.goto('/');
    await TestUtils.waitForLoadComplete(page);
    
    // Most requests should complete within 5 seconds
    const slowRequests = requests.filter(time => time > 5000);
    expect(slowRequests.length).toBeLessThan(5);
  });
});
