const puppeteer = require('puppeteer');

(async () => {
  // const browser = await puppeteer.launch();
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  page.setViewport({width: 1100, height: 800})
  await page.goto('https://stackoverflow.com/', {waitUntil: 'networkidle'});

  await page.focus('.js-search-field');

  // Type our query into the search bar
  await page.type('puppeteer');
  await page.screenshot({path: './screenshots/stackoverflow/ss1.png'});

  // Submit form
  const searchForm = await page.$('#search');
  await searchForm.evaluate(searchForm => searchForm.submit());

  // wait till search is done
  await page.waitForNavigation({waitUntil: 'networkidle'});

  await page.screenshot({path: './screenshots/stackoverflow/ss2.png'});

  browser.close();
})();
