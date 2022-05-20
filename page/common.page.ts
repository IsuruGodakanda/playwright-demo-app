import { Page } from "playwright";

export default class CommonFunctions {
  private page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  toaster = async () =>
    await this.page.waitForSelector("div[role='alertdialog']");

  public async clickAlertDialog() {
    const ele = await this.toaster();
    await ele?.click();
  }
}
