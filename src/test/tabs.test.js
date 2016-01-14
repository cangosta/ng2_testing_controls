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

import { NodeListHelpers } from './helpers/node-list-helpers.js';
import { Tabs, Tab } from '../app/tabs/tabs.js';

@Component({
  template: '',
  directives: [Tabs, Tab]
})
class TestComponent {
}

describe('tab control', () => {

  it('should show the content of a single tab', injectAsync([TestComponentBuilder], (tcb) => {
    return tcb.overrideTemplate(TestComponent, '<tabs><tab>Title Content</tab></tabs>')
      .createAsync(TestComponent).then( (fixture) => {
        fixture.detectChanges();
        let compiled = fixture.debugElement.nativeElement;
        expect(compiled).toContainText('Title Content');
      });
  }));

  it('should only show the content of the first tab by default', injectAsync([TestComponentBuilder], (tcb) => {
    return tcb.overrideTemplate(TestComponent, '<tabs><tab>Title Content First</tab><tab>Title Content Second</tab></tabs>')
      .createAsync(TestComponent).then( (fixture) => {
        fixture.detectChanges();
        let compiled = fixture.debugElement.nativeElement;
        let tabs = compiled.querySelectorAll('tab > div');
        let firstTab = NodeListHelpers.findNodeByText(tabs, 'Title Content First'),
          secondTab = NodeListHelpers.findNodeByText(tabs, 'Title Content Second');

        expect(firstTab).toBeDefined();
        expect(firstTab).toContainText('Title Content First');
        expect(firstTab.hidden).toBeFalsy();

        expect(secondTab).toBeDefined();
        expect(secondTab).toContainText('Title Content Second');
        expect(secondTab.hasAttribute("hidden")).toBeTruthy();
      });
  }));

  it('should show the title of the tabs', injectAsync([TestComponentBuilder], (tcb) => {
    return tcb.overrideTemplate(TestComponent, '<tabs><tab tabTitle="tab1">Title Content First</tab><tab tabTitle="tab2">Title Content Second</tab></tabs>')
      .createAsync(TestComponent).then( (fixture) => {
        fixture.detectChanges();
        let compiled = fixture.debugElement.nativeElement;
        expect(compiled).toContainText('tab1');
        expect(compiled).toContainText('tab2');
      });
  }));

  it('should show the content of the second tab when clicked', injectAsync([TestComponentBuilder], (tcb) => {
    return tcb.overrideTemplate(TestComponent, '<tabs><tab tabTitle="tab1">Title Content First</tab><tab tabTitle="tab2">Title Content Second</tab></tabs>')
      .createAsync(TestComponent).then( (fixture) => {

        fixture.detectChanges();

        let compiled = fixture.debugElement.nativeElement;
        let tabs = compiled.querySelectorAll('tab > div');
        let firstTab = NodeListHelpers.findNodeByText(tabs, 'Title Content First'),
          secondTab = NodeListHelpers.findNodeByText(tabs, 'Title Content Second');

        expect(firstTab).toBeDefined();
        expect(firstTab).toContainText('Title Content First');
        expect(firstTab.hidden).toBeFalsy();

        expect(secondTab).toBeDefined();
        expect(secondTab).toContainText('Title Content Second');
        expect(secondTab.hasAttribute("hidden")).toBeTruthy();

        let tabSelectors = compiled.querySelectorAll(".tab");
        let tab2 = NodeListHelpers.findNodeByText(tabSelectors, "tab2");

        tab2.click();

        fixture.detectChanges();

        expect(firstTab).toBeDefined();
        expect(firstTab).toContainText('Title Content First');
        expect(firstTab.hidden).toBeTruthy();

        expect(secondTab).toBeDefined();
        expect(secondTab).toContainText('Title Content Second');
        expect(secondTab.hasAttribute("hidden")).toBeFalsy();

      });
  }));
});
