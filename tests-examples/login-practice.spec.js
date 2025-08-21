// @ts-check
import { test, expect } from "@playwright/test";

// Define valid credentials for login
// These credentials are used for the valid login test case
const validUsername = "rahulshettyacademy";
const validPassword = "learning";

test.beforeEach(async ({ page }) => {
  // Navigate to the base URL before each test
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
});

test("Invalid acess login and user", async ({ page }) => {
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/LoginPage/);

  // Fill in the username and password fields
  await page.locator("#username").fill("Username");
  await page.getByTestId("#password").fill("Password");

  // Click on the login button
  await page.getByRole("button", { name: "Sign In" }).click();

  // Verify the error message
  await expect(page.locator("[style*='display: block']")).toBeVisible();
  await expect(page.locator("[style*='display: block']")).toHaveText(
    "Incorrect username/password."
  );

  // Alternatively, you can use the following to check if the error message is visible
  // exctract the text content of the error message
  const errorMessage = await page
    .locator("[style*='display: block']")
    .textContent();
  expect(errorMessage).toBe("Incorrect username/password.");
  console.log("Error message:", errorMessage);
});

test.only("Valid acess login and user", async ({ page }) => {
  const user = page.locator("#username");
  const password = page.locator("#password");
  const loginButton = page.getByRole("button", { name: "Sign In" });

  const cardTitle = page.locator(".card-body a");

  // Fill in the username and password fields with valid credentials
  await user.fill(validUsername);
  await password.fill(validPassword);

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
