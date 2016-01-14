import {
  it,
  describe,
  expect,
  inject,
  injectAsync,
  fakeAsync,
  TestComponentBuilder,
  tick
} from 'angular2/testing';

import { Component } from 'angular2/core';

import { GroupBox, GroupBoxHeader } from '../app/group-box/group-box.js';

@Component({
  template: '',
  directives: [GroupBox, GroupBoxHeader]
})
class TestComponent {
  expandedCallback() {
    this.expandedCalled = true;
  }
  collapsedCallback() {
    this.collapsedCalled = true;
  }
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

  it('should show the body by default when it is expandable', injectAsync([TestComponentBuilder], (tcb) => {
    return tcb.overrideTemplate(TestComponent, '<group-box [isExpandable]="true"><group-box-header>Title Content</group-box-header>Body Content</group-box>')
      .createAsync(TestComponent).then( (fixture) => {
        fixture.detectChanges();
        let compiled = fixture.debugElement.nativeElement;
        expect(compiled).toContainText('Body Content');
    });
  }));

  it('should hide the body when it is expandable and it is not expanded', injectAsync([TestComponentBuilder], (tcb) => {
    return tcb.overrideTemplate(TestComponent, '<group-box [isExpandable]="true" [isExpanded]="false"><group-box-header>Title Content</group-box-header>Body Content</group-box>')
      .createAsync(TestComponent).then( (fixture) => {
        fixture.detectChanges();
        let compiled = fixture.debugElement.nativeElement;
        expect(compiled).not.toContainText('Body Content');
    });
  }));

  it('should hide the body on title click when it is expandable and it is expanded', injectAsync([TestComponentBuilder], (tcb) => {
    return tcb.overrideTemplate(TestComponent, '<group-box [isExpandable]="true" [isExpanded]="true"><group-box-header>Title Content</group-box-header>Body Content</group-box>')
      .createAsync(TestComponent).then( (fixture) => {

        fixture.detectChanges();
        let compiled = fixture.debugElement.nativeElement;
        expect(compiled).toContainText('Body Content');

        compiled.querySelector('.group-box-header').click();
        fixture.detectChanges();
        expect(compiled).not.toContainText('Body Content');
    });
  }));

  it('should show the body content on title click when it is expandable and it is not expanded', injectAsync([TestComponentBuilder], (tcb) => {
    return tcb.overrideTemplate(TestComponent, '<group-box [isExpandable]="true" [isExpanded]="false"><group-box-header>Title Content</group-box-header>Body Content</group-box>')
      .createAsync(TestComponent).then( (fixture) => {

        fixture.detectChanges();
        let compiled = fixture.debugElement.nativeElement;
        expect(compiled).not.toContainText('Body Content');

        compiled.querySelector('.group-box-header').click();
        fixture.detectChanges();
        expect(compiled).toContainText('Body Content');
    });
  }));

  it('should raise expanded event on title click when it is expandable and it is collapsed', inject([TestComponentBuilder], fakeAsync((tcb) => {
    // var fixture;
    //
    // tcb.overrideTemplate(TestComponent, '<group-box [isExpandable]="true" [isExpanded]="false" (expanded)="expandedCallback($event)"><group-box-header>Title Content</group-box-header>Body Content</group-box>')
    //   .createAsync(TestComponent).then((rootFixture) => {
    //     fixture = rootFixture;
    //
    //     tick();
    //
    //     fixture.detectChanges();
    //     var element = fixture.debugElement.componentInstance;
    //     var compiled = fixture.debugElement.nativeElement;
    //
    //     compiled.querySelector('.group-box-header').click();
    //
    //     tick();
    //     fixture.detectChanges();
    //     expect(element.expandedCalled).toBeFalsy();
    //   });
  })));

});
