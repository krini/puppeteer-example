const { expect } = require('chai');
const { test } = require('../browser');

describe('Hello world', () => {
  describe('open the startpage', () => {
    it('should return the main page', test(async (browser, opts) => {
      const expectedHeading = 'Hello World';

      const page = await browser.newPage();
      page.setViewport({width: 1100, height: 800});

      await page.goto(`${opts.appUrl}`, {waitUntil: 'networkidle2'});

      // test page is loaded and contains 3 dashboard headings
      const heading = await page.evaluate(() => {
        const element = document.getElementsByTagName('h1')[0].innerHTML;
        return element;
      });

      await page.screenshot({path: './test/screenshots/dashboard.png'});

      page.close();
      expect(expectedHeading).to.eql(heading);
    }));
  });
});
