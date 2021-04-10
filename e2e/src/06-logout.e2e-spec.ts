import { browser } from "protractor";
import { LogoutPage } from "./logout.po";

describe("Habit tracker - Logout", () => {
  let page: LogoutPage;

  beforeEach(() => {
    page = new LogoutPage();
  });

  it("should logout", () => {
    expect(page.logout()).toBe(null);
  });

  it("should not access to /habits", () => {
    page.navigateToHabits();
    expect(page.getUrl()).toBe(`${browser.baseUrl}login`);
  });

  it("should not access to /todos", () => {
    page.navigateToTodos();
    expect(page.getUrl()).toBe(`${browser.baseUrl}login`);
  });
});
