import { browser, by, element } from "protractor";

export class ProfilePage {
  navigateTo() {
    return browser.get(`${browser.baseUrl}user-profile`);
  }

  getHeaderText() {
    return element(by.css("h1")).getText() as Promise<string>;
  }

  getEmail() {
    return element(by.css("input[type=email]")).getText() as Promise<string>;
  }
}
