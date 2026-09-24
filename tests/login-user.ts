import { chromium } from '@playwright/test';
(async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://www.saucedemo.com');
    await page.fill('#username', 'regular_user');
    await page.fill('#password', 'userpass123');
    await page.click('button[type="submit"]');
    await context.storageState({ path: 'user.json' });
    await browser.close();
})();