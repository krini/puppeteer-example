const WebpackDevServer = require('webpack-dev-server'); // eslint-disable-line import/no-extraneous-dependencies
const webpack = require('webpack'); // eslint-disable-line import/no-extraneous-dependencies
const portfinder = require('portfinder'); // eslint-disable-line import/no-extraneous-dependencies

const browser = require('./browser');
const options = require('./options');
const webpackConfig = require('../webpack.config.js');

let server = null;
before(function before(done) { // can't use arrow function, because we need to set a bigger timeout for before hook.
  this.timeout(100000);
  // Find an unused port
  portfinder.getPort((err, port) => {
    if (err) {
      throw new Error(err);
    }
    console.log(`getPort started, found port: ${port}`); // eslint-disable-line no-console
    options.appUrl = `http://localhost:${port}`;
    const compiler = webpack(webpackConfig);
    compiler.plugin('done', () => {
      console.log('webpack server started'); // eslint-disable-line no-console
      browser.setOptions(options);
      browser.setUp(done);
    });
    // Spin up the webpack dev server
    server = new WebpackDevServer(compiler, {
      hot: false,
      quiet: false,
    });

    console.log('webpack server starting'); // eslint-disable-line no-console
    server.listen(port, 'localhost', function (error) {
      if (error) {
        console.log(error);
      }
      console.log('WebpackDevServer listening at localhost:', port);
    });
  });
});

after(() => {
  if (server) {
    console.log('closing down server')
    server.close();
  }
  console.log('closing browser')
  browser.close();
});

beforeEach(() => {

});

afterEach(() => {

});
