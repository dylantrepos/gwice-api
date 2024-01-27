import { Page } from "puppeteer";

const options = { 
  timeout: 1000, 
  waitUntil: 'domcontentloaded'
}; 

export const extractDescriptionData = async (
  page: Page,
  selector: string,
): Promise<string[] | null> => {
  try {
    await page.waitForSelector(selector, options);
    const data = await page.$$eval(
      selector,
      (els) => els.map((el) => {
        const text = el.textContent ?? '';
        return text.includes('\n') ? text.split('\n').map(sentence => sentence.trim()).filter(elt => elt.length > 0) : [text];
      })
    );
    return data.flat();
  } catch (error) {
    console.log(`[Error][getEventDetails][Event] ❌ The selector ${selector} was not found on the page ${page.url()}`);
    return null
  }
};

export const extractImageSrc = async (
  page: Page,
  selector: string,
): Promise<string | null> => {
  try {
    await page.waitForSelector(selector, options);
    return await page.$eval(
      selector,
      (el) => (el as HTMLImageElement).currentSrc
    );
  } catch (error) {
    console.log(`[Error][getEventDetails][Event] ❌ The selector ${selector} was not found on the page ${page.url()}`);
    return null
  }
};

export const extractAdressData = async (
  page: Page,
  selector: string,
): Promise<string[] | null> => {
  try {
    await page.waitForSelector(selector, options);
    const data = await page.$$eval(
      selector,
      (els) => els.map((el) => {
        const text = el.textContent
        if (!text || text.length < 1) return null;
        return text.replace(/\n/g, '');
      }).filter((el): el is string => el !== null)
    );
    return data.length > 0 ? data : null;
  } catch (error) {
    console.log(`[Error][getEventDetails][Event] ❌ The selector ${selector} was not found on the page ${page.url()}`);
    return null
  }
};

export const extractHoursData = async (
  page: Page,
  selector: string,
): Promise<string[] | null> => {
  try {
    await page.waitForSelector(selector, options);
    const hoursElt = await page.$(selector);
    const hours = await page.evaluate(hoursElt => hoursElt?.innerHTML.split('<br>').filter(hour => hour.trim() !== ''), hoursElt);
    return hours ?? null;
  } catch (error) {
    console.log(`[Error][getEventDetails][Event] ❌ The selector ${selector} was not found on the page ${page.url()}`);
    return null
  }
};

