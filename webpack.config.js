const webpack = require('webpack');
const path = require('path');

// Additional Webpack Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');

// And some CSS plugins
const precss = require('precss');
const autoprefixer = require('autoprefixer');

module.exports = {
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    filename: 'app.js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
  ],
  module: {
    rules: [
      // .JS(X)? Files. Run them through Babel with it's env-preset targeting
      // what the last 2 versions of the major browser support.
      // We also optionally add a react-hot-loader plugin that helps with
      // getting the hot-reloading working as well as possible.
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        query: {
          presets: [
            ['env', { targets: { browsers: ['last 2 versions'] }, modules: false }],
            'stage-3',
            'react',
          ],
          plugins: [
            'transform-class-properties',
          ].filter(i => !!i),
        },
      },
      // For SCSS-files, we run them through the loaders that Bootstrap 4 recommends
      {
        test: /\.(scss)$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: { plugins: () => [precss, autoprefixer] },
          },
          { loader: 'sass-loader' },
        ],
      },
      // And plain CSS-files, we just
      {
        test: /\.(css)$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
        ],
      },

    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    port: 3000,
    contentBase: path.join(__dirname, 'dist'),
    publicPath: '/',
  }
};
