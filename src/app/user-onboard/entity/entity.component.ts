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

import { EncryptStorage } from 'encrypt-storage';
import { environment } from 'dotenv';
import * as FieldDefinitionInterfaces from 'src/app/shared/menu-items/field-definition-interfaces'

 

@Component({
  selector: 'app-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.scss'],
  // standalone:true,
  // imports:[EntityTableComponent,
  //   TableHeaderComponent,
  //   TreeStructureComponent,
  //   MatButtonModule,
  //   MatIconModule
  // ]
})
export class EntityComponent {
  treeDataItem = treeDataitem;
  receivedData: any;
  encryptStorage = new EncryptStorage(environment.localStorageKey);
  // entityTypesList: any;
  // industryTypesList: any;
  // lawCategoriesList: any;
   //countryList: any=[];


  // entityTypesList:any= ['company'];
  // industryTypesList: any=['IT'];
  // lawCategoriesList:any= ['labour'];

  entityTypesList:FieldDefinitionInterfaces.EntityTypes[];
  industryTypesList: FieldDefinitionInterfaces.IndustryActivies[];
  lawCategoriesList:FieldDefinitionInterfaces.komriskLawCategories[];
 
  isEntityDialogOpen: boolean
  selectedEntity:  any
  

  @Input() countryList: [] = [];
  @Output() selectedEntityEmitter = new EventEmitter<any>();
  @Output() selectedEntityEmitter1 = new EventEmitter<any>();
  @Output() handleTableDataLoadingFromEntity = new EventEmitter<boolean>();

  constructor(private router: Router, private apiService: ApiService) {
    const navigation = this.router.getCurrentNavigation();
    var fieldDefinitionResponse;

    if (navigation && navigation.extras.state) {
      this.receivedData = navigation.extras.state;
    }
    const savedentityTypes = this.encryptStorage.getItem('entityTypes');
    const savedindustryActivities = this.encryptStorage.getItem('industryActivities');
    const savedLawCategories = this.encryptStorage.getItem('komriskLawCategories');

    this.entityTypesList = savedentityTypes;
    this.industryTypesList = savedindustryActivities;
    this.lawCategoriesList = savedLawCategories;
  //   try{
  //   this.apiService.getFieldDefinition(JSON.stringify(["entityTypes","industryActivities","komriskLawCategories"])).subscribe((response) => {
  //   fieldDefinitionResponse = response.data;

  //   this.entityTypesList = fieldDefinitionResponse.entityTypes;
  //   this.industryTypesList = fieldDefinitionResponse.industryActivities;
  //   this.lawCategoriesList = fieldDefinitionResponse.komriskLawCategories;
  //   })
  // }
  // catch (error) {
  //     console.log(error)
  //   }
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
    console.log('Selected entity from dots:', entity);
    this.selectedEntity= entity
    this.selectedEntityEmitter.emit(this.selectedEntity);
   
  }
  handleEntitySelected1(entity: any) {
    console.log('Selected entity:', entity);
    this.selectedEntity= entity
    this.selectedEntityEmitter1.emit(this.selectedEntity);
   
  }

  handleTableDataLoading(state:boolean){
    this.handleTableDataLoadingFromEntity.emit(state);
  }
  goToSubscription(){
    this.router.navigate(['/subscription'], { state: { entity: '' } });
  }
}
