import { browser } from "protractor";
import { HabitsPage } from "./habits.po";

describe("Habit tracker - Habits page", () => {
  let habitsPage: HabitsPage;

  beforeEach(() => {
    habitsPage = new HabitsPage();
  });

  it("when user logged in he/she able to navigate to /habits", () => {
    habitsPage.navigateTo();
    expect(habitsPage.getTitleText()).toEqual("HABITS");
  });

  it("should able to create habit", () => {
    habitsPage.createHabit();
    expect(habitsPage.isHabitTableAppear()).toBeTruthy();
  });

  it("should able to make habit done", () => {
    habitsPage.makeHabitDone();
    expect(habitsPage.isHabitImageAppear()).toBeTruthy();
  });

  it("should able to create habit again", () => {
    habitsPage.createHabit();
    expect(habitsPage.isHabitTableAppear()).toBeTruthy();
  });

  it("should able to remove habit", () => {
    habitsPage.removeHabit();
    expect(habitsPage.isHabitImageAppear()).toBeTruthy();
  });
});
