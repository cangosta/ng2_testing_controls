import {
  it,
  describe,
  expect,
  injectAsync,
  TestComponentBuilder,
  setBaseTestProviders,
  beforeEach
} from 'angular2/testing';

import {
  TEST_BROWSER_PLATFORM_PROVIDERS,
  TEST_BROWSER_APPLICATION_PROVIDERS
} from 'angular2/platform/testing/browser';

import { Component } from 'angular2/core';

import { GroupBox, GroupBoxHeader } from '../app/group-box/group-box.js';

@Component({
  template: '',
  directives: [GroupBox, GroupBoxHeader]
})
class TestComponent {
}

describe('group-box control', () => {

  setBaseTestProviders(TEST_BROWSER_PLATFORM_PROVIDERS, TEST_BROWSER_APPLICATION_PROVIDERS)

  it('should show the title', injectAsync([TestComponentBuilder], (tcb) => {
    return tcb.overrideTemplate(TestComponent, '<group-box><group-box-header>Title Content</group-box-header></group-box>')
      .createAsync(TestComponent).then( (fixture) => {
        fixture.detectChanges();
        let compiled = fixture.debugElement.nativeElement;
        expect(compiled).toContainText('Title Content');
    });
  }));

  it('should show the body', injectAsync([TestComponentBuilder], (tcb) => {
    return tcb.overrideTemplate(TestComponent, '<group-box><group-box-header>Title Content</group-box-header>Body Content</group-box>')
      .createAsync(TestComponent).then( (fixture) => {
        fixture.detectChanges();
        let compiled = fixture.debugElement.nativeElement;
        expect(compiled).toContainText('Body Content');
    });
  }));

});
