import DebugCatcher from '../tools/debugCatcher';

Feature('Global set: createSubFoldersInBaseFolder: true');

Scenario('Config flag "createSubFoldersInBaseFolder" creates folder in base folder', async ({ I }) => {
  I.say('New folder in /base folder will be created');
  const debugCatcher = new DebugCatcher();
  I.amOnPage('https://the-internet.herokuapp.com');
  I.saveScreenshot('image1.png');
  await I.seeVisualDiff('image1.png');
  const messageOutput = debugCatcher.messages;
  I.assertStringIncludes(messageOutput, 'Existing base image with name image1.png was not found.');
  I.assertStringIncludes(messageOutput, '/tests/screenshots/base/Config_flag__createSubFoldersInBaseFolder__creates/');
});

Scenario('Config flag "createSubFoldersInBaseFolder" creates second image in sub folder of base folder', async ({ I }) => {
  I.say('New image2.png is in the same sub folder as image1.png');
  const debugCatcher = new DebugCatcher();
  I.amOnPage('https://the-internet.herokuapp.com');
  I.saveScreenshot('image2.png');
  await I.seeVisualDiff('image2.png');
  const messageOutput = debugCatcher.messages;
  I.assertStringIncludes(messageOutput, 'Existing base image with name image2.png was not found.');
  I.assertStringIncludes(messageOutput, '/tests/screenshots/base/Config_flag__createSubFoldersInBaseFolder__creates/');
});

Scenario('Creates sub folder without tag', async ({ I }) => {
  I.say('Sub folder name does not contain tag name');
  const debugCatcher = new DebugCatcher();
  I.amOnPage('https://the-internet.herokuapp.com');
  I.saveScreenshot('image3.png');
  await I.seeVisualDiff('image3.png');
  const messageOutput = debugCatcher.messages;
  I.assertStringIncludes(messageOutput, 'Existing base image with name image3.png was not found.');
  I.assertStringIncludes(messageOutput, '/tests/screenshots/base/Creates_sub_folder_without_tag/');
}).tag('@MY_TAG');
