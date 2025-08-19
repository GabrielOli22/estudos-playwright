// @ts-check
import { test, expect } from '@playwright/test';

test('Browser context playwright test', async ({ browser }) => 
  {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://playwright.dev/");
  });

// execute only this test
test.only('Go to Web page', async ({ page }) => 
  {
    // navigate to the page
    await page.goto("https://google.com");
    // get the title of the page
    page.title().then(title => {
      // print the title of the page
      console.log(`The title of the page is: ${title}`);
    });
    // expect the title of the page to be "Google"
    await expect(page).toHaveTitle("Google");
     
  });
