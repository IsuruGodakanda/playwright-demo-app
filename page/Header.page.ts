import { Page, Locator } from "@playwright/test";

export default class HeaderPage {
  readonly page: Page;
  readonly getLoginBtn: Locator;
  readonly getSignOutBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.getLoginBtn = page.locator("a", { hasText: "Log in" });
    this.getSignOutBtn = page.locator("a", { hasText: "Sign out" });
  }

  // locators

  public get eleLoginBtn() {
    const loginBtn = this.getLoginBtn;
    if (loginBtn != null) {
      return loginBtn;
    } else throw new Error("No Element");
  }

  public get eleSignOutBtn() {
    const signoutEle = this.getSignOutBtn;
    if (signoutEle != null) {
      return signoutEle;
    } else throw new Error("No Element");
  }

  public async clickLoginLink() {
    await Promise.all([
      this.page.waitForNavigation({
        waitUntil: "domcontentloaded",
      }),
      this.getLoginBtn.click(),
    ]);
  }

  public async clickSignOutLink() {
    const ele = await this.eleSignOutBtn;
    await ele?.click();
  }
}
