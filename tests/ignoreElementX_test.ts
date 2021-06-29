import DebugCatcher from '../tools/debugCatcher';

Feature("IGNORE in seeVisualDiff() & seeVisualDiffForElement()");

Scenario(
  'in seeVisualDiff(): {ignoredElement: "[href*="/dropdown"]"}',
  async ({ I }) => {
    I.say("element counted coordinates are correct");
    const debugCatcher = new DebugCatcher();

    I.amOnPage("https://the-internet.herokuapp.com");

    await I.saveScreenshot("ignoredElement_seeVisualDiff.png");
    await I.seeVisualDiff("ignoredElement_seeVisualDiff.png", {
      ignoredElement: '[href*="/dropdown"]',
    });
    const messageOutput = debugCatcher.messages;
    I.assertStringIncludes(
      messageOutput,
      `Element: "[href*=\\"/dropdown\\"]" has coordinates: {"left":53.5,"top":447.296875,"right":126.5,"bottom":464.296875}`
    );
    I.assertStringIncludes(
      messageOutput,
      'Browser screen was scrolled "0" px vertically and "0" px horizontal.'
    );
  }
);

Scenario(
  'in seeVisualDiff(): { ignoredElements: ["#hot-spot", "#page-footer"] }',
  async ({ I }) => {
    I.say("element counted coordinates are correct");
    const debugCatcher = new DebugCatcher();

    I.amOnPage("https://the-internet.herokuapp.com/context_menu");
    I.saveScreenshot("ignoredElements_seeVisualDiff.png");
    await I.seeVisualDiff("ignoredElements_seeVisualDiff.png", {
      ignoredElements: ["#hot-spot", "#page-footer"],
    });
    const messageOutput = debugCatcher.messages;
    I.assertStringIncludes(
      messageOutput,
      'Element: "#hot-spot" has coordinates: {"left":61,"top":177.890625,"right":311,"bottom":327.890625}'
    );
    I.assertStringIncludes(
      messageOutput,
      'Browser screen was scrolled "0" px vertically and "0" px horizontal.'
    );
    I.assertStringIncludes(
      messageOutput,
      'Element: "#page-footer" has coordinates: {"left":46,"top":359.890625,"right":1046,"bottom":415.890625}'
    );
    I.assertStringIncludes(
      messageOutput,
      'Browser screen was scrolled "0" px vertically and "0" px horizontal.'
    );
  }
);

Scenario(
  'in seeVisualDiff(): "{ ignoredQueryElementAll: "p" }"',
  async ({ I }) => {
    I.say("elements counted coordinates are correct");
    const debugCatcher = new DebugCatcher();

    I.amOnPage("https://the-internet.herokuapp.com/context_menu");
    await I.saveScreenshot("ignoredQueryElementAll_seeVisualDiff.png");
    await I.seeVisualDiff("ignoredQueryElementAll_seeVisualDiff.png", {
      ignoredQueryElementAll: "p",
    });
    const messageOutput = debugCatcher.messages;
    I.assertStringIncludes(
      messageOutput,
      'Element: "p" has coordinates: {"left":61,"top":87.890625,"right":1031,"bottom":112.890625}'
    );
    I.assertStringIncludes(
      messageOutput,
      'Element: "p" has coordinates: {"left":61,"top":132.890625,"right":1031,"bottom":157.890625}'
    );
    I.assertStringIncludes(
      messageOutput,
      'Browser screen was scrolled "0" px vertically and "0" px horizontal.'
    );
  }
);

Scenario(
  'in seeVisualDiff(): "{ ignoredElement: { shadow: ["my-paragraph"] } }"',
  async ({ I }) => {
    I.say("elements counted coordinates are correct");
    const debugCatcher = new DebugCatcher();

    I.amOnPage("https://the-internet.herokuapp.com/shadowdom");
    I.saveScreenshot("ignoredElement_shadow_seeVisualDiff.png");
    await I.seeVisualDiff("ignoredElement_shadow_seeVisualDiff.png", {
      ignoredElement: { shadow: ["my-paragraph"] },
    });
    const messageOutput = debugCatcher.messages;
    I.assertStringIncludes(
      messageOutput,
      'Element: {"shadow":["my-paragraph"]} has coordinates: {"left":61,"top":123.796875,"right":1031,"bottom":149.796875}'
    );
    I.assertStringIncludes(
      messageOutput,
      'Browser screen was scrolled "0" px vertically and "0" px horizontal.'
    );
  }
);

