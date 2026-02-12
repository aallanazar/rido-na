import { test as base } from '@playwright/test';
import { TestUtils } from './test-utils';

/**
 * Fixture definitions for reusable test setup
 */

type TestFixtures = {
  utils: typeof TestUtils;
  authorizedPage: void;
};

export const test = base.extend<TestFixtures>({
  /**
   * Provide TestUtils to all tests
   */
  utils: async ({}, use) => {
    await use(TestUtils);
  },

  /**
   * Fixture for pages that need proper setup
   */
  authorizedPage: async ({ page }, use) => {
    // Navigate to app
    await page.goto('/');
    
    // Wait for app to be ready
    await page.waitForLoadState('networkidle');
    
    // Use the page in the test
    await use();
  },
});

export { expect } from '@playwright/test';
