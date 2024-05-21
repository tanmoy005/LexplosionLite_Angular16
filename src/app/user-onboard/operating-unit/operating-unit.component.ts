import { Component, Input, Output ,EventEmitter, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import { treeDataitem } from 'src/app/shared/menu-items/tree-items';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { OperatingUnitTableComponent } from '../common-components/operating-unit-table/operating-unit-table.component';
import { TreeStructureComponent } from '../common-components/tree-structure/tree-structure.component';
import { TableHeaderComponent } from '../common-components/table-header/table-add-header.component';
import { BusinessDetails } from 'src/app/shared/menu-items/entity-interfaces';


@Component({
  selector: 'app-operating-unit',
  templateUrl: './operating-unit.component.html',
  styleUrls: ['./operating-unit.component.scss'],
  // standalone:true,
  // imports:[MatIconModule, MatButtonModule, MatCardModule, OperatingUnitTableComponent, 
  //         TreeStructureComponent,TableHeaderComponent]
})
export class OperatingUnitComponent implements OnChanges
// implements OnInit
 {
  @Output() isBackClicked = new EventEmitter<boolean>();
  @Input() entityDetails:any;
  @Input() entity: any;

  entityOpPath: string[] = [];

  ngOnChanges(changes: SimpleChanges) {
    console.log("Received in op-unit",this.entity.name);
    
    if (changes['entity'] && changes['entity'].currentValue) {
      this.entityOpPath = ['Entities', this.entity.name, 'Operating Unit'];
    }
  }

  treeDataItem = treeDataitem;
  onBackClick() {
    this.isBackClicked.emit(true);
  }
}