Scenario(
  'in seeVisualDiff(): { ignoredElements: [{ shadow: ["my-paragraph"] }, { shadow: ["my-paragraph", "slot"] }] }',
  async ({ I }) => {
    I.say("elements counted coordinates are correct");
    const debugCatcher = new DebugCatcher();

    I.amOnPage("https://the-internet.herokuapp.com/shadowdom");
    I.saveScreenshot("ignoredElements_shadow_seeVisualDiff.png");
    await I.seeVisualDiff("ignoredElements_shadow_seeVisualDiff.png", {
      ignoredElements: [
        { shadow: ["my-paragraph"] },
        { shadow: ["my-paragraph", "slot"] },
      ],
    });
    const messageOutput = debugCatcher.messages;
    I.assertStringIncludes(
      messageOutput,
      'Element: {"shadow":["my-paragraph"]} has coordinates: {"left":61,"top":123.796875,"right":1031,"bottom":149.796875}'
    );
    I.assertStringIncludes(
      messageOutput,
      'Browser screen was scrolled "0" px vertically and "0" px horizontal.'
    );
    I.assertStringIncludes(
      messageOutput,
      'Element: {"shadow":["my-paragraph","slot"]} has coordinates: {"left":0,"top":0,"right":0,"bottom":0}'
    );
    I.assertStringIncludes(
      messageOutput,
      'Browser screen was scrolled "0" px vertically and "0" px horizontal.'
    );
  }
);

Scenario(
  'in seeVisualDiff(): { ignoredQueryElementAll: { shadow: ["my-paragraph"] }',
  async ({ I }) => {
    I.say("elements counted coordinates are correct");
    const debugCatcher = new DebugCatcher();

    I.amOnPage("https://the-internet.herokuapp.com/shadowdom");
    I.saveScreenshot("ignoredQueryElementAll_shadow_seeVisualDiff.png");
    await I.seeVisualDiff("ignoredQueryElementAll_shadow_seeVisualDiff.png", {
      ignoredQueryElementAll: { shadow: ["my-paragraph"] },
    });
    const messageOutput = debugCatcher.messages;

    I.assertStringIncludes(
      messageOutput,
      'Element: {"shadow":["my-paragraph"]} has coordinates: {"left":61,"top":123.796875,"right":1031,"bottom":149.796875}'
    );
    I.assertStringIncludes(
      messageOutput,
      'Browser screen was scrolled "0" px vertically and "0" px horizontal.'
    );
    I.assertStringIncludes(
      messageOutput,
      'Element: {"shadow":["my-paragraph"]} has coordinates: {"left":61,"top":165.796875,"right":1031,"bottom":245.796875}'
    );
    I.assertStringIncludes(
      messageOutput,
      'Browser screen was scrolled "0" px vertically and "0" px horizontal.'
    );
  }
);

Scenario(
  'in seeVisualDiffForElement(): { ignoredElement: "#hot-spot" }',
  async ({ I }) => {
    I.say("elements counted coordinates are correct");
    const debugCatcher = new DebugCatcher();

    I.amOnPage("https://the-internet.herokuapp.com/context_menu");
    await I.screenshotElement("#content", "ignoredElement_seeVisualDiffForElement.png");
    await I.seeVisualDiffForElement("#content", "ignoredElement_seeVisualDiffForElement.png", {
      ignoredElement: "#hot-spot",
    });
    const messageOutput = debugCatcher.messages;

    I.assertStringIncludes(
      messageOutput,
      'Element: "#hot-spot" has coordinates: {"left":61,"top":177.890625,"right":311,"bottom":327.890625}'
    );
    I.assertStringIncludes(
      messageOutput,
      'Browser screen was scrolled "0" px vertically and "0" px horizontal.'
    );
    I.assertStringIncludes(
      messageOutput,
      'Area for selector #content {"left":46,"top":32,"right":1046,"bottom":360}'
    );
    I.assertStringIncludes(
      messageOutput,
      'You ignore one element in screenshotted element "#content" ...'
    );
    I.assertStringIncludes(
      messageOutput,
      'Element coordinates were recounted to element screenshotted size as: {"left":15,"top":145.890625,"right":265,"bottom":295.890625}'
    );
  }
);

