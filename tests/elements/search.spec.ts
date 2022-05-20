import { Browser, BrowserContext, Page, chromium } from "@playwright/test";

describe("Search Git Repo", () => {
  let browser: Browser;
  let context: BrowserContext;
  let page: Page;
  beforeAll(async () => {
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

  test("enter Git username", async () => {
    const header = await page.$("nav[role='navigation']");
    header?.screenshot({ path: "../../screenshots/header.png" });
    const ele = await page.$("input[name='username']");
    await ele?.fill("ortonikc");
    await ele?.press("Enter");
  });

  test("print all the repos", async () => {
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
    await page.screenshot({ path: "../../screenshots/fs.png", fullPage: true });
  });

  afterEach(async () => {
    await page.screenshot({
      path: `../../screenshots/${Date.now()}screenshot1.png`,
    });
  });

  afterAll(async () => {
    await page.close();
    await context.close();
    await browser.close();
  });
});
