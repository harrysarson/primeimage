module.exports = function (config) {
  config.set({

    basePath: '',

    frameworks: [
      'chai',
      'mocha'
    ],

    files: [
      'js-tests/**/*.spec.js'
    ],

    exclude: [
    ],

    preprocessors: {
      'js-tests/**/*.spec.js': ['webpack']
    },

    webpack: {
      mode: 'development'
    },

    reporters: [
      'progress',
      'mocha'
    ],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: ['Firefox'],

    singleRun: false,

    concurrency: Infinity
  });
};
