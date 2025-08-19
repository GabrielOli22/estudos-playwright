// @ts-check
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // Navigate to the base URL before each test
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
}); 

// Define valid credentials for login
// These credentials are used for the valid login test case
const validUsername = "rahulshettyacademy";
const validPassword = "learning";


test('Invalid acess login and user', async ({ page }) => {
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/LoginPage/);

  // Fill in the username and password fields
  await page.getByTestId("username").fill("Username");
  await page.getByTestId("password").fill("Password");

  // Click on the login button
  await page.getByRole("button", { name: "Sign In" }).click();

  // Verify the error message
  await expect(page.locator("[style*='display: block']")).toBeVisible();
  await expect(page.locator("[style*='display: block']")).toHaveText("Incorrect username/password.");

  // Alternatively, you can use the following to check if the error message is visible
  // exctract the text content of the error message
  const errorMessage = await page.locator("[style*='display: block']").textContent();
  expect(errorMessage).toBe("Incorrect username/password.");
  console.log("Error message:", errorMessage);
});

