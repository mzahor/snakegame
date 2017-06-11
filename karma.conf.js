const webpackConfig = require('./webpack.config.js');

module.exports = function (config) {
  config.set({
    basePath: 'src/app',
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
      '**/*.spec.ts': ['webpack', 'sourcemap'],
    },
    mime: { 'text/x-typescript': ['ts', 'tsx'] },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity,
  })
}
