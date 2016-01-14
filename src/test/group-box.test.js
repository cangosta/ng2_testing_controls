import {
  it,
  describe,
  expect,
  injectAsync,
  TestComponentBuilder
} from 'angular2/testing';

import { Component } from 'angular2/core';

import { GroupBox, GroupBoxHeader } from '../app/group-box/group-box.js';

@Component({
  template: '',
  directives: [GroupBox, GroupBoxHeader]
})
class TestComponent {
}

describe('group-box control', () => {

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
