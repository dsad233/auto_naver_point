import { Browser, Page } from "puppeteer";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

export class Service {
  private constructor() {}

  static async init(): Promise<{ browser: Browser; page: Page }> {
    // 헤더 우회 설정
    puppeteer.use(StealthPlugin());
    const browser = await puppeteer.launch({
      headless: false,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    // 한국 시간 설정
    await page.emulateTimezone("Asia/Seoul");

    // Geolocation 서울로 지정
    await page.setGeolocation({ latitude: 37.5665, longitude: 126.978 });

    // 헤더 정밀 설정
    await page.setExtraHTTPHeaders({
      "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.8",
      Referer: "https://www.coupang.com/",
      Connection: "keep-alive",
    });

    // 브라우저 사이즈 조절 (1920 x 1080)
    await page.setViewport({
      width: 1920,
      height: 1080,
    });

    console.log("puppeteer 초기화 완료.");

    return { browser: browser, page: page };
  }

  static async close(browser: Browser, page: Page): Promise<void> {
    await page.close();
    await browser.close();

    console.log("puppeteer 종료.");
  }

  // 스크린샷
  static async screenshot(page: Page): Promise<void> {
    await page.screenshot({ path: process.cwd() + "/" + "screenshot.png" });
    console.log("puppeteer 스크린샷 완료.");
  }
}
