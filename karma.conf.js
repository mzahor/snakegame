const webpackConfig = require('./webpack.config.js');
const isTravis = !!process.env.TRAVIS;

const preprocessors = ['webpack', 'sourcemap'];
const reporters = ['progress'];
let browsers = ['Chrome'];
let autoWatch = true;

if (isTravis) {
  preprocessors.push('coverage');
  reporters.push('coverage');
  browsers = ['PhantomJS'];
  autoWatch = false;
}

module.exports = function (config) {
  config.set({
    basePath: '',
    webpack: {
      context: __dirname,
      resolve: {
        extensions: ['.js', '.ts', '.tsx']
      },
      module: {
        rules: [
          { test: /\.tsx?$/, loader: 'ts-loader' }
        ]
      },
      stats: {
        colors: true,
        modules: true,
        reasons: true,
        errorDetails: true
      },
      devtool: 'inline-source-map',
    },
    frameworks: ['jasmine'],
    files: [
      '**/*.spec.ts'
    ],
    exclude: [
    ],
    preprocessors: {
      '**/*.spec.ts': preprocessors,
    },
    mime: { 'text/x-typescript': ['ts', 'tsx'] },
    reporters: reporters,
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: autoWatch,
    browsers: browsers,
    singleRun: !autoWatch,
    concurrency: Infinity,
  })
}
