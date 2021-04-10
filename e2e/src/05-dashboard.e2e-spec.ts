import { browser } from "protractor";
import { ProfilePage } from "./profile.po";

describe("Habit tracker - Profile", () => {
  let profilePage: ProfilePage;

  beforeEach(() => {
    profilePage = new ProfilePage();
  });

  it("should access to profile page", () => {
    profilePage.navigateTo();
    expect(profilePage.getHeaderText()).toContain("Hello");
  });

  it("should read profle properties", () => {
    expect(profilePage.getEmail()).length > 0;
  });
});
