// @ts-check
import { test } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage.js";

let loginPage

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  // await loginPage.visit();
});

// test("deve logar com sucesso como adm", async ({ page }) => {
//   await loginPage.visit();
//   await loginPage.submitLogin("teste", "1234");

// });

test("não deve logar com email incorreto", async ({ page }) => {
  await loginPage.visit();
  await loginPage.openLoginModal();
  await loginPage.submitLogin("adminqax.com", "1234");
  
  const message = "Email incorreto";
  await loginPage.alertErrorLogin(message);

});

// test("não deve logar com senha incorreta", async ({ page }) => {
//   await loginPage.visit();
//   await loginPage.submitLogin("admin@qax.com", "1234");
  
// });

test("não deve logar quando email não é preenchido", async ({ page }) => {
  await loginPage.visit();
  await loginPage.openLoginModal();
  await loginPage.submitLogin("", "1234");
  
  await loginPage.alertErrorLogin("Campo obrigatório");

});

test("não deve logar quando senha não é preenchida", async ({ page }) => {
  await loginPage.visit();
  await loginPage.submitLogin("aa", "");
  
});

test("não deve logar quando nenhum campo é preenchido", async ({ page }) => {
  await loginPage.visit();
  await loginPage.openLoginModal();
  await loginPage.submitLogin("", "");
  
  await loginPage.alertErrorLogin("Campo obrigatório");
  await loginPage.alertPasswordErrorLogin("Campo obrigatório");
   
});
