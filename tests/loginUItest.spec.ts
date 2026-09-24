import { test, expect, Page } from '@playwright/test';

test('login UI test', async ({ page }) => {

    const logs = [];

    await page.goto('https://www.saucedemo.com');
    // Page title
    await expect(page.getByText('Swag Labs')).toBeVisible();
    // Input field Username
    await expect(page.getByPlaceholder('Username')).toBeEmpty //toBeVisible();
    // Input field Password
    await expect(page.getByPlaceholder('password')).toBeEmpty //toBeVisible();
    // Login button
    await expect(page.getByRole('button', { name: 'Login' })).toHaveText('Login');
    await page.getByRole('button', { name: 'Login' }).click();
    
    // Intercept console errors
    page.on('console', msg => {
      if (msg.type() === 'error') {
        logs.push(`[Console Error] ${msg.text()}`);
      }
    });
});