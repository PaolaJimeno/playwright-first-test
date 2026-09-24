import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0, //before was 2 CHANGED APPLIED
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /*Whether to exit with an error if any tests are marked as flaky. Useful on CI.*/
  failOnFlakyTests: !!process.env.CI,
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */ 
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure', 
    screenshot: 'only-on-failure',
    //video: 'retain-on-failure', 
    // headless: true,
    // storageState: 'playwright/.auth/user.json', // load login session
  },
  /*Default timeout for async expect matchers in milliseconds, defaults to 5000ms. */
  expect: {
    timeout: 10000, // miliseconds
    toMatchSnapshot: {
      maxDiffPixels: 1000,
    },
  },

  /* 1. Configure projects for major browsers */
  projects: [
     { name: 'setup', 
      testMatch: /.*\.setup\.ts/, 
      //use: {user: 'standard_user', password: 'secret_sauce'}
      // recomended to use environment variables
      // i.e. env_var: process.env.ENVVAR
     },

     // 2. Project for Admin testing
    {
      name: 'admin-user-tests-browser-chromium',
      use: { ...devices['Desktop Chrome'],
             storageState: 'playwright/.auth/admin.json', // Use admin state
           },
      dependencies: ['setup'], // Runs after setup completes
     //testMatch: /e2e\/tests-file-1\.spec\.ts/, 
    },

    // 3. Project for Standard User testing
    {
      name: 'standard-user-tests-browser-firefox',
      use: { ...devices['Desktop Firefox'],
             storageState: 'playwright/.auth/user.json', // Use admin state
           },
      dependencies: ['setup'], // Runs after setup completes
      //testMatch: /e2e\/tests-file-1\.spec\.ts/, 
    },



/* 
    // configure projects for multiple browsers
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] , // use is an object
            //user: 'user',
            storageState: 'playwright/.auth/user.json',
            },
      dependencies: ['setup'] // set the dependency for the different projects. 
                              // in order to be loged in in every single test I'll be setting the dependency setup
                              // wf, will login once, then will storage auth, then will share the login status for every single project
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] , 
           // user: 'user',
            storageState: 'playwright/.auth/user.json',
           },
      dependencies: ['setup']
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] ,
            //user: 'user',
            storageState: 'playwright/.auth/user.json',
           },
      dependencies: ['setup']
    },
*/
    // dependencies: ['setup'],

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
