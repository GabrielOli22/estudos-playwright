// @ts-check
import { test } from "@playwright/test";
import { LeadsPage } from "../../pages/LeadsPage.js";

// Declare a variable to hold the LeadsPage instance
// This is useful if you want to use the same instance across multiple tests
// but in this case, we will instantiate it in each test to
// Use const for values that won't be reassigned.
// Use let for values that will be reassigned.
let leadsPage

test.beforeEach(async ({ page }) => {
  // Instantiate the LeadsPage class and use its methods to perform actions on the page
  leadsPage = new LeadsPage(page)
  // visit
  await leadsPage.visit();

});

test("Cadastrar um lead com sucesso na fila de espera", async ({ page }) => {
  // Instantiate the LeadsPage class and use its methods to perform actions on the page
  // const leadsPage = new LeadsPage(page);
  await leadsPage.visit();
  await leadsPage.openLeadModal();
  await leadsPage.submitLeadForm("Gabriel Oliveira", "teste@test.com");

  const message = "nossa equipe entrará em contato";
  await leadsPage.toastHaveText(message);
});

test("Não deve cadastrar com email incorreto", async ({ page }) => {
  await leadsPage.visit();
  await leadsPage.openLeadModal();
  await leadsPage.submitLeadForm("Gabriel Oliveira", "testetest.cox");
  await leadsPage.alertHaveText("Email incorreto");
});

test("Não deve cadastrar quando o Nome não é preenchido", async ({ page }) => {

  await leadsPage.visit();
  await leadsPage.openLeadModal();
  await leadsPage.submitLeadForm("", "teste@test.com");
  await leadsPage.alertHaveText("Campo obrigatório");
});

test("Não deve cadastrar quando o email não é preenchido", async ({ page }) => {
  await leadsPage.visit();
  await leadsPage.openLeadModal();
  await leadsPage.submitLeadForm("Gabriel Oliveira", "");
  await leadsPage.alertHaveText("Campo obrigatório");
});

test("Não deve cadastrar quando nenhum campo é preenchido", async ({page,}) => {
  const leadsPage = new LeadsPage(page);
  
  await leadsPage.visit();
  await leadsPage.openLeadModal();
  await leadsPage.submitLeadForm("", "");

  // This will check both alerts at once. Best for to avoid duplication.
  // This is useful when both fields are required and you want to ensure both alerts are displayed using a single assertion (array)
  await leadsPage.alertHaveText([
    "Campo obrigatório", 
    "Campo obrigatório"
  ]);

});