Scenario(
  'in seeVisualDiffForElement(): { ignoredElements: [".large-2", "div.row:nth-of-type(3)"] }',
  async ({ I }) => {
    I.say("elements counted coordinates are correct");
    const debugCatcher = new DebugCatcher();

    I.amOnPage("https://the-internet.herokuapp.com/dynamic_content");
    I.screenshotElement("div.example", "ignoredElements_seeVisualDiffForElement.png");
    await I.seeVisualDiffForElement(
      "div.example",
      "ignoredElements_seeVisualDiffForElement.png",
      { ignoredElements: [".large-2", "div.row:nth-of-type(3)"] }
    );
    const messageOutput = debugCatcher.messages;
    I.assertStringIncludes(
      messageOutput,
      'Element: "div.row:nth-of-type(3)" has coordinates: {"left":129.328125,"top":459.890625,"right":962.328125,"bottom":541.890625}'
    );
    I.assertStringIncludes(
      messageOutput,
      'Browser screen was scrolled "0" px vertically and "0" px horizontal.'
    );
    I.assertStringIncludes(
      messageOutput,
      'Element: ".large-2" has coordinates: {"left":129.328125,"top":231.890625,"right":268.328125,"bottom":313.890625}'
    );
    I.assertStringIncludes(
      messageOutput,
      'Browser screen was scrolled "0" px vertically and "0" px horizontal.'
    );
    I.assertStringIncludes(
      messageOutput,
      'Area for selector div.example {"left":61,"top":37.390625,"right":1031,"bottom":574.390625}'
    );
    I.assertStringIncludes(
      messageOutput,
      'You ignore more elements in screenshotted element "div.example" ...'
    );
    I.assertStringIncludes(
      messageOutput,
      'Element coordinates were recounted to element screenshotted size as: [{"left":68.328125,"top":194.5,"right":207.328125,"bottom":276.5},{"left":68.328125,"top":422.5,"right":901.328125,"bottom":504.5}]'
    );
  }
);

Scenario(
  'in seeVisualDiffForElement(): { ignoredQueryElementAll: ".large-2" }',
  async ({ I }) => {
    I.say("elements counted coordinates are correct");
    const debugCatcher = new DebugCatcher();

    I.amOnPage("https://the-internet.herokuapp.com/dynamic_content");
    await I.screenshotElement("div.example", "ignoredQueryElementAll_seeVisualDiffForElement.png");
    await I.seeVisualDiffForElement("div.example", "ignoredQueryElementAll_seeVisualDiffForElement.png", {
      ignoredQueryElementAll: ".large-2",
    });
    const messageOutput = debugCatcher.messages;
    I.assertStringIncludes(
      messageOutput,
      'Element: ".large-2" has coordinates: {"left":129.328125,"top":231.890625,"right":268.328125,"bottom":313.890625}'
    );
    I.assertStringIncludes(
      messageOutput,
      'Browser screen was scrolled "0" px vertically and "0" px horizontal.'
    );
    I.assertStringIncludes(
      messageOutput,
      'Element: ".large-2" has coordinates: {"left":129.328125,"top":345.890625,"right":268.328125,"bottom":427.890625}'
    );
    I.assertStringIncludes(
      messageOutput,
      'Browser screen was scrolled "0" px vertically and "0" px horizontal.'
    );
    I.assertStringIncludes(
      messageOutput,
      'Element: ".large-2" has coordinates: {"left":129.328125,"top":459.890625,"right":268.328125,"bottom":541.890625}'
    );
    I.assertStringIncludes(
      messageOutput,
      'Browser screen was scrolled "0" px vertically and "0" px horizontal.'
    );
    I.assertStringIncludes(
      messageOutput,
      'Area for selector div.example {"left":61,"top":37.390625,"right":1031,"bottom":574.390625}'
    );
    I.assertStringIncludes(
      messageOutput,
      'You ignore more elements in screenshotted element "div.example" ...'
    );
    I.assertStringIncludes(
      messageOutput,
      'Element coordinates were recounted to element screenshotted size as: [{"left":68.328125,"top":194.5,"right":207.328125,"bottom":276.5},{"left":68.328125,"top":308.5,"right":207.328125,"bottom":390.5},{"left":68.328125,"top":422.5,"right":207.328125,"bottom":504.5}]'
    );
  }
);
