import { test } from '@playwright/test';


test('user can view dashboard', async ({ page }) => {

  await page.goto('https://www.saucedemo.com');

  // page is already authenticated

});