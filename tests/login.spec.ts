import { test, expect, Page } from '@playwright/test';

test('user can log in and see dashboard', async ({ page }) => {

    const logs = [];

    await page.goto('https://www.saucedemo.com.test'/*, { waitUntil: 'domcontentloaded' }*/);
    await expect(page.getByText('Login')).toBeVisible();
    //await page.getByTestId('login-button').click();
    await expect(page.getByRole('button', { name: 'Login' })).toHaveText('Login');
    await page.pause(); //when we want to debug to check if the locator is visible or if the element is hidden somthing 

    await page.getByPlaceholder('Username').fill('standard\_user');
        /*await page.getByRole('textbox', { name: 'Username' }).fill('standard\_user');*/
    await page.getByPlaceholder('Password').fill('secret\_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/inventory/);
    await expect(page.getByText('Products')).toBeVisible();

    
    // Intercept console errors
    page.on('console', msg => {
      if (msg.type() === 'error') {
        logs.push(`[Console Error] ${msg.text()}`);
      }
    });
});