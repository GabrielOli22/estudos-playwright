import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // Navigate to the base URL before each test
  await page.goto('https://rahulshettyacademy.com/client');
}); 

// Define valid credentials for login
// These credentials are used for the valid login test case
const validUsername = "qatestqa@test.com";
const validPassword = "Password123";


test('Waiting the page load', async ({ page }) => {
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Shop/);

  // Fill in the username and password fields
  await page.getByTestId("userEmail").fill(validUsername);
  await page.getByTestId("userPassword").fill(validPassword);

  // Click on the login button
  await page.getByRole("button", { name: "login" }).click();

  // wait for element to be visible
  await page.locator(".card-body b").first().waitFor({ state: 'visible' });
    
  // this metod now is deprecated
  //await page.waitForLoadState('networkidle');
  const titles = await page.locator(".card-body b").allTextContents();

  console.log("Titles of all products:", titles);
});

