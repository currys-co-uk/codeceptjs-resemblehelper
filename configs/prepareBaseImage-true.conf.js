require('ts-node/register');
const { setHeadlessWhen } = require('@codeceptjs/configure');

// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

exports.config = {
  tests: '../tests/prepareBaseImage-true_test.+(j|t)s',
  output: '../output',
  helpers: {
    WebDriver: {
      url: 'http://localhost',
      host: 'selenoid',
      browser: 'chrome',
      windowSize: '1200x800',
    },
    ResembleHelper: {
      require: '../index.ts',
      screenshotFolder: '../tests/output/',
      baseFolder: '../tests/screenshots/base/',
      diffFolder: '../tests/screenshots/diff/',
      /*
      prepareBaseImage = Optional. When true then the system replaces all of the baselines related to the test case(s) you ran.
      This is equivalent of setting the option prepareBaseImage: true in all verifications of the test file.
      */
      prepareBaseImage: true,
    },
    AssertWrapper: {
      require: 'codeceptjs-assert',
    },
  },
  include: {},
  bootstrap: null,
  mocha: {},
  name: 'codeceptjs-resemblehelper',
  plugins: {
    selenoid: {
      enabled: true,
      deletePassed: true,
      autoCreate: false,
      autoStart: false,
      sessionTimeout: '30m',
      enableVideo: false,
      enableLog: true,
    },
    pauseOnFail: {},
    tryTo: {
      enabled: true,
    },
    screenshotOnFail: {
      enabled: true,
    },
  },
};
