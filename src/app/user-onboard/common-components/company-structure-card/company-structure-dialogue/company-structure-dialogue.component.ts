import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogService } from 'src/app/services/Dialog.service';

@Component({
    selector: 'app-company-structure-dialogue',
    templateUrl: './company-structure-dialogue.component.html',
    styleUrls: ['./company-structure-dialogue.component.scss']
})
export class CompanyStructureDialogueComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA)
        public data: {
            treeDataItem: any;
            activeLevel: any;
        },
        public dialog: MatDialog,
        public dialogRef: MatDialogRef<CompanyStructureDialogueComponent>
    ) { }
    dialogHeaderTitle: string = 'Company Structure';
    treeDataItem: any;
    activeLevel: any;
    // Component logic goes here
    ngOnInit(): void {
        console.log('');
        this.initializeTreeData();
    }
    initializeTreeData() {
        this.treeDataItem = this.data.treeDataItem;
        this.activeLevel = this.data.activeLevel;
    }
    closeCompanyStructureDialog() {      
        this.dialogRef.close();
    }
}
