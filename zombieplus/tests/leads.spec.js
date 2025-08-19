// @ts-check
import { test, expect } from "@playwright/test";

test("Cadastrar um lead na fila de espera", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Zombie+/);

  // click element with text
    // await page.getByRole("button", { name: "Aperte o play... se tiver coragem" }).click();
  // or using regular expression
    await page.getByRole("button", { name: /Aperte o play/ }).click();

  // input text in the input with placeholder "Digite seu nome"
  // await page.getByPlaceholder("Seu nome completo").fill("Gabriel Oliveira");

  // input text with locator id="name"
  await page.locator("#name").fill("Gabriel Oliveira");

  // input text whith id email
  await page.getByTestId("email").fill("test@test.com");

  // click button with text "Quero entrar na fila!"
  // await page.getByRole("button", {name: "Quero entrar na fila!"}).click();
});
