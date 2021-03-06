import {
  test,
  Browser,
  BrowserContext,
  Page,
  chromium,
} from "@playwright/test";

test.describe("Search Git Repo", () => {
  let browser: Browser;
  let context: BrowserContext;
  let page: Page;
  test.beforeAll(async () => {
    browser = await chromium.launch({
      headless: false,
    });
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto("https://letcode.in/elements");
  });

  // Screenshots types
  // Full page
  // Capture into Buffer
  // Element

  test("enter Git username and print all the repos", async () => {
    const header = await page.locator("nav[role='navigation']");
    header?.screenshot({ path: "./screenshots/header.png" });
    const ele = await page.locator("input[name='username']");
    await ele?.fill("desilvawatp");
    await ele?.press("Enter");

    await page.waitForSelector("app-gitrepos ol li", { timeout: 5000 }); // Auto wait not effected to multiple elements
    const repos = await page.$$("app-gitrepos ol li");
    console.log(repos.length);
    // for await
    // for await (const repo of repos) {
    //     console.log(await repo.innerText());
    // }
    // map
    const allUrls = await Promise.all(
      repos.map(async (repo, i) => {
        return await repo.innerText();
      })
    );
    console.log(allUrls);
    await page.screenshot({ path: "./screenshots/fs.png", fullPage: true });
  });

  test.afterEach(async () => {
    await page.screenshot({
      path: `./screenshots/${Date.now()}screenshot1.png`,
    });
  });

  test.afterAll(async () => {
    await page.close();
    await context.close();
    await browser.close();
  });
});
