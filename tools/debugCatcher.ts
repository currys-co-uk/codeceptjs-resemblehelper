const Helper = require('@codeceptjs/helper');


export default class DebugCatcher {
  public messages = '';

  constructor() {
   
    const orig = Helper.prototype.debug;

    Helper.prototype.debug = (msg: string) => {
      this.messages += `${msg}\n`;
      orig(msg);
    };
  }
}

