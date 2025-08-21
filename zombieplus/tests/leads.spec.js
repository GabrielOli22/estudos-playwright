// @ts-check
import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/");
});

test("Cadastrar um lead com sucesso na fila de espera", async ({ page }) => {
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
  await page.locator("input[name=name]").fill("Gabriel Oliveira");
  // or
  // await page.locator("#name").fill("Gabriel Oliveira");

  // input text whith id email
  await page.locator("#email").fill("test@test.com");

  // expect the modal with id "modal" to be visible with heading "Fila de espera"
  await expect(page.getByTestId('modal').getByRole('heading')).toHaveText("Fila de espera");

  // should contain text "Fila de espera"
  await expect(page.locator("//h2[.='Fila de espera']")).toBeVisible();

  // click button with text "Quero entrar na fila!" int the modal with id "modal"
  await page.getByTestId("modal")
  .getByRole("button", { name: "Quero entrar na fila!" }).click();
 
  // timeout to see the toast with text "Você entrou na fila de espera com sucesso!!
  await page.waitForTimeout(5000)

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

test("Não deve cadastrar quando o Nome não é preenchido", async ({ page }) => {

  await page.getByRole("button", { name: /Aperte o play/ }).click();

  await expect(page.getByTestId('modal').getByRole('heading')).toHaveText("Fila de espera");
  
  await page.locator("#email").fill("teste@test.com");

  await page.getByTestId("modal").getByRole("button", { name: "Quero entrar na fila!" }).click();
  
  // Expect an error message to be visible
  await expect(page.locator(".alert")).toHaveText(["Campo obrigatório"]);

  await expect(page.locator("span[class='alert']")).toContainText("Campo obrigatório");

}); 

test("Não deve cadastrar quando o email não é preenchido", async ({ page }) => {

  await page.getByRole("button", { name: /Aperte o play/ }).click();

  await expect(page.getByTestId('modal').getByRole('heading')).toHaveText("Fila de espera");

  await page.locator("#name").fill("Gabriel Oliveira");

  await page.getByTestId("modal").getByRole("button", { name: "Quero entrar na fila!" }).click();
  
  // Expect an error message to be visible
  await expect(page.locator(".alert")).toHaveText(["Campo obrigatório"]);

  await expect(page.locator("span[class='alert']")).toContainText("Campo obrigatório");

}); 

test("Não deve cadastrar quando nenhum campo é preenchido", async ({ page }) => {

  await page.getByRole("button", { name: /Aperte o play/ }).click();

  await expect(page.getByTestId('modal').getByRole('heading')).toHaveText("Fila de espera");

  await page.getByTestId("modal").getByRole("button", { name: "Quero entrar na fila!" }).click();
  
  await expect(page.locator("label[for='email'] span[class='alert']")).toHaveText(["Campo obrigatório"]);
  await expect(page.locator("label[for='name'] span[class='alert']")).toHaveText(["Campo obrigatório"]);

  // or use better method
  // This will check both alerts at once. Best for to avoid duplication.
  // This is useful when both fields are required and you want to ensure both alerts are displayed using a single assertion (array)
  await expect(page.locator(".alert")).toHaveText([
    "Campo obrigatório",
    "Campo obrigatório"
  ]);

}); 