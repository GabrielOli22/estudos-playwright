// line 28
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // Navigate to the base URL before each test
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
});

// Define valid credentials for login
// These credentials are used for the valid login test case
const validUsername = "rahulshettyacademy";
const validPassword = "learning";
const userRole = "Consultant";

test("Select dropdown", async ({ page }) => {
  const user = page.locator("#username");
  const password = page.locator("#password");
  const dropdown = page.locator("select.form-control");
  const loginButton = page.getByRole("button", { name: "Sign In" });

  const cardTitle = page.locator(".card-body a");

  // Fill in the username and password fields with valid credentials
  await user.fill(validUsername);
  await password.fill(validPassword);

  // Select class option from dropdown
  await dropdown.selectOption(userRole);

  // await page.pause();

  // select the first option
  // await page.locator(".radiotextsty").first().click();
  
  // select the last option
  await page.locator(".radiotextsty").last().click();

  // Handle the alert popup
  if (page.locator(".modal-body").isVisible()) {
    page.locator("#okayBtn").click(); 
  }

  // Click on the login button
  await loginButton.click();

  // Verify that the user is redirected to the expected URL
  await expect(page).toHaveURL(
    /https:\/\/rahulshettyacademy.com\/angularpractice\/shop/
  );

  // Verify that the page contains the expected heading
  await expect(page.locator("h1[class='my-4']")).toContainText(["Shop Name"]);

  // Extract and log the text content of the first product card link
  console.log(await cardTitle.nth(1).textContent());
  // or simply
  console.log(cardTitle.first().textContent());

  // Extract and log the text content of all product card links
  // This will log an array of text contents of all product card links
  await cardTitle.allTextContents().then((text) => console.log(text));
});
