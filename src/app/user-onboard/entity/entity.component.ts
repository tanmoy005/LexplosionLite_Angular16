import { Component,Input ,EventEmitter,Output} from '@angular/core';
import { Router } from '@angular/router';
import { EntityTableComponent } from '../common-components/entity-table/entity-table.component';
import { TableHeaderComponent } from '../common-components/table-header/table-add-header.component';
import { TreeStructureComponent } from '../common-components/tree-structure/tree-structure.component';
import { treeDataitem } from 'src/app/shared/menu-items/tree-items';
import { ApiService } from 'src/app/services/api.service';
import * as EntityInterfaces from 'src/app/shared/menu-items/entity-interfaces';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
 

@Component({
  selector: 'app-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.scss'],
  standalone:true,
  imports:[EntityTableComponent,
    TableHeaderComponent,
    TreeStructureComponent,
    MatButtonModule,
    MatIconModule
  ]
})
export class EntityComponent {
  treeDataItem = treeDataitem;
  receivedData: any;
  // entityTypesList: any;
  // industryTypesList: any;
  // lawCategoriesList: any;
  entityTypesList:any= ['company'];
  industryTypesList: any=['IT'];
  lawCategoriesList:any= ['labour'];
  //countryList: any=[];
  isEntityDialogOpen: boolean
  selectedEntity:  any
  

  @Input() countryList: [] = [];
  @Output() selectedEntityEmitter = new EventEmitter<any>();

  constructor(private router: Router, private apiService: ApiService) {
    const navigation = this.router.getCurrentNavigation();
    var fieldDefinitionResponse;

    if (navigation && navigation.extras.state) {
      this.receivedData = navigation.extras.state;
    }

    try{
    this.apiService.getFieldDefinition(JSON.stringify(["entityTypes","industryActivities","komriskLawCategories"])).subscribe((response) => {
    fieldDefinitionResponse = response.data;

    this.entityTypesList = fieldDefinitionResponse.entityTypes;
    this.industryTypesList = fieldDefinitionResponse.industryActivities;
    this.lawCategoriesList = fieldDefinitionResponse.komriskLawCategories;
    })
  }
  catch (error) {
      console.log(error)
    }
  }
  
  handleAddEntity(event: boolean) {
    if (event) {
      console.log('Add New Entity button clicked:', event);
      // Perform the actions you want to take when the button is clicked
    }
  }
  // handleEntitySelected(entity: EntityInterfaces.BusinessDetails) {
  //   console.log('Selected entity:', entity);
  //   this.selectedEntity= entity
  //   this.selectedEntityEmitter.emit(this.selectedEntity);
   
  // }
  handleEntitySelected(entity: any) {
    console.log('Selected entity:', entity);
    this.selectedEntity= entity
    this.selectedEntityEmitter.emit(this.selectedEntity);
   
  }
}
