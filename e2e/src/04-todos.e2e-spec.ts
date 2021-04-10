import { browser } from "protractor";
import { TodosPage } from "./todos.po";

describe("Habit tracker - Todos page", () => {
  let todosPage: TodosPage;

  beforeEach(() => {
    todosPage = new TodosPage();
  });

  it("when user logged in he/she able to navigate to /todos", () => {
    todosPage.navigateTo();
    expect(todosPage.getTitleText()).toEqual("TODOS");
  });

  it("should able to create todo", () => {
    todosPage.createTodo();
    expect(todosPage.isTodoTableAppear()).toBeTruthy();
  });

  it("should able to make todo done", () => {
    todosPage.makeTodoDone();
    expect(todosPage.isTodoImageAppear()).toBeTruthy();
  });

  it("should able to create todo again", () => {
    todosPage.createTodo();
    expect(todosPage.isTodoTableAppear()).toBeTruthy();
  });

  it("should able to remove todo", () => {
    todosPage.removeTodo();
    expect(todosPage.isTodoImageAppear()).toBeTruthy();
  });
});
