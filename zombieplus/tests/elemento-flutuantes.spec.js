// line 36
import { test, expect } from "@playwright/test";


test("Cadastrar um lead na fila de espera", async ({ page }) => {
 // go to the page
  await page.goto("http://localhost:3000/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Zombie+/);

  // click element with text

  await page.getByRole("button", { name: /Aperte o play/ }).click();

  // input text with locator id="name"
  await page.locator("input[name=name]").fill("Gabriel Oliveira");

  // input text whith id email
  await page.locator("#email").fill("test@test.com");

  // expect the modal with id "modal" to be visible with heading "Fila de espera"
  await expect(page.getByTestId('modal').getByRole('heading')).toHaveText("Fila de espera");
  // or simply

  // await expect(page.getByTestId('modal')).getByRole( heading, { name: 'Quero entrar na fila!'});
  // page.getByRole

  // should contain text "Fila de espera"
  await expect(page.locator("//h2[.='Fila de espera']")).toBeVisible();

  // click button with text "Quero entrar na fila!" int the modal with id "modal"
  await page.getByTestId("modal")
  .getByRole("button", { name: "Quero entrar na fila!" }).click();
 
  // get part of the text in the modal
  // await page.getByText("Nossa equipe entrará em contato").click();

  // this will log the entire HTML content of the page to the console use this if the element close to fast
  // await page.content().then((content) => {
  //   console.log("Page content:", content);
  // });

  await expect(page.locator("div[class='toast']")).toContainText([
    "nossa equipe entrará em contato",
  ]);

  // screenshot the page
  // await page.screenshot({ path: 'screenshot-lead.png', fullPage: true});

  // element with class "toast" should be hidden after 5 seconds
  await expect(page.locator("div[class='toast']")).toBeHidden({
    timeout: 2000,
  });

  await page.waitForTimeout(5000);

});

