import { Page } from "puppeteer";

const options = { 
  timeout: 1000, 
  waitUntil: 'domcontentloaded'
}; 

export const extractString = async (
  page: Page,
  selector: string,
  context: string,
  withOptions: Parameters<Page['waitForSelector']>[1] = options,
): Promise<string | null> => {
  try {
    await page.waitForSelector(selector, withOptions);
    return await page.$eval(selector, (el) => el.textContent);
  } catch (error) {
    console.log(`[Error]${context} ❌ The selector ${selector} was not found on the page ${page.url()}`);
    return null
  }
};

export const extractDom = async (
  page: Page,
  selector: string,
  context: string,
  withOptions: Parameters<Page['waitForSelector']>[1] = options,
): Promise<string | null> => {
  try {
    await page.waitForSelector(selector, withOptions);
    const content = await page.$eval(selector, (el) => el.textContent);
    const formatedContent = content?.replace(/(\r\n|\n|\r|\t)/gm,'').replace(/\s+/g,' ').trim();

    return formatedContent ?? null;
  } catch (error) {
    console.log(`[Error]${context} ❌ The selector ${selector} was not found on the page ${page.url()}`);
    return null
  }
};


export const extractHref = async (
  page: Page,
  selector: string,
  context: string,
  withOptions: Parameters<Page['waitForSelector']>[1] = options,
): Promise<string | null> => {
  try {
    await page.waitForSelector(selector, withOptions);
    return await page.$eval(selector, (el) => (el as HTMLAnchorElement).href);
  } catch (error) {
    console.log(`[Error]${context} ❌ The selector ${selector} was not found on the page ${page.url()}`);
    return null
  }
};

export const extractHrefs = async (
  page: Page,
  selector: string,
  context: string,
  withOptions: Parameters<Page['waitForSelector']>[1] = options,
): Promise<string[] | null> => {
  try {
    await page.waitForSelector(selector, withOptions);
    return await page.$$eval(selector, 
      (els) => els.map((el) => (el as HTMLAnchorElement).href)
    );
  } catch (error) {
    console.log(`[Error]${context} ❌ The selector ${selector} was not found on the page ${page.url()}`);
    return null
  }
};