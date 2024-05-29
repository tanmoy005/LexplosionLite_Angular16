import { Component, ViewChild, Inject, OnInit, OnDestroy,EventEmitter  } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Input,Output } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  MatDialog
} from '@angular/material/dialog';
import { TreeNode, treeDataitem } from 'src/app/shared/menu-items/tree-items';
import * as EntityInterfaces from 'src/app/shared/menu-items/entity-interfaces';
import { AddEntityDialog } from './add-entity-dialog-component';
import { ViewEntityLawsDialog } from './entity-laws-dialog-component';
import { DialogService } from 'src/app/services/Dialog.service';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import * as FieldDefinitionInterfaces from 'src/app/shared/menu-items/field-definition-interfaces'
import { FetchEntityDetails } from 'src/app/shared/menu-items/fetch-entity-details-interface';
import {Industries} from 'src/app/shared/menu-items/fetch-entity-details-interface';
import {LawCategories} from 'src/app/shared/menu-items/fetch-entity-details-interface';
import { EntityDataType } from 'src/app/shared/menu-items/entity-to-opunit-data-interface';
import { EncryptStorage } from 'encrypt-storage';
import { environment } from 'dotenv';

const ELEMENT_DATA: EntityInterfaces.BusinessDetails[] =[];
//const ELEMENT_DATA:EntityDataType[] =[];


function getMaxIdFromChildren(node: TreeNode): number {
  const rootChildren = treeDataitem.children;
  let maxId = 0;

  if (rootChildren && rootChildren.length > 0) {
    maxId = Math.max(...rootChildren.map(child => child.id));
  }
  return maxId;
}
function getCompanyName() {
  const encryptStorage = new EncryptStorage(environment.localStorageKey);
  const { user } = encryptStorage.getItem('login-details');
  const userCompanies = user.companies;
  const userCompanyName = userCompanies.length > 0 ? userCompanies[0]['name'] : '';
  return userCompanyName;
}

function getMaxIdFromGrandchildren(children: TreeNode): number {
  const rootChildren = children.children;

  let maxId = 0;
  if (rootChildren && rootChildren.length > 0) {
    maxId = Math.max(...rootChildren.map((child) => child.id));
  }
  return maxId;
}

@Component({
  selector: 'app-entity-table',
  templateUrl: './entity-table.component.html',
  styleUrls: ['./entity-table.component.scss'],
})

export class EntityTableComponent implements OnInit, OnDestroy{

  private subscription: Subscription;
  //private entityList: any;
  entityChild:TreeNode;

  constructor(public dialog: MatDialog, private router: Router, 
    private entityDialogService: DialogService, private apiService:ApiService, 
    private snackbar:SnackbarService) { }
  
  displayedColumns: string[] = EntityInterfaces.EntityColumns;
  dataSource = [...ELEMENT_DATA];

  @ViewChild(MatTable) table: MatTable<EntityInterfaces.BusinessDetails>;
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;

  @Input() entityTypesList: FieldDefinitionInterfaces.EntityTypes[];
  @Input() industryTypesList: FieldDefinitionInterfaces.IndustryActivies[];
  @Input() lawCategoriesList: FieldDefinitionInterfaces.komriskLawCategories[];
  @Input() countryList: number[];

  @Output() entitySelected = new EventEmitter<EntityDataType>(); 
  @Output() entitySelected1 = new EventEmitter<EntityDataType>();
  @Output() entityTableDataLoading = new EventEmitter<boolean>();
  @Output() isDotsButtonClicked = new EventEmitter<boolean>();

