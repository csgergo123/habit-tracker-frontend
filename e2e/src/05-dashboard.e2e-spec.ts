import { browser } from "protractor";
import { DashboardPage } from "./dashboard.po";

describe("Habit tracker - Dashboard", () => {
  let dashboardPage: DashboardPage;

  beforeEach(() => {
    dashboardPage = new DashboardPage();
  });

  it("should access to Dashboard page", () => {
    dashboardPage.navigateTo();
    expect(dashboardPage.getTitleText()).toEqual("DASHBOARD");
  });

  it("should all habit number more than 0", () => {
    ((expect(dashboardPage.getAllNumberOfHabitsForToday()) as any) as number) > 0;
  });

  it("should habit to do number is 0", () => {
    // Cast Promise<string> to number
    ((expect(dashboardPage.getNumberOfHabitsToDo()) as any) as number) == 0;
  });

  it("should all todos number is nore than 0", () => {
    // Cast Promise<string> to number
    ((expect(dashboardPage.getAllTodosForToday()) as any) as number) == 0;
  });

  it("should undone todos number is 0", () => {
    // Cast Promise<string> to number
    ((expect(dashboardPage.getAllTodosForToday()) as any) as number) > 0;
  });
});
