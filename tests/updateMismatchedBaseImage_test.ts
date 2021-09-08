import DebugCatcher from '../tools/debugCatcher';

Feature('Global set: updateMismatchedBaseImage: true');

Scenario('Base image with mismatch is updated', async ({ I }) => {
  I.say('Base image will be updated');
  const debugCatcher = new DebugCatcher();
  I.amOnPage('https://the-internet.herokuapp.com');

  I.saveScreenshot('updateMismatchedBaseImage.png');
  await I.seeVisualDiff('updateMismatchedBaseImage.png');
  const messageOutput = debugCatcher.messages;
  I.assertStringIncludes(messageOutput, 'Global config is set as updateMismatchedBaseImage = true');
  I.assertStringIncludes(messageOutput, 'Updating base image ...');
  I.assertStringIncludes(messageOutput, 'Base image: updateMismatchedBaseImage.png is updated.');
});
