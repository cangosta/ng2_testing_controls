import { Component, View, EventEmitter } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common'

@Component({
  selector: 'tab',
  inputs: [
    'tabTitle: tabTitle',
    'iconClass: iconClass'
  ],
  outputs: [
    'clickEvent: tabClick'
  ]
})
@View({
  template: `
    <div [hidden]="!active">
      <ng-content></ng-content>
    </div>
  `,
  directives: [CORE_DIRECTIVES]
})
export class Tab {
  clickEvent = new EventEmitter();
}