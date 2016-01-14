import { Directive, Component, View, Query, QueryList, EventEmitter } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';
import { GroupBoxHeader } from './nested-components/group-box-header.js';
export { GroupBoxHeader };

@Component({
  selector: 'group-box',
  moduleId: __moduleName,
  inputs: [
    'isExpandable: isExpandable',
    'isExpanded: isExpanded'
  ],
  outputs: [
    'expanded: expanded',
    'collapsed: collapsed'
  ]
})
@View({
  templateUrl: './group-box.html',
  directives: [CORE_DIRECTIVES, GroupBoxHeader]
})
export class GroupBox {
  isExpandable = false;
  isExpanded = true;
  hasGroupBoxHeaderContent = false;

  expanded = new EventEmitter();
  collapsed = new EventEmitter();

  constructor( @Query(GroupBoxHeader) groupBoxHeader: QueryList) {
    this.groupBoxHeader = groupBoxHeader;
    this.expanded = new EventEmitter();
    this.collapsed = new EventEmitter();
  }

  ngOnInit() {
    this.isExpanded = this.isExpanded && this.isExpandable || !this.isExpandable;
  }

  ngAfterContentInit() {
    this.hasGroupBoxHeaderContent = this.groupBoxHeader.length > 0;
  }

  toggle() {
    // only toggles if it is expandable
    if (this.isExpandable) {
      // toggles group box content
      this.isExpanded = !this.isExpanded;
      
      // throw events
      this.isExpanded ? this.expanded.next() : this.collapsed.next();
    }
  }
}
