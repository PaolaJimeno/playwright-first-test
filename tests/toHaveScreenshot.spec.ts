import { test, expect } from '@playwright/test';

test('visual testing', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/inventory.html');
  // await page.goto('https://www.saucedemo.com/');
  
  // checking the shopping card image
  await expect(page).toHaveScreenshot('loginpage.png');
  //First-Time Run: If login-baseline.png does not exist yet, the test will typically fail and generate a new baseline file for you automatically (or require you to run the update command).
  //npx playwright test --update-snapshots

});
