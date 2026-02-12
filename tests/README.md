# Playwright UI Tests

This directory contains comprehensive UI tests for the Rido-NA application using Playwright.

## Installation

First, install the dependencies:

```bash
npm install
```

Playwright will automatically install the required browsers.

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in UI mode (interactive)
```bash
npm run test:ui
```

### Run tests in debug mode
```bash
npm run test:debug
```

### Run specific test file
```bash
npx playwright test tests/navbar.spec.ts
```

### Run tests with a specific browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Run tests in headed mode (see the browser)
```bash
npx playwright test --headed
```

### View test report
```bash
npx playwright show-report
```

## Test Files

- **navbar.spec.ts** - Tests for the Navbar component
- **code-playground.spec.ts** - Tests for the CodePlayground component
- **global-search.spec.ts** - Tests for the GlobalSearch component
- **subject-grid.spec.ts** - Tests for the SubjectGrid component
- **main-menu.spec.ts** - Tests for the MainMenu component (game)
- **hud.spec.ts** - Tests for the HUD component (game)
- **navigation.spec.ts** - Tests for page navigation and layout
- **responsive-a11y.spec.ts** - Tests for responsive design and accessibility

## Test Coverage

The tests cover:
- Component rendering and visibility
- User interactions (clicks, input)
- Navigation and routing
- Responsive design (mobile, tablet, desktop)
- Accessibility (ARIA labels, heading hierarchy, keyboard navigation)
- Visual feedback and state changes
- Error handling

## Configuration

The Playwright configuration is defined in `playwright.config.ts` at the root of the project. Key settings:

- **Base URL**: http://localhost:3000
- **Timeout**: 30000ms per test
- **Retries**: 2 on CI, 0 locally
- **Browsers**: Chromium, Firefox, WebKit, Mobile Chrome
- **Auto-server**: Starts `npm run dev` before tests

## CI/CD Integration

Tests are configured to run in CI environments with:
- No retry on CI for faster feedback
- Screenshots on failure
- Report generation
- Sequential test execution

## Best Practices

1. **Use meaningful test descriptions** - Tests should describe what they're testing
2. **Test user behavior** - Focus on what users see and interact with
3. **Avoid flaky tests** - Use proper waits and stability checks
4. **Keep tests isolated** - Each test should be independent
5. **Use beforeEach** - Set up common test conditions

## Debugging

### Debug single test
```bash
npx playwright test tests/navbar.spec.ts --debug
```

### Inspect elements
Use `page.pause()` in test code to pause execution and inspect

### View browser during test
```bash
npx playwright test --headed --headed-timeout=60000
```

## Performance

Tests run in parallel by default. To run sequentially:
```bash
npx playwright test --workers=1
```

## Resources

- [Playwright Documentation](https://playwright.dev)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [API Reference](https://playwright.dev/docs/api/class-page)
