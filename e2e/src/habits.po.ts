import { browser, by, element } from "protractor";

export class HabitsPage {
  navigateTo() {
    return browser.get(`${browser.baseUrl}/habits`) as Promise<any>;
  }

  getTitleText() {
    return element(by.id("currentPage")).getText() as Promise<string>;
  }

  createHabit() {
    element(by.id("create-habit-button")).click();
    element(by.name("title")).sendKeys("Read 10 pages");
    element(by.name("startDate")).sendKeys("2021-04-10");
    element(by.cssContainingText("option", "Normal")).click();
    element(by.cssContainingText("option", "Daily")).click();
    element(by.name("color")).sendKeys("rgb(193,243,35)");
    element(by.className("modal-footer")).click();
    element(by.id("save-habit")).click();
  }

  isHabitTableAppear() {
    return element(by.id("habits-table")).isDisplayed();
  }

  isHabitImageAppear() {
    return element(by.id("habit-img")).isDisplayed();
  }

  makeHabitDone() {
    element(by.id("habitDone")).click();
    element(by.className("swal2-confirm")).click();
    return;
  }

  removeHabit() {
    element(by.id("habit-remove")).click();
    element(by.className("swal2-confirm")).click();
    return;
  }
}
