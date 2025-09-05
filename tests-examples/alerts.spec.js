// line 21
import { test, expect } from "@playwright/test";
import { only } from "node:test";

const invalidEmail = "test@cadassas";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/");
});

test("Não deve cadastrar com email incorreto", async ({ page }) => {

  await page.getByRole("button", { name: /Aperte o play/ }).click();
  
  await page.locator("input[name=name]").fill("Gabriel Oliveira");

  await page.locator("#email").fill("@testtest.xxxc");

  await page.getByTestId("modal").getByRole("button", { name: "Quero entrar na fila!" }).click();
  
  // Expect an error message to be visible
  await expect(page.locator(".alert")).toHaveText([
    "Email incorreto"]);
  // or 
  await expect(page.locator("span[class='alert']")).toContainText("Email incorreto");
  // page.getByText("Email incorreto");
});


test("Cadastrar um lead com dados válidos", async ({ page }) => {

  // Define locators for the email and password fields
  const email = page.locator("input[name=name]");
  const password = page.locator("#email");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Zombie+/);

  // click element with text

  await page.getByRole("button", { name: /Aperte o play/ }).click();

  // input text with locator id="name"
  await email.fill("Gabriel Oliveira");

  // input text whith id email
  await password.fill("test@test.com");

  // expect the modal with id "modal" to be visible with heading "Fila de espera"
  await expect(page.getByTestId("modal").getByRole("heading")).toHaveText(
    "Fila de espera"
  );
  // or simply

  // await expect(page.getByTestId('modal')).getByRole( heading, { name: 'Quero entrar na fila!'});
  // page.getByRole

  // should contain text "Fila de espera"
  await expect(page.locator("//h2[.='Fila de espera']")).toBeVisible();

  // click button with text "Quero entrar na fila!" int the modal with id "modal"
  await page
    .getByTestId("modal")
    .getByRole("button", { name: "Quero entrar na fila!" })
    .click();

  // get part of the text in the modal
  // await page.getByText("Nossa equipe entrará em contato").click();

  // this will log the entire HTML content of the page to the console use this if the element close to fast
  // await page.content().then((content) => {
  //   console.log("Page content:", content);
  // });

  await expect(page.locator("div[class='toast']")).toContainText([
    "nossa equipe entrará em contato",
  ]);

  // element with class "toast" should be hidden after 5 seconds
  await expect(page.locator("div[class='toast']")).toBeHidden({
    timeout: 5000,
  });

});

