import { test as base } from '@playwright/test';
import { TestUtils } from './test-utils';

/**
 * Fixture definitions for reusable test setup
 */

/**
 * Extend base test with utilities
 * Note: Custom fixtures aren't needed for TestUtils since it's just a class
 */
export const test = base;

// Export TestUtils directly for use in tests
export { TestUtils };
export { expect } from '@playwright/test';
