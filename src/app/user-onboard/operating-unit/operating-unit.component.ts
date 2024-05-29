import { Component, Input, Output ,EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import { treeDataitem } from 'src/app/shared/menu-items/tree-items';
import { EntityDataType } from 'src/app/shared/menu-items/entity-to-opunit-data-interface';


@Component({
  selector: 'app-operating-unit',
  templateUrl: './operating-unit.component.html',
  styleUrls: ['./operating-unit.component.scss'],

})
export class OperatingUnitComponent implements OnChanges

 {
  @Output() isBackClicked = new EventEmitter<boolean>();
 
  @Input() entity: EntityDataType;
  @Input() isDotsCliscked: boolean;
  @Output() handleTableDataLoadingFromOperatingUnit = new EventEmitter<boolean>();


  entityOpPath: string[] = [];

  ngOnChanges(changes: SimpleChanges) {
    console.log("Received in op-unit",this.entity);
    
    if (changes['entity'] && changes['entity'].currentValue) {
      this.entityOpPath = ['Entities', this.entity.name, 'Operating Unit'];
    }
  }

  treeDataItem = treeDataitem;
  onBackClick() {
    this.isBackClicked.emit(true);
    this.handleTableDataLoadingFromOperatingUnit.emit(true);
  }
}
