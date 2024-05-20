import { Component, Input, Output } from '@angular/core';
import { treeDataitem } from 'src/app/shared/menu-items/tree-items';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { OperatingUnitTableComponent } from '../common-components/operating-unit-table/operating-unit-table.component';
import { TreeStructureComponent } from '../common-components/tree-structure/tree-structure.component';

@Component({
  selector: 'app-operating-unit',
  templateUrl: './operating-unit.component.html',
  styleUrls: ['./operating-unit.component.scss'],
  standalone:true,
  imports:[MatIconModule, MatButtonModule, MatCardModule, OperatingUnitTableComponent, 
          TreeStructureComponent]
})
export class OperatingUnitComponent {
  @Input() entityDetails:any;
  @Input() entity = {
    "position": 1,
    "name": "Test Entity",
    "country": 1,
    "countryLabel": "India",
    "industry": 3,
    "industryLabel": "Manufacturing",
    "entityType": 1,
    "entityTypeLabel": "Company",
    "emailID": "",
    "laws": "",
    "lawModules": [
        1,
        2
    ],
    "lawModulesLabel": [
        "Labour",
        "Operational"
    ],
    "operatingUnit": "",
    "actions": ""
  };

  treeDataItem = treeDataitem;
}