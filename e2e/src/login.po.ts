import { browser, by, element } from "protractor";

export class LoginPage {
  private credentias = {
    email: "gazrobur@gmail.com",
    password: "waqw8wwtt",
  };

  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  navigateToHabits() {
    return browser.get(`${browser.baseUrl}/habits`) as Promise<any>;
  }

  getUrl() {
    return browser.getCurrentUrl() as Promise<string>;
  }

  fillCredentials(credentias: any = this.credentias) {
    element(by.css("input[type=email]")).sendKeys(credentias.email);
    element(by.css("input[type=password]")).sendKeys(credentias.password);
    element(by.css("button[type=submit]")).click();
  }

  getNavbarImg() {
    return element(by.css(".navbar-brand-img")).isPresent();
  }

  getErrorMessage() {
    return element(by.css(".alert-danger")).isPresent();
  }
}