  ngOnInit(): void {
    // this.subscription = this.entityDialogService.openDialog$.subscribe(() => {
    //   this.viewAddEntityDialog();
    // });

    this.subscription = this.entityDialogService.openDialog$.subscribe((entity?:EntityInterfaces.BusinessDetails|null) => {
      console.log("Received entity firstly at subscription", entity);
      this.viewAddEntityDialog(entity);  // Pass the entity data to the function
    });

    //fetch entity list on the component's initiation 
    this.fetchEntityList();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  initialFormData: EntityInterfaces.BusinessDetails = {
    // position: 0,
    id: 0,
    name: '',
    country: 0,
    countryLabel: '',
    industry: [],
    industryLabel: '',
    entityType: 0,
    entityTypeLabel: '',
    // emailID: '',
    laws: '',
    lawModules: [],
    lawModulesLabel: [],
    operatingUnit: [],
    actions: '',
    childrenID: 0,
    entityList:[]
  };
  
  isTableEntitiesLoading:boolean=false;
  //isDotsButtonClicked : boolean

  


  fetchOperatingUnitChildren(entityResponseReceived:FetchEntityDetails, entityReceived:EntityInterfaces.BusinessDetails){  
    
    //console.log("RECEIVED entityResponse, entity", entityResponseReceived, entityReceived);
    //console.log("Children ID", entityReceived.childrenID);

    const childrenToAddGrandChildrenTo = treeDataitem.children?.find(
      (children) => children.id === entityReceived.childrenID
    );

    console.log("Child for adding ", childrenToAddGrandChildrenTo);
    if (childrenToAddGrandChildrenTo !== undefined) {
      // console.log("Grand Children", childrenToAddGrandChildrenTo);
      const maxId = getMaxIdFromGrandchildren(childrenToAddGrandChildrenTo);
      entityResponseReceived.operatingUnits.forEach((operatingUnit)=>{
        const opUnit = {
          id: maxId + 1,
          // label: 'Grandchild Node ' + String(maxId + 1),
          label: operatingUnit.name,
          children: [],
        };
        childrenToAddGrandChildrenTo?.children?.push(opUnit);
      })
    }
  }


  fetchEntityList() {
    
    treeDataitem.id = 1;
    treeDataitem.label = getCompanyName();
    treeDataitem.children = []

    this.entityTableDataLoading.emit(true);
    const entityFetchPayload = { company: 1 };
    try {
      this.apiService.postFetchEntityList(entityFetchPayload).subscribe((response) => {
        const entityList = response.data;
        console.log('entity data coming from api',response.data)
        // let position = 1;
        //let childrenID = 0;
        //console.log('Entity fetch response', entityList);
        entityList.forEach((entity: FetchEntityDetails) => {
          const maxId = getMaxIdFromChildren(treeDataitem);

          this.entityChild = {
            id: maxId + 1,
            //label: 'Child Node '+String(maxId+1),
            label: entity.name,
            children: []
          }

          const entityRow: EntityInterfaces.BusinessDetails = {
            ...this.initialFormData,
            // position: position,
            id: entity.id,
            name: entity.name,
            industry: entity.industries.map((industry: Industries) => industry.id),
            industryLabel: entity.industries.map((industry: Industries) => industry.name).join(","),
            entityType: entity.entityType.id,
            entityTypeLabel: entity.entityType.name,
            lawModules: entity.komriskLawCategories.map((law: LawCategories) => law.id),
            lawModulesLabel: entity.komriskLawCategories.map((law: LawCategories) => law.description),
            operatingUnit: entity.operatingUnits,
            country: 1,
            countryLabel: "India",
            // emailID: '',
            laws: '',
            actions: '',
            childrenID: this.entityChild.id
          };
          this.dataSource.push(entityRow);
          treeDataitem?.children?.push(this.entityChild);
          this.fetchOperatingUnitChildren(entity,entityRow);
          // position++;
        });
        this.table.renderRows(); // Ensure this is a MatTable instance
        this.entityTableDataLoading.emit(false);
      });
    } catch (error) {
      this.snackbar.showError("Some error occurred while fetching entity list!");
    }
  }

  viewAddEntityDialog(entity?:EntityInterfaces.BusinessDetails|null) {
    // console.log("Entity received in add entity dialog function",entity);
    this.openEntityDialog(entity);
  }
  
  treeDataItem = treeDataitem;

  addEntityData(formData: EntityInterfaces.FormData) {
    //console.log("Form data received to update", formData)
    const createEntityPayload  = {
        "id": formData.id,
        "name": formData.name,
        "company": 1,
        "entityType": formData.entityType,
        "entityTypeSearch": null,
        "industries": formData.industry,
        "komriskLawCategories": formData.lawModules
    }
    //console.log("Created payload for saving entity",createEntityPayload);
    try {
      this.apiService.postCreateEntity(createEntityPayload).subscribe((response) => {
        const entityResponse = response;
        //console.log("Entity Response after saving", entityResponse);
        this.snackbar.showSuccess('Entity successfully added.');
        location.reload();
      })
    }
   catch (error) {
    this.snackbar.showError("Some error occurred while fetching entity list.");
  }
  }

  // rearrangeDataSource() {
  //   this.dataSource.sort((a, b) => a.position - b.position);
  //   for (let i = 0; i < this.dataSource.length; i++) {
  //     this.dataSource[i].position = i + 1;
  //   }
  // }

  // removeEntityData(position: number) {
   
  //   const rowIndex = this.dataSource.findIndex(row => row.position === position);
  //   if (rowIndex !== -1) {
  //     this.dataSource.splice(rowIndex, 1);
  //     this.rearrangeDataSource();
  //     this.table.renderRows();
  //     treeDataitem?.children?.splice(rowIndex, 1)
  //   }
  // }

  openEntityDialog(entity?:EntityInterfaces.BusinessDetails | null) {
    //console.log("Entity send at openEntity intr.", entity);
    const dialogRef = this.dialog.open(AddEntityDialog, {
      data: { entityTable: this, entity: entity }
    });
  }

  openLawDialog() {
    const name: string = 'Law List';
    const dialogRef = this.dialog.open(ViewEntityLawsDialog, {
      data: { name: name }
    });
    dialogRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
    });
  }
  openOpDialog() {
    const name: string = 'Operating Unit List';
    const dialogRef = this.dialog.open(ViewEntityLawsDialog, {
      data: { name: name }
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
    });
  }

  navigateToAddOpUnit(entity: EntityDataType, action: string) {
    if (action === 'Add Operating Unit'){
      this.entitySelected.emit(entity);
      this.isDotsButtonClicked.emit(true)
    }
    else if (action === 'Add Operating Unit from Icon'){
      this.entitySelected.emit(entity)
      this.isDotsButtonClicked.emit(false)
    }
  }
  // navigateToAddOpUnit1(entity: EntityDataType) {
  //   this.entitySelected1.emit(entity);
  // }

  // entityToSend: any = {};
  entityToSend: EntityDataType ;

  openEntityMenuDialog(action: string, id: number) {
    switch (action) {
      case 'Delete':
        // this.removeEntityData(position);
        console.log("Entity delete option clicked.");
        break;
      case 'Add Operating Unit':
        //var entity = this.dataSource.find((entity) => entity.position === position);
        var entity = this.dataSource.find((entity) => entity.id === id);
        if(entity===undefined){
          this.snackbar.showError("Some error occurred while adding Operating Unit.")
        }
        else { 
          this.entityToSend = entity;
          
          this.entityToSend['entityList'] = this.dataSource.map((entity: EntityInterfaces.BusinessDetails) => {
            return {
              id: entity.id,
              name: entity.name
            };
          });

          //console.log("The sent entity in OP-Unit",this.entityToSend);
          this.navigateToAddOpUnit(this.entityToSend,'Add Operating Unit');
        }
        break

        case 'Add Operating Unit from Icon':
          var entity = this.dataSource.find((entity) => entity.id === id);
          if(entity===undefined){
            this.snackbar.showError("Some error occurred while adding Operating Unit.")
          }
          else { 
            this.entityToSend = entity;
            
            this.entityToSend['entityList'] = this.dataSource.map((entity: EntityInterfaces.BusinessDetails) => {
              return {
                id: entity.id,
                name: entity.name
              };
            });
  
            //console.log("The sent entity in OP-Unit",this.entityToSend);
            this.navigateToAddOpUnit(this.entityToSend,"Add Operating Unit from Icon");
          }
          break
      case 'Edit':
        //var entity = this.dataSource.find((entity) => entity.position === position);
        var entity = this.dataSource.find((entity) => entity.id === id);
        //console.log(entity);
        
        if(entity===undefined){
          this.snackbar.showError("Some error occurred while adding Operating Unit.")
        }
        else { 
          this.entityDialogService.emitOpenDialog(entity);
          //this.addEntityData(entity);
          //this.fetchEntityList();
        }
        break
      default:
        break;
    }
  }



  openCountryDialog(){
    console.log("Open Country dialog clicked!");
  }

  openIndustryDialog(){
    console.log("Open Industry dialog clicked!");
  }


  getImageSource(opUnitLength:number): string {
   // console.log('the image source',opUnitLength)
    return opUnitLength > 0 ? './assets/images/icons/Icons - Lex Kom LiteOperating_Unit.svg' : './assets/images/icons/Icons - Lex Kom LiteOperating_Unit_Unavailable.svg';
  }
  
}
