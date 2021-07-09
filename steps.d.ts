/// <reference types='codeceptjs' />
type ResembleHelper = import('./index');
type AssertWrapper = import('codeceptjs-assert');

declare namespace CodeceptJS {
  interface SupportObject {
    I: I;
    current: any;
  }
  interface Methods extends WebDriver, ResembleHelper, AssertWrapper {}
  interface I extends WithTranslation<Methods> {}
  namespace Translation {
    interface Actions {}
  }
}
