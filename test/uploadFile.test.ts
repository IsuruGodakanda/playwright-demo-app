import { chromium } from "playwright";
import path from "path";

describe("Upload file", () => {
  const filePath0 = path.join(__dirname, "../videos/a.webm");
  const filePath1 = path.join(__dirname, "../videos/b.webm");

  test("upload using on function - event listner", async () => {
    const browser = await chromium.launch({
      headless: false,
    });
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://the-internet.herokuapp.com/upload");
    page.on("filechooser", async (filechooser) => {
      // await filechooser.isMultiple();
      await filechooser.setFiles([filePath0, filePath1]);
    });

    await page.click(".example + div#drag-drop-upload", { force: true });
  });

  xtest("upload file using set input files", async () => {
    const browser = await chromium.launch({
      headless: false,
    });
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://www.sendgb.com/");
    await page.setInputFiles("input[name='qqfile']", filePath0);

    // If want to upload multiple file
    // await page.setInputFiles("input[name='qqfile']", [filePath0, filePath1]);

    await browser.close();
  });
});
