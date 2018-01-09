const puppeteer = {
  headless: false,
};
if (process.env.PUPPETEER_DISABLE_SANDBOX === 'true') {
  puppeteer.args = ['--no-sandbox', '--disable-setuid-sandbox', '--enable-logging', '--v=1'];
}

module.exports = {
  puppeteer,
};
