import { browser, by, element } from "protractor";

export class TodosPage {
  navigateTo() {
    return browser.get(`${browser.baseUrl}/todos`) as Promise<any>;
  }

  getTitleText() {
    return element(by.id("currentPage")).getText() as Promise<string>;
  }

  createTodo() {
    element(by.id("create-todo-button")).click();
    element(by.name("title")).sendKeys("Take the trash out");
    element(by.name("issueDate")).sendKeys("2021-04-10");
    element(by.name("color")).sendKeys("rgb(193,243,35)");
    element(by.className("modal-footer")).click();
    element(by.id("save-todo")).click();
    browser.sleep(1000);
  }

  isTodoTableAppear() {
    return element(by.id("todos-table")).isDisplayed();
  }

  isTodoImageAppear() {
    return element(by.id("todo-img")).isDisplayed();
  }

  makeTodoDone() {
    element(by.id("todoDone")).click();
    element(by.className("swal2-confirm")).click();
    return;
  }

  removeTodo() {
    element(by.id("todo-remove")).click();
    element(by.className("swal2-confirm")).click();
    return;
  }
}
