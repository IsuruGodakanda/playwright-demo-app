import { chromium } from "@playwright/test";

describe("Launch browser", () => {
  test("open Letcode", async () => {
    const browser = await chromium.launch({
      headless: false,
    });
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://Letcode.in/");
    await browser.close();
  });
});
