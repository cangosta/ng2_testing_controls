import { Directive, Component, View, Query, QueryList } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';
import { GroupBoxHeader } from './nested-components/group-box-header.js';
export { GroupBoxHeader };

@Component({
  selector: 'group-box',
  moduleId: __moduleName
})
@View({
  templateUrl: './group-box.html',
  directives: [CORE_DIRECTIVES, GroupBoxHeader]
})
export class GroupBox {

  constructor( @Query(GroupBoxHeader) groupBoxHeader: QueryList) {
    this.groupBoxHeader = groupBoxHeader;
  }

}
