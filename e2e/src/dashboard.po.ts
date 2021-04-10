import { browser, by, element } from "protractor";

export class DashboardPage {
  navigateTo() {
    return browser.get(`${browser.baseUrl}dashboard`);
  }

  getTitleText() {
    return element(by.id("currentPage")).getText() as Promise<string>;
  }

  getAllNumberOfHabitsForToday() {
    return element(by.id("number-of-habits")).getText() as Promise<string>;
  }

  getNumberOfHabitsToDo() {
    return element(
      by.id("number-of-habits-to-do")
    ).getText() as Promise<string>;
  }

  getAllTodosForToday() {
    return element(by.id("number-of-todos")).getText() as Promise<string>;
  }

  getUndoneTodos() {
    return element(
      by.id("number-of-undone-todos")
    ).getText() as Promise<string>;
  }
}
