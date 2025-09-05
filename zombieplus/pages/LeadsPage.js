import { expect } from "@playwright/test";

// Page Object Model (POM) is a design pattern that creates an object repository for web UI elements.
// The advantage of the model is that it reduces code duplication and improves test maintenance.
// Each web page in the application is represented by a class.
// The class contains the locators for the web elements and methods to interact with those elements.
export class LeadsPage {
  // constructor is called when the class is instantiated that means when an object is created from the class
  // this is where we initialize the properties of the class
  // properties are variables that belong to the class
  // pt-br dentro do page object do playwright é preciso montar o construtor para receber a página do teste e ter acesso aos elementos da página
  constructor(page) {
    this.page = page;
    this.leadButton = page.getByRole("button", { name: /Aperte o play/ })
    this.nameInput = page.locator("#name")
    this.emailInput = page.locator("#email")
    this.modalHeading = expect(page.getByTestId('modal').getByRole('heading')).toHaveText("Fila de espera")
    this.pageToast = page.locator("div[class='toast']")
    this.alertMessage = page.locator("span[class='alert']")
  }

  async visit() {
    await this.page.goto("http://localhost:3000/");
  }

  async openLeadModal() {
    await expect(this.page).toHaveTitle(/Zombie+/);
    await this.leadButton.click();

    await this.modalHeading;
    await expect(this.page.locator("//h2[.='Fila de espera']")).toBeVisible();
  }

  async submitLeadForm(name, email) {
     await this.nameInput.fill(name);
     await this.emailInput.fill(email);

     await this.page.getByTestId("modal").getByRole("button", { name: "Quero entrar na fila!" }).click();
  }

  async toastHaveText(message) {
  // get part of the text in the modal
  // await this.page.getByText(message).click();

  // this will log the entire HTML content of the page to the console use this if the element close to fast
  // await this.page.content().then((content) => {
  //   console.log("Page content:", content);
  // });

    await expect(this.pageToast).toContainText(message);
    await expect(this.pageToast).toBeHidden({timeout: 5000});
    // or
    // The difference between toBeHidden and not.toBeVisible is that toBeHidden checks if the element
    // is hidden but still present in the DOM, while not.toBeVisible checks if the element is not visible 
    // to the user, which includes being hidden or not present in the DOM at all.
    await expect(this.pageToast).not.toBeVisible({timeout: 5000});


  }

  async alertHaveText(targetMessage) {
    // Expect an error message to be visible
    await expect(this.alertMessage).toHaveText(targetMessage);
    // or
    // await expect(this.page.locator("span[class='alert']")).toContainText([targetMessage]);
    // page.getByText("Email incorreto");

    // this will log the entire HTML content of the page to the console use this if the element close to fast
  //   await expect(page.locator(".alert")).toHaveText([
  //   targetMessage,
  //   targetMessage
  // ]);
  }
}
