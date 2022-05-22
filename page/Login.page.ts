import { Page, Locator } from "@playwright/test";

export default class LoginPage {
  readonly page: Page;
  readonly getEmailTextField: Locator;
  readonly getPassTextField: Locator;
  readonly getLoginBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.getEmailTextField = page.locator("input[name='email']");
    this.getPassTextField = page.locator("input[name='password']");
    this.getLoginBtn = page.locator("button", { hasText: "LOGIN" });
  }

  eleEmailTextField = async () => await this.getEmailTextField;

  elePassTextField = async () => await this.getPassTextField;

  public get eleLoginBtn() {
    return this.getLoginBtn;
  }

  public async enterUserName(name: string) {
    const ele = await this.eleEmailTextField();
    if (ele != null) await ele.fill(name);
    else throw new Error("No element, hence failed");
  }

  public async enterUserPassword(pass: string) {
    const ele = await this.elePassTextField();
    await ele?.fill(pass);
  }

  public async clickLoginBtn() {
    const ele = await this.eleLoginBtn;
    await ele?.click();
  }
}
