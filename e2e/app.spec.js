// @ts-check
const { test, expect } = require('@playwright/test');

test('has correct page title', async ({ page }) => {
  await page.goto('/');

  // Check that the page title contains 'FureaShop'
  await expect(page).toHaveTitle(/FureaShop/);
});

test('home page displays main heading', async ({ page }) => {
  await page.goto('/');

  // Example: Look for an <h1> containing "Welcome" or "FureaShop"
  // Replace this with your actual visible text or element selector
  const heading = await page.locator('h1, h2, h3').filter({ hasText: /Welcome|FureaShop/i }).first();
  await expect(heading).toBeVisible();
});

test('displays application version if available', async ({ page }) => {
  await page.goto('/');

  // Assuming your app shows version in a <p> or some text somewhere
  const expectedAppVersion = process.env.APP_VERSION || '1.0.0';

  const versionVisible = await page.locator(`text=Application version: ${expectedAppVersion}`).first();
  await expect(versionVisible).toBeVisible();
});
