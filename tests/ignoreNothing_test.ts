import DebugCatcher from '../tools/debugCatcher';

Feature('Global config flag: ignoreNothing');

Scenario('ignoreNothing with seeVisualDiff method', async ({ I }) => {
  I.say('Functionality is turned on.');
  const debugCatcher = new DebugCatcher();

  I.amOnPage('https://the-internet.herokuapp.com');

  await I.saveScreenshot('ignoreNothing_seeVisualDiff.png');
  await I.seeVisualDiff('ignoreNothing_seeVisualDiff.png');
  const messageOutput = debugCatcher.messages;
  I.assertStringIncludes(messageOutput, `Full image comparison is turn on.`);
});

Scenario('ignoreNothing with seeVisualDiffForElement method', async ({ I }) => {
  I.say('Functionality is turned on.');
  const debugCatcher = new DebugCatcher();

  I.amOnPage('https://the-internet.herokuapp.com/context_menu');
  await I.screenshotElement('#content', 'ignoreNothing_seeVisualDiffForElement.png');
  await I.seeVisualDiffForElement('#content', 'ignoreNothing_seeVisualDiffForElement.png');
  const messageOutput = debugCatcher.messages;

  I.assertStringIncludes(messageOutput, `Full image comparison is turn on.`);
});
