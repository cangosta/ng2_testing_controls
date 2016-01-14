import { Component, View, EventEmitter, Query, QueryList } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';

import { Tab } from './tab.js';
export { Tab };

@Component({
  selector: 'tabs',
  moduleId: __moduleName,
  inputs: [
    'orientation : orientation',
    'sidebarClass: sidebarClass',
    'contentClass: contentClass'
  ]
})
@View({
  templateUrl: './tabs.html',
  directives: [CORE_DIRECTIVES, Tab]
})
export class Tabs {
  constructor( @Query(Tab) tabs: QueryList) {
    this._tabs = tabs;
  }

  ngOnInit() {
    switch (this.orientation) {
      case "horizontal": this.isTabStacked = false; break;
      case "vertical": this.isTabStacked = true; break;
      default: this.isTabStacked = true;
    }

  }

  ngAfterContentInit() {
    this.tabs = this._tabs.toArray();
    if (this.tabs[0]) this.tabs[0].active = true;
  }

  selectTab(tab) {
    this.tabs.forEach((tab) => {
      tab.active = false;
    });
    tab.active = true;
    tab.clickEvent.next(tab);
  }
}