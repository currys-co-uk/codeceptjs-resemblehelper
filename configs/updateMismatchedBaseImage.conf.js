require('ts-node/register');
const { setHeadlessWhen } = require('@codeceptjs/configure');

// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

exports.config = {
  tests: '../tests/updateMismatchedBaseImage_test.ts',
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
      baseFolder: '../tests/mismatchedScreenshots/mismatchedBase/',
      diffFolder: '../tests/mismatchedScreenshots/mismatchedDiff/',
      updateMismatchedBaseImage: true,
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
