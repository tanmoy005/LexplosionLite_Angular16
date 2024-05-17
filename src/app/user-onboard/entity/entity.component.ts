import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EntityTableComponent } from '../common-components/entity-table/entity-table.component';
import { EntitiesTableHeaderComponent } from '../common-components/entities-table-header/entities-table-header.component';
import { TreeStructureComponent } from '../common-components/tree-structure/tree-structure.component';
import { treeDataitem } from 'src/app/shared/menu-items/tree-items';
import { ApiService } from 'src/app/services/api.service';

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
  receivedData: any;
  entityTypesList: any;
  industryTypesList: any;
  lawCategoriesList: any;
  countryList: [];
  isEntityDialogOpen: boolean

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
}
