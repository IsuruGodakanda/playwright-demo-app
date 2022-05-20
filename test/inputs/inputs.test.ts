import { Browser, BrowserContext, chromium, Page } from "playwright";

describe("Learn how to handle input fields", () => {
  let browser: Browser;
  let context: BrowserContext;
  let page: Page;

  beforeAll(async () => {
    browser = await chromium.launch({
      headless: false,
    });
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto("https://Letcode.in/edit");
  });

  test("enter your full name", async () => {
    // await page.type("id=fullName", "Koushik Chatterjee");
    const name = await page.$("#fullName"); // CSS selector as locator
    // if (name != null) {
    //   name.type("");
    // }
    await name?.type("Koushik Chatterjee"); // Optional chaining
  });

  test("append a text and press keyboard tab", async () => {
    const join = await page.$("#join");
    await join?.focus();
    await page.keyboard.press("End");
    await join?.type(" Human");
    // await join?.fill(" Human")
  });

  test("what is inside the text box", async () => {
    const text = await page.getAttribute("id=getMe", "value");
    console.log(text);
  });

  test("clear the text", async () => {
    await page.fill("//input[@value='Koushik Chatterjee']", "");
  });

  afterAll(async () => {
    await page.close();
    await context.close();
    await browser.close();
  });
});
