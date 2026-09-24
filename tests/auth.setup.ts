import { test as setup, expect } from '@playwright/test';
import path from 'path';

// const authFile = path.join(__dirname,'./playwright/.auth/user.json');
const adminAuthFile = path.join('playwright/.auth/admin.json');
const userAuthFile = path.join('playwright/.auth/user.json');

setup('adminUserAuthenticate', async ({ page }) => {

  await page.goto('https://www.saucedemo.com');
  await page.getByLabel('UserName').fill('standard_user');
  await page.getByLabel('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  // Wait for login to complete
  await page.waitForURL('https://www.saucedemo.com/inventory.html');

  // Save the authenticated browser state
  // await page.context().storageState({ path: authFile });
  await page.context().storageState({ path: adminAuthFile });
});

setup('standardUserAuthenticate', async ({ page }) => {

  await page.goto('https://www.saucedemo.com');
  await page.getByLabel('UserName').fill('standard_user');
  await page.getByLabel('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  // Wait for login to complete
  await page.waitForURL('https://www.saucedemo.com/inventory.html');

  // Save the authenticated browser state
  await page.context().storageState({ path: userAuthFile });
});

/*
// method: , {page} is a fixture
setup('authenticate by UI', async ({ page }, testInfo) => {

  const user = testInfo.project.use.user;
  const password = testInfo.project.use.password;

  // 1. Navigate to the login page
  await page.goto('https://www.saucedemo.com');

  // 2. Perform login actions
  await page.getByLabel('Email').fill('user');
  await page.getByLabel('Password').fill('password');
  await page.getByRole('button', { name: 'login-button' }).click();

  // 3. Confirm the login succeeded
  await page.waitForURL('https://www.saucedemo.com/inventory.html');

  // 4. Save storage state to a file
  await page.context().storageState({ path: authFile });
});
*/