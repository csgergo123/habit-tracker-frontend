import { browser, protractor } from "protractor";
import { LoginPage } from "./login.po";

describe("Habit tracker - Login page", () => {
  let page: LoginPage;

  const wrongCredentials = {
    email: "wrongname@email.com",
    password: "wrongpasswd",
  };

  const goodCredentials = {
    email: "cs@g.hu",
    password: "Asd123",
  };

  beforeEach(() => {
    page = new LoginPage();
  });

  it("when unauthenticated user wants to navigate /habits it redirects to /login", () => {
    page.navigateToHabits();
    expect(page.getUrl()).toBe(`${browser.baseUrl}login`);
  });

  it('when user trying to login with wrong credentials he/she should stay on "login" page and see error notification', () => {
    page.navigateTo();
    page.fillCredentials(wrongCredentials);
    expect(page.getErrorMessage()).toBeTruthy();
  });

  it("when login is successful he/she should redirect to dashboard and the sidebar is appears", () => {
    page.navigateTo();
    page.fillCredentials(goodCredentials);
    expect(page.getNavbarImg()).toBeTruthy();
  });
});
