const replace = require('rollup-plugin-replace');
const resolve = require('rollup-plugin-node-resolve');

module.exports = function setConfig(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: [
      'mocha',
      'chai',
      'chai-as-promised',
      'sinon-chai',
      'chai-dom',
    ],


    // list of files / patterns to load in the browser
    files: [
      { pattern: 'site/**/*.spec.js', watched: false },
    ],


    // list of files / patterns to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'site/**/*.js': ['babel', 'rollup'],
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],

    coverageReporter: {
      dir: 'coverage',
      reporters: [
        { type: 'text-summary' },
        { type: (process.env.TRAVIS) ? 'lcovonly' : 'html', subdir: '.' },
      ],
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR
    //  || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [
      'Firefox',
    ],

    client: {
      mocha: {
        reporter: 'html',
      },
    },

    babelPreprocessor: {
      options: {
        plugins: ['istanbul'],
      },
    },

    // TODO: avoid duplication with rollup.config.js
    rollupPreprocessor: {
      output: {
        format: 'iife',
        name: 'PrimeImageTest',
        sourcemap: 'inline',
      },

      plugins: [
        replace({
          exclude: [],
          values: {
            // for redux
            'process.env.NODE_ENV': JSON.stringify('development'),
          },
        }),
        resolve({
          module: true,
          jsnext: true,
          main: false,
          browser: true,
          modulesOnly: true,
        }),
      ],
    },

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,
  });
};
