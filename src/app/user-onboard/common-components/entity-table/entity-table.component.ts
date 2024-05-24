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

const ELEMENT_DATA: EntityInterfaces.BusinessDetails[] =[];

function getMaxIdFromChildren(node: TreeNode): number {
  const rootChildren = treeDataitem.children;
  let maxId = 0;

  if (rootChildren && rootChildren.length > 0) {
    maxId = Math.max(...rootChildren.map(child => child.id));
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
  private entityList: any;
  entityChild:TreeNode;

  constructor(public dialog: MatDialog, private router: Router, 
    private entityDialogService: DialogService, private apiService:ApiService, 
    private snackbar:SnackbarService) { }
  
  displayedColumns: string[] = EntityInterfaces.EntityColumns;
  dataSource = [...ELEMENT_DATA];

  @ViewChild(MatTable) table: MatTable<EntityInterfaces.BusinessDetails>;
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;

  @Input() entityTypesList: any;
  @Input() industryTypesList: any;
  @Input() lawCategoriesList: any;
  @Input() countryList: any;

  @Output() entitySelected = new EventEmitter<EntityInterfaces.BusinessDetails>();
  @Output() entitySelected1 = new EventEmitter<EntityInterfaces.BusinessDetails>();
  @Output() entityTableDataLoading = new EventEmitter<boolean>();

  ngOnInit(): void {
    this.subscription = this.entityDialogService.openDialog$.subscribe(() => {
      this.viewAddEntityDialog();
    });

    //fetch entity list on the component's initiation 
    this.fetchEntityList();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  initialFormData: EntityInterfaces.BusinessDetails = {
    position: 0,
    id: 0,
    name: '',
    country: 0,
    countryLabel: '',
    industry: [],
    industryLabel: '',
    entityType: 0,
    entityTypeLabel: '',
    emailID: '',
    laws: '',
    lawModules: [],
    lawModulesLabel: [],
    operatingUnit: [],
    actions: '',
    childrenID: 0,
  };
  
  isTableEntitiesLoading:boolean=false;

  fetchEntityList() {
    
    treeDataitem.id = 1;
    treeDataitem.label = 'Root Node'
    treeDataitem.children = []

    this.entityTableDataLoading.emit(true);
    const entityFetchPayload = { company: 1 };
    try {
      this.apiService.postFetchEntityList(entityFetchPayload).subscribe((response) => {
        const entityList = response.data;
        let position = 1;
        //let childrenID = 0;
        //console.log('Entity fetch response', entityList);
        entityList.forEach((entity: any) => {
          const maxId = getMaxIdFromChildren(treeDataitem);

          this.entityChild = {
            id: maxId + 1,
            label: 'Child Node '+String(maxId+1),
            children: []
          }

          const entityRow: EntityInterfaces.BusinessDetails = {
            ...this.initialFormData,
            position: position,
            id: entity.id,
            name: entity.name,
            industry: entity.industries.map((industry: any) => industry.id),
            industryLabel: entity.industries.map((industry: any) => industry.name).join(","),
            entityType: entity.entityType.id,
            entityTypeLabel: entity.entityType.name,
            lawModules: entity.komriskLawCategories.map((law: any) => law.id),
            lawModulesLabel: entity.komriskLawCategories.map((law: any) => law.description),
            operatingUnit: entity.operatingUnits,
            country: 1,
            countryLabel: "India",
            emailID: '',
            laws: '',
            actions: '',
            childrenID: this.entityChild.id
          };
          this.dataSource.push(entityRow);
          treeDataitem?.children?.push(this.entityChild);
          position++;
        });
        this.table.renderRows(); // Ensure this is a MatTable instance
        this.entityTableDataLoading.emit(false);
      });
    } catch (error) {
      this.snackbar.showError("Some error occurred while fetching entity list!");
    }
  }

  viewAddEntityDialog() {
    this.openEntityDialog();
  }
  
  treeDataItem = treeDataitem;

  addEntityData(formData: EntityInterfaces.FormData) {

    const createEntityPayload  = {
        "id": null,
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

  rearrangeDataSource() {
    this.dataSource.sort((a, b) => a.position - b.position);
    for (let i = 0; i < this.dataSource.length; i++) {
      this.dataSource[i].position = i + 1;
    }
  }

  removeEntityData(position: number) {
   
    const rowIndex = this.dataSource.findIndex(row => row.position === position);
    if (rowIndex !== -1) {
      this.dataSource.splice(rowIndex, 1);
      this.rearrangeDataSource();
      this.table.renderRows();
      treeDataitem?.children?.splice(rowIndex, 1)
    }
  }

  openEntityDialog() {
    const dialogRef = this.dialog.open(AddEntityDialog, {
      data: { entityTable: this }
    });
  }

  openLawDialog() {
    const name: string = 'Law List';
    const dialogRef = this.dialog.open(ViewEntityLawsDialog, {
      data: { name: name }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openOpDialog() {
    const name: string = 'Operating Unit List';
    const dialogRef = this.dialog.open(ViewEntityLawsDialog, {
      data: { name: name }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  navigateToAddOpUnit(entity: EntityInterfaces.BusinessDetails) {
    this.entitySelected.emit(entity);
    // console.log('dots are clicked');
  }
  navigateToAddOpUnit1(entity: EntityInterfaces.BusinessDetails) {
    this.entitySelected1.emit(entity);
  }

  entityToSend: any = {};

  openEntityMenuDialog(action: string, position: number) {
    switch (action) {
      case 'Delete':
        this.removeEntityData(position);
        break;
      case 'Add Operating Unit':
        var entity = this.dataSource.find((entity) => entity.position === position);
        if(entity===undefined){
          this.snackbar.showError("Some error occurred while adding Operating Unit.")
        }
        else { 
          this.entityToSend = entity;
          this.entityToSend['entityList'] = this.dataSource.map((entity: any) => {
            return {
              id: entity.id,
              name: entity.name
            };
          });

          //console.log("The sent entity in OP-Unit",this.entityToSend);
          this.navigateToAddOpUnit(this.entityToSend);
        }
        break
      case 'Edit':
        break
      default:
        break;
    }
  }

  openEntityMenuDialog1(action: string, position: number) {
    switch (action) {
      case 'Delete':
        this.removeEntityData(position);
        break;
      
     case 'Add Operating Unit':
        var entity = this.dataSource.find((entity) => entity.position === position);
        if(entity===undefined){
          this.snackbar.showError("Some error occurred while adding Operating Unit.")
        }
        else { 
          this.entityToSend = entity;
          this.entityToSend['entityList'] = this.dataSource.map((entity: any) => {
            return {
              id: entity.id,
              name: entity.name
            };
          });
          //console.log("The sent entity in OP-Unit",this.entityToSend);
          this.navigateToAddOpUnit1(this.entityToSend);
        }
        break

      case 'Edit':
        break
      default:
        break;
    }
  }


  getImageSource(element:any): string {
    return element.operatingUnit.length > 0 ? './assets/images/icons/Vectoroperating_unit_Icon.png' : './assets/images/icons/Vectordisabled_op_unit_icon.png';
  }
  
}
