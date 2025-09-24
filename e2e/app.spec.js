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
  const heading = await page.locator('li').filter({ hasText: /Home|FureaShop/i }).first();
  await expect(heading).toBeVisible();
});

test('home page displays shop heading', async ({ page }) => {
  await page.goto('/');

  // Example: Look for an <h1> containing "Welcome" or "FureaShop"
  // Replace this with your actual visible text or element selector
  const heading = await page.locator('li').filter({ hasText: /Shop|FureaShop/i }).first();
  await expect(heading).toBeVisible();
});
