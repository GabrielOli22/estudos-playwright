import { expect } from "@playwright/test";

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.loginEmail = page.locator("input[type='text']");
    this.loginPassword = page.locator("input[type='password']");
    this.loginButton = page.getByRole("button", { name: "Entrar" });
    this.emailErrorMessage = page.locator("span[class='email-alert']");
    this.passwordErrorMessage = page.locator("span[class='password-alert']");
  }

  async visit() {
    await this.page.goto("http://localhost:3000/admin/login");
  }

  async openLoginModal() {
    await expect(this.page).toHaveURL(/admin\/login/);
    await expect(this.page.locator(".login-form")).toBeVisible();
  }

  async submitLogin(email, password) {
    await this.loginEmail.fill(email);
    await this.loginPassword.fill(password);

    await this.loginButton.click();
  }

  async alertErrorLogin(message) {
    
    await expect(this.emailErrorMessage).toContainText(message);
  }

  async alertPasswordErrorLogin(message) {
    await expect(this.passwordErrorMessage).toContainText(message);
  }

  async SucessLogin(message) {
    this.LoginSuccessMessage = page.locator("div[class='toast']");
    await expect(this.LoginSuccessMessage).toContainText(message);
  }
}