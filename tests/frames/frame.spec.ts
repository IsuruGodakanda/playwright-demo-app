import {
  test,
  Browser,
  BrowserContext,
  Page,
  chromium,
} from "@playwright/test";

test.describe("Frames handling concept", () => {
  let browser: Browser;
  let context: BrowserContext;
  let page: Page;
  test.beforeAll(async () => {
    browser = await chromium.launch({
      headless: false,
    });
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto("https://letcode.in/frame");
  });

  test("interact with frames", async () => {
    // Frame: HTML within a HTML
    const frame = page.frame({ name: "firstFr" });
    // frame?.fill("")
    if (frame != null) {
      await frame.fill("input[name='fname']", "Tharushi");
      await frame.fill("input[name='lname']", "De Silva");

      // inner frame
      const frames = frame.childFrames();
      console.log("No. of inner frames: " + frames.length);
      if (frames != null)
        await frames[0].fill("input[name='email']", "playwrightdemo@gmail.com");
      else {
        console.log("Wrong frame");
      }
      const parent = frames[0].parentFrame();
      // await frame.fill("input[name='lname']", "Letcode");
      await parent?.fill("input[name='lname']", "Youtube");
    } else throw new Error("No such frame");
  });

  test.afterAll(async () => {
    await page.close();
    await context.close();
    await browser.close();
  });
});
