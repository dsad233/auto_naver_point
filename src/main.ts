import { NAVER_ID, NAVER_PASS } from "./common/configs/key";
import { wrapper } from "./common/middlewares/wrapper";
import { Service } from "./common/service";
import { delay } from "./common/utils";

async function main(): Promise<void> {
  const { browser, page } = await Service.init();

  await page.goto("https://www.naver.com", {
    waitUntil: "networkidle2",
  });

  await delay(3000);

  console.log("------로그인 페이지 이동 버튼 클릭------");
  const moveLoginPageBtn = await page.$(
    "#account > div > a.MyView-module__link_login___VlF7z",
  );

  if (!moveLoginPageBtn) {
    await Service.close(browser, page);
    throw new Error("네이버 로그인 버튼을 찾을 수 없습니다.");
  } else {
    await moveLoginPageBtn.click();
  }

  await delay(3000);

  console.log("------로그인 ID input 클릭------");
  const inputId = await page.$("input#id");

  if (!inputId) {
    await Service.close(browser, page);
    throw new Error("ID input 란이 존재하지 않습니다.");
  } else {
    await inputId.click();

    for (const prop of NAVER_ID) {
      await page.keyboard.type(prop, { delay: 2500 });
    }
  }

  console.log("------로그인 PW input 클릭------");
  const inputpw = await page.$("input#pw");

  if (!inputpw) {
    await Service.close(browser, page);
    throw new Error("PW input 란이 존재하지 않습니다.");
  } else {
    await delay(1500);

    await inputpw.click();

    for (const prop of NAVER_PASS) {
      await page.keyboard.type(prop, { delay: 2500 });
    }
  }

  console.log("------로그인 버튼 클릭------");
  const loginBtn = await page.$("#loginBtn_row");

  if (!loginBtn) {
    await Service.close(browser, page);
    throw new Error("로그인 버튼이 존재하지 않습니다.");
  } else {
    await delay(1500);

    await loginBtn.click();
  }

  await delay(3000);

  console.log("------페이 버튼 클릭------");
  const payBtn = await page.$(
    "#account > div.MyView-module__my_menu___tIdbw.MyView-module__is_open___nHt0W > div > div > ul > li.MyView-module__menu_item___ZOGCU.MyView-module__is_selected___mhOgd > a",
  );

  if (!payBtn) {
    await Service.close(browser, page);
    throw new Error("페이(Pay) 버튼이 존재하지 않습니다.");
  } else {
    await delay(1500);
    await payBtn.click();
  }

  await delay(3000);

  console.log("------페이 페이지 이동 버튼 클릭------");
  const movePayPageBtn = await page.$(
    "#account > div.MyView-module__layer_menu_service___KY4cJ > div.MyView-module__service_sub___KAoIp > div > a:nth-child(1)",
  );

  if (!movePayPageBtn) {
    await Service.close(browser, page);
    throw new Error("페이(Pay) 버튼이 존재하지 않습니다.");
  } else {
    await delay(1500);
    await movePayPageBtn.click();
  }

  await delay(3000000);

  // await Service.close(browser, page);
}

// wrapper(main);
await main();
