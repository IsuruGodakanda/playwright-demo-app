import { test, chromium } from "@playwright/test";

test.describe("Launch browser", () => {
  test("recorded script login", async () => {
    const browser = await chromium.launch({
      headless: false,
    });
    const context = await browser.newContext({
      recordVideo: {
        dir: "./videos/",
        size: {
          width: 800,
          height: 600,
        },
      },
    });
    const page = await context.newPage();

    // Go to https://letcode.in/
    await page.goto("https://letcode.in/");
    // Click text=Log in
    await page.locator("text=Log in").click();
    // Fill text=EmailPasswordLOGIN >> [placeholder="Enter registered email"]
    await page
      .locator(
        'text=EmailPasswordLOGIN >> [placeholder="Enter registered email"]'
      )
      .fill("koushik350@gmail.com");
    // Click text=EmailPasswordLOGIN >> [placeholder="Enter registered email"]
    await page
      .locator(
        'text=EmailPasswordLOGIN >> [placeholder="Enter registered email"]'
      )
      .click({
        modifiers: ["Control"],
      });
    // Press Tab
    await page
      .locator(
        'text=EmailPasswordLOGIN >> [placeholder="Enter registered email"]'
      )
      .press("Tab");
    // Fill [placeholder="Enter password"]
    await page.locator('[placeholder="Enter password"]').fill("Pass123$");
    // Click text=LOGIN
    await Promise.all([
      page.waitForNavigation(/*{ url: 'https://letcode.in/' }*/),
      page.locator("text=LOGIN").click(),
    ]);
    // Click div:has-text("Welcome Koushik Chatterjee") >> nth=2
    await page
      .locator('div:has-text("Welcome Koushik Chatterjee")')
      .nth(2)
      .click();
    // Click text=Sign out
    await page.locator("text=Sign out").click();

    await page.close();

    await context.close();
    await browser.close();
  });

  test("open Letcode", async () => {
    const browser = await chromium.launch({
      headless: false,
    });
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://Letcode.in/");
    await page.click("text=Log in");
    await page.fill("input[name='email']", "koushik350@gmail.com");
    await page.fill("input[name='password']", "Pass123$");
    await page.click('button:text("LOGIN")');
    await page
      .locator('div:has-text("Welcome Koushik Chatterjee")')
      .nth(2)
      .click();
    await page.click('"Sign out"');
    await browser.close();
  });
});
