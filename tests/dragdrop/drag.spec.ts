import {
  test,
  Browser,
  BrowserContext,
  Page,
  chromium,
} from "@playwright/test";

test.describe("Drag and Drop", () => {
  let browser: Browser;
  let context: BrowserContext;
  let page: Page;
  test.beforeAll(async () => {
    browser = await chromium.launch({
      headless: false,
    });
    context = await browser.newContext();
    page = await context.newPage();
  });

  test("drag and drop window", async () => {
    await page.goto("https://letcode.in/dropable");
    const src = await page.locator("#draggable");
    const dst = await page.locator("#droppable");
    if (src && dst) {
      const srcBound = await src.boundingBox(); // boundingBox give the X,Y and width, height of element
      const dstBound = await dst.boundingBox();
      if (srcBound && dstBound) {
        await page.mouse.move(
          srcBound.x + srcBound.width / 2,
          srcBound.y + srcBound.height / 2
        );
        await page.mouse.down();
        await page.mouse.move(
          dstBound.x + dstBound.width / 2,
          dstBound.y + dstBound.height / 2
        );
        await page.mouse.down();
      } else {
        throw new Error("No Element");
      }
    }
  });

  test("drag and drop frame", async () => {
    await page.goto("https://jqueryui.com/droppable/");
    // switch to frame
    const frame = page.frame({
      url: "https://jqueryui.com/resources/demos/droppable/default.html",
    });
    if (frame) {
      const src = await frame.locator("#draggable");
      const dst = await frame.locator("#droppable");
      if (src && dst) {
        const srcBound = await src.boundingBox();
        const dstBound = await dst.boundingBox();
        if (srcBound && dstBound) {
          // frame don't have mouse events
          await page.mouse.move(
            srcBound.x + srcBound.width / 2,
            srcBound.y + srcBound.height / 2
          );
          await page.mouse.down();
          await page.mouse.move(
            dstBound.x + dstBound.width / 2,
            dstBound.y + dstBound.height / 2
          );
          await page.mouse.down();
        } else {
          throw new Error("No Element");
        }
      }
    }
  });

  test.afterAll(async () => {
    await page.close();
    await context.close();
    await browser.close();
  });
});
