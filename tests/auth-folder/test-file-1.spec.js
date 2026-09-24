import { test, expect } from '@playwright/test';


test('user can view dashboard', async ({ page }, testInfo) => {

  // Get the current project/browser name from testInfo
  const projectName = testInfo.project.name;
  console.log(`Running on project: ${projectName}`);
  const timestamp = Date.now();

  await page.goto('https://www.saucedemo.com/inventory.html');
  // page is already authenticated
  await page.screenshot({path: './ss/TF1-TC1-${browserName}_${timestamp}.png'});


});

/*
// @ts-check
const{test,expect} = require("@playwright/test");
let timeout = 2000;

test.beforeEach(async({page}) => {
    await page.goto("https://www.saucedemo.com");
});

test("auth - TF #1 - TC #1", async({page, browserName}) => {
    console.log("auth - TF #1 - TC #1");
    await expect(page.locator("#data-test")).toHaveText("Products");
    await page.waitForTimeout(timeout);
    await page.screenshot({path: './ss/TF1-TC1-${browserName}.png'});
});
*/