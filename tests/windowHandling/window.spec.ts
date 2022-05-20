import { Browser, BrowserContext, Page, chromium } from "@playwright/test";

describe("Window handling", () => {
  let browser: Browser;
  let context: BrowserContext;
  let page: Page;
  beforeAll(async () => {
    browser = await chromium.launch({
      headless: false,
    });
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto("https://letcode.in/windows");
  });

  test("home Page", async () => {
    console.log(await page.title());
    expect(await page.title()).toBe("Window handling - LetCode");
  });

  xtest("single page handling", async () => {
    const [newWindow] = await Promise.all([
      context.waitForEvent("page"), // Wait for listner, that we got new page or not
      await page.click("#home"),
    ]);
    await newWindow.waitForLoadState(); // Wait until page load in seperate tab completely
    expect(newWindow.url()).toContain("test");
    await newWindow.click('"Log in"');
    await newWindow.waitForNavigation(); // Wait until page navigation
    expect(newWindow.url()).toContain("signin");
    // await newWindow.close(); // Closed newly created window
    await page.bringToFront(); // Bring the focus to current tab
    await page.click('"LetXPath"');
  });

  test("multipage handling", async () => {
    const [multipage] = await Promise.all([
      context.waitForEvent("page"),
      await page.click("#multi"),
    ]);
    await multipage.waitForLoadState();
    const allwindows = page.context().pages();
    console.log("no.of windows: " + allwindows.length);
    allwindows.forEach((page) => {
      console.log(page.url());
    });
    await allwindows[1].bringToFront();
    allwindows[1].on("dialog", (dialog) => {
      console.log("Message: " + dialog.message());
      dialog.accept();
    });
    await allwindows[1].click("id=accept");
  });

  afterAll(async () => {
    await page.close();
    await context.close();
    await browser.close();
  });
});
