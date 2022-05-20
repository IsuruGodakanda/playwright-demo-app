import { Browser, BrowserContext, chromium, Page } from "@playwright/test";

describe("Learn how to handle alert", () => {
  let browser: Browser;
  let context: BrowserContext;
  let page: Page;

  beforeAll(async () => {
    browser = await chromium.launch({
      headless: false,
    });
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto("https://letcode.in/alert");
  });

  test("handle dialogs", async () => {
    const ele = await page.$("#prompt");
    page.on("dialog", (dialog) => {
      console.log("Message: " + dialog.message());
      console.log("Default Value: " + dialog.defaultValue());
      console.log("Type: " + dialog.type());
      dialog.accept("hello koushik"); // If just want to accept: dialog.accept()
      // dialog.dismiss()
    });
    await ele?.click();
  });

  afterAll(async () => {
    await page.close();
    await context.close();
    await browser.close();
  });
});
