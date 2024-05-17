import { Component } from '@angular/core';
import { EntityTableComponent } from '../common-components/entity-table/entity-table.component';
import { EntitiesTableHeaderComponent } from '../common-components/entities-table-header/entities-table-header.component';
import { TreeStructureComponent } from '../common-components/tree-structure/tree-structure.component';
import { treeDataitem } from 'src/app/shared/menu-items/tree-items';

@Component({
  selector: 'app-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.scss'],
  standalone:true,
  imports:[EntityTableComponent,
    EntitiesTableHeaderComponent,
    TreeStructureComponent
  ]
})
export class EntityComponent {
  treeDataItem = treeDataitem;
}
