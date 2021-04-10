import { browser, by, element } from "protractor";

export class LogoutPage {
  navigateToHabits() {
    return browser.get(`${browser.baseUrl}habits`) as Promise<any>;
  }

  navigateToLogin() {
    return browser.get(`${browser.baseUrl}login`) as Promise<any>;
  }

  navigateToTodos() {
    return browser.get(`${browser.baseUrl}todos`) as Promise<any>;
  }

  getUrl() {
    return browser.getCurrentUrl() as Promise<string>;
  }

  logout() {
    return element(by.id("logout")).click();
  }
}
