import {
  test,
  expect,
  Browser,
  BrowserContext,
  Page,
  firefox,
} from "@playwright/test";

test.describe("Launch local browser", () => {
  let browser: Browser;
  let context: BrowserContext;
  let page: Page;
  test.beforeAll(async () => {
    browser = await firefox.launch({
      headless: false,
      // channel: "msedge" // If this not suggest browsers please install playwright globaly
      // executablePath: "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe"
    });
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto("https://letcode.in/");
  });

  test("Goto letcode and verify title as LetCode with Koushik", async () => {
    const title = await page.title();
    console.log(title);
    expect(title).toBe("LetCode with Koushik");
  });

  test.afterAll(async () => {
    await browser.close();
  });
});
