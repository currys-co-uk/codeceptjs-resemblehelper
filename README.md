# @currys-co-uk/codeceptjs-resemblehelper

Helper for resemble.js, used for image comparison in tests with Playwright, Webdriver, Puppeteer, Appium, TestCafe!

@currys-co-uk/codeceptjs-resemblehelper is a [CodeceptJS](https://codecept.io/) helper which can be used to compare screenshots and make the tests fail/pass based on the tolerance allowed.

If two screenshot comparisons have difference greater then the tolerance provided, the test will fail.

NPM package: https://www.npmjs.com/package/@currys-co-uk/codeceptjs-resemblehelper

To install the package, just run `npm install @currys-co-uk/codeceptjs-resemblehelper`.

### Configuration

This helper should be added in codecept.json/codecept.conf.js

Example:

```js
{
  helpers: {
    ResembleHelper: {
      require: "@currys-co-uk/codeceptjs-resemblehelper",
      baseFolder: "./tests/screenshots/base/",
      diffFolder: "./tests/screenshots/diff/",
      prepareBaseImage: true,
      tolerance: 10,
      skipFailure: true,
      createDiffInToleranceRange: true,
      alwaysSaveDiff: true,
      createSubFoldersInBaseFolder: true,
      updateMismatchedBaseImage: true,
      ignoreNothing: true
    }
  }
}
```

To use the Helper, users may provide the parameters:

`baseFolder`: Mandatory. This is the folder for base images, which will be used with screenshot for comparison.

`diffFolder`: Mandatory. This will the folder where resemble would try to store the difference image, which can be viewed later.

`prepareBaseImage`: Optional. When `true` then the system replaces all of the baselines related to the test case(s) you ran. This is equivalent of setting the option `prepareBaseImage: true` in all verifications of the test file.
If this parameter is missing in `.conf` file, value is `undefined`.

`tolerance`: Optional. When value is present, system sets tolerance for all tests, which does not have it set. Set tolerance in tests has always higher priority, than global tolerance in config.

`skipFailure`: Optional. When `true` is set, Resemble helper continue in test run even in the case of detected mismatch and returns warning to console.

`createDiffInToleranceRange`: Optional, when `true` is set, diff is created only if mismatch is in range of set tolerance (mismatch is not 0 but is less than tolerance).

`alwaysSaveDiff`: Optional. When set as `true` diff image is created in every case.

`createSubFoldersInBaseFolder`: Optional. When `true` is set, for every base image is created sub folder in `/base` folder. Sub folder is named as first 50 chars of test `Scenario` title.

`updateMismatchedBaseImage`: Optional. When `true`, existing base images, which meet condition `mismatch > tolerance`, are updated with actual screenshot of web site, tolerance is then set to `0` and diff with mismatch is not saved to folder.
Use only if base images exists. Parameter is not compatible with `prepareBaseImage`.

`ignoreNothing`: Optional. When `true`, resemblejs covers 100% comparison of compared images and ignores nothing (e.g. similar colors) in found mismatch - every small change, every difficult pixel is resolved as a mismatch.

### Usage

These are the major functions that help in visual testing:

First one is the `seeVisualDiff` which basically takes two parameters

1. `baseImage` Name of the base image, this will be the image used for comparison with the screenshot image. It is mandatory to have the same image file names for base and screenshot image.
2. `options` options can be passed which include `prepareBaseImage` and `tolerance`.

```js
    /**
     * Check Visual Difference for Base and Screenshot Image
     * @param baseImage         Name of the Base Image (Base Image path is taken from Configuration)
     * @param options           Options ex {prepareBaseImage: true, tolerance: 5} along with Resemble JS Options, read more here: https://github.com/rsmbl/Resemble.js
     * @returns {Promise<void>}
     */
    async seeVisualDiff(baseImage, options) {}
```

Second one is the `seeVisualDiffForElement` which basically compares elements on the screenshot, selector for element must be provided.

It is exactly same as `seeVisualDiff` function, only an additional `selector` CSS|XPath|ID locators is provided

```js
    /**
     * See Visual Diff for an Element on a Page
     *
     * @param selector   Selector which has to be compared, CSS|XPath|ID
     * @param baseImage  Base Image for comparison
     * @param options    Options ex {prepareBaseImage: true, tolerance: 5} along with Resemble JS Options, read more here: https://github.com/rsmbl/Resemble.js
     * @returns {Promise<void>}
     */
    async seeVisualDiffForElement(selector, baseImage, options){}
```

> Note:
> `seeVisualDiffForElement` only works when the page for baseImage is open in the browser, so that WebdriverIO can fetch coordinates of the provided selector.

Third one is the `screenshotElement` which basically takes screenshot of the element. Selector for the element must be provided. It saves the image in the output directory as mentioned in the config folder.

```js
I.screenshotElement('selectorForElement', 'nameForImage');
```

Finally to use the helper in your test, you can write something like this:

```js
Feature('to verify monitoried Remote Db instances');

Scenario('Open the System Overview Dashboard', async (I, adminPage, loginPage) => {
  adminPage.navigateToDashboard('OS', 'System Overview');
  I.saveScreenshot('Complete_Dashboard_Image.png');
  adminPage.applyTimer('1m');
  adminPage.viewMetric('CPU Usage');
  I.saveScreenshot('Complete_Metric_Image.png');
});

Scenario('Compare CPU Usage Images', async (I) => {
  // setting tolerance and prepareBaseImage in the options object
  I.seeVisualDiff('Complete_Metric_Image.png', { prepareBaseImage: false, tolerance: 5 });

  // passing a selector, to only compare that element on both the images now

  // We need to navigate to that page first, so that webdriver can fetch coordinates for the selector
  adminPage.navigateToDashboard('OS', 'System Overview');
  I.seeVisualDiffForElement("//div[@class='panel-container']", 'Complete_Dashboard_Image.png', { prepareBaseImage: false, tolerance: 3 });
});
```

> Note: `seeVisualDiff` and `seeVisualDiffElement` work only when the dimensions of the screenshot as well as the base image are same so as to avoid unexpected results.

### Prepare base images behavior states

Is it needed to have prepared base image before and only compare it, or create new base image? It depends how for every test is set:

- `prepareBaseImage` parameter in config
- `options` in test (e.g. `I.seeVisualDiff("image.png", {prepareBaseImage: true})`)
- does base image already exists, or is missing?
  **Note**: Every state(rule/condition) is valid for every one instance of base image

```js
| state |   config   |  options  | base image already exists? |       behavior         |
| ----- | ---------- | --------- | -------------------------- | ---------------------- |
|   1   |  undefined | undefined |           yes              |        compare         |
|   2   |  undefined | undefined |           no               | create new base image  |
|   3   |  undefined |    true   |           yes              | create new base image  |
|   4   |  undefined |    true   |           no               | create new base image  |
|   5   |  undefined |   false   |           yes              |        compare         |
|   6   |  undefined |   false   |           no               |          Error         |
| ----- | ---------- | --------- | -------------------------- | ---------------------- |
|   7   |    true    | undefined |           yes              | create new base image  |
|   8   |    true    | undefined |           no               | create new base image  |
|   9   |    true    |    true   |           yes              | create new base image  |
|  10   |    true    |    true   |           no               | create new base image  |
|  11   |    true    |   false   |           yes              |        compare         |
|  12   |    true    |   false   |           no               |          Error         |
| ----- | ---------- | --------- | -------------------------- | ---------------------- |
|  13   |    false   | undefined |           yes              |        compare         |
|  14   |    false   | undefined |           no               |          Error         |
|  15   |    false   |    true   |           yes              | create new base image  |
|  16   |    false   |    true   |           no               | create new base image  |
|  17   |    false   |   false   |           yes              |        compare         |
|  18   |    false   |   false   |           no               |          Error         |
| ----- | ---------- | --------- | -------------------------- | ---------------------- |
```

### Ignored Box

You can also exclude part of the image from comparison, by specifying the excluded area in pixels from the top left.
Just declare an object and pass it in options as `ignoredBox`:

```js
const box = {
  left: 0,
  top: 10,
  right: 0,
  bottom: 10,
};

I.seeVisualDiff('image.png', { prepareBaseImage: true, tolerance: 1, ignoredBox: box });
```

After this, that specific mentioned part will be ignored while comparison.
This works for `seeVisualDiff` and `seeVisualDiffForElement`.

### Ignored Element

Similar as ignored box, when specific element is excluded from image comparison. You need to pass it in options as `ignoredElement`.

```js
Scenario('Ignore element for screenshot visual diff', async ({ I }) => {
  // I.amOnPage('https://the-internet.herokuapp.com/context_menu');
  // I.saveScreenshot('IGNORED.png');
  await I.seeVisualDiff('IGNORED.png', { ignoredElement: '#hot-spot' });
});
```

After this, specific element will be ignored while comparison.
This works for `seeVisualDiff` & `seeVisualDiffForElement`.

### Ignored Boxes

Similar as Ignored Box, but with more excluded parts of the image comparison specifying the excluded area in pixels from top left.

```js
const box1 = {
  left: 100,
  top: 200,
  right: 300,
  bottom: 600,
};

const box2 = {
  left: 400,
  top: 100,
  right: 500,
  bottom: 600,
};

await I.seeVisualDiff('image.png', { ignoredBoxes: [box1, box2] });
```

After this, that specific mentioned parts will be ignored while comparison.
This works for `seeVisualDiff`.

### Ignored elements

Similar as Ignored element, but it possible to specific more elements, which should be excluded from image comparison.

```js
Scenario('Ignore 2 elements for screenshot visual diff', async ({ I }) => {
  //I.amOnPage('https://the-internet.herokuapp.com/context_menu');
  //I.saveScreenshot('image.png');
  await I.seeVisualDiff('image.png', { ignoredElements: ['#hot-spot', '#page-footer'] });
});
```

After this, that specific mentioned parts will be ignored while comparison.
This works for `seeVisualDiff` & `seeVisualDiffForElement`.

**Note**: DON'T use combination of `ignored box/boxes/element/elements` together, ALWAYS use only one of them as options !!!

### Ignored queryElementAll

Functionality element selection is similar as `querySelectorAll` in `DOM`, `ignoredQueryElementAll` will find all identical/query suitable elements on the page and ignore them.

```js
Scenario('Ignore all same elements', async ({ I }) => {
  //I.amOnPage('https://the-internet.herokuapp.com');
  //await I.saveScreenshot('image.png');
  await I.seeVisualDiff('image.png', { ignoredQueryElementAll: '//ul/li/a' });
});
```

This works for `seeVisualDiff` & `seeVisualDiffForElement`.

### createDiffInToleranceRange flag for generating diff images

Default logic of creating diff images need to have greater mismatch, than tolerance.
With set `createDiffInToleranceRange` as true in config you can affect generating diff images, if mismatch is in range of set tolerance (mismatch is not 0 but is less than tolerance).
`createDiffInToleranceRange` cover only this condition.
E.g.

```js
{
   helpers: {
     ResembleHelper : {
       ...
       createDiffInToleranceRange: true
       ...
     }
   }
}
```

Options tolerance is 5, and test result mismatch was 2,4. -> diff image is created.

### alwaysSaveDiff flag for always generating diff images

With set `alwaysSaveDiff` as `true` in config you can affect generating diff images, it covers all conditions and always returns generated diff image, doesn't matter if test passed or failed.
E.g.

```js
{
   helpers: {
     ResembleHelper : {
       ...
       alwaysSaveDiff: true
       ...
     }
   }
}
```

### createSubFoldersInBaseFolder flag for creating sub folders

With set `createSubFoldersInBaseFolder` as `true` in the config you can affect creating sub folders for base images. This flag is helpful if you have a lot of base images (e.g. more than 200) and `/baseFolder` is not providing an easy survey for your eyes.
For sub folder name in `/baseFolder` is used the first 50 chars of test `Scenario` title. Sub folder name is also correctly parsed for disallowed chars in Windows/Mac.
E.g.

```js
{
   helpers: {
     ResembleHelper : {
       //...
       baseFolder: "./tests/screenshots/base/",
       //...
       createSubFoldersInBaseFolder: true
       //...
     }
   }
}
```

In test should look like this:

```js
Scenario('creates my first base image for first visual testing', async ({ I }) => {
  //I.amOnPage('https://the-internet.herokuapp.com');
  //await I.saveScreenshot('image.png');
  await I.seeVisualDiff('image.png');
});
```

So, what happened? In base folder (`"./tests/screenshots/base/"`) is created sub folder with name `/creates_my_first_base_image_for_first_v` (with max 50 first chars) and into them is saved file `image.png`.

### updateMismatchedBaseImage flag for updating existing base images with mismatch

With `updateMismatchedBaseImage` as `true` in config you can update existing base images with mismatch. It is needed to meet condition `mismatch > tolerance`, then existing base image is updated with actual screenshot of web site.
Tolerance is then set to `0` and diff with mismatch is not saved to folder. Use only if base images exists.

> Note: Parameter is not compatible with `prepareBaseImage` and doesn't replace it.

```js
{
   helpers: {
     ResembleHelper : {
       ...
       updateMismatchedBaseImage: true
       ...
     }
   }
}
```

### ignoreNothing flag for 100% mismatch covering

With `ignoreNothing` as a `true`, resemblejs covers 100% comparison of compared images and ignores nothing (e.g. similar colors) in found mismatch - every small change, every difficult pixel is resolved as a mismatch.
If flag is not set, or has `false` value, resemblejs uses `ignore less` as default, that means `red`, `blue`, `green`, `alpha`, `minBrightness` have 16 tolerance intensity of the color and `maxBrightness` has 240 tolerance intensity.
That covers very similar colors but in specific range.

```js
{
   helpers: {
     ResembleHelper : {
       ...
       ignoreNothing: true
       ...
     }
   }
}
```

### resemble.js Output Settings

You can set further output settings used by resemble.js. Declare an object specifying them and pass it in the options as `outputSettings`:

```js
const outputSettings = {
  ignoreAreasColoredWith: { r: 250, g: 250, b: 250, a: 0 },
  // read more here: https://github.com/rsmbl/Resemble.js
};
I.seeVisualDiff('image.png', { prepareBaseImage: true, tolerance: 1, outputSettings: outputSettings });
```

Refer to the [resemble.js](https://github.com/rsmbl/Resemble.js) documentation for available output settings.

### Skip Failure

You can avoid the test fails for a given threshold but yet generates the difference image.
Just declare an object and pass it in options as `skipFailure`:

```
I.seeVisualDiff("image.png", {prepareBaseImage: true, tolerance: 1, skipFailure: true});
```

or as global in config:

```js
{
   helpers: {
     ResembleHelper : {
       ...
       skipFailure: true
       ...
     }
   }
}
```

After this, the system generates the difference image but does not fail the test.
This works for `seeVisualDiff` and `seeVisualDiffForElement`.

### Allure Reporter

Allure reports may also be generated directly from the tool. To do so, add

```
"plugins": {
	  "allure": {}
}
```

in the config file.
The attachments will be added to the report only when the calulated mismatch is greater than the given tolerance.
Set `output` to where the generated report is to be stored. Default is the output directory of the project.

### AWS Support

AWS S3 support to upload and download various images is also provided.
It can be used by adding the _aws_ code inside `"ResembleHelper"` in the `"helpers"` section in config file. The final result should look like:

```js
{
  helpers: {
    ResembleHelper: {
      require: "@currys-co-uk/codeceptjs-resemblehelper",
      baseFolder: "<location of base folder>",
      diffFolder: "<location of diff folder>",
      aws: {
        accessKeyId: "<Your AccessKeyId>",
        secretAccessKey: "<Your secretAccessKey>",
        region: "<Region of Bucket>",
        bucketName: "<Bucket Name>"
      }
    }
  }
}
```

When this option has been provided, the helper will download the base image from the S3 bucket.
This base image has to be located inside a folder named "_base_".
The resultant output image will be uploaded in a folder named "_output_" and diff image will be uploaded to a folder named "_diff_" in the S3 bucket.
If the `prepareBaseImage` option is marked `true`, then the generated base image will be uploaded to a folder named "_base_" in the S3 bucket.

> Note: The tests may take a bit longer to run when the AWS configuration is provided as determined by the internet speed to upload/download images.

### Known Issues:

> Issue in Windows where the image comparison is not carried out, and therefore no Mismatch Percentage is shown. See 'loadImageData' function in resemble.js
