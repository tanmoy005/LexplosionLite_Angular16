import { Component, Inject, Input, OnInit } from '@angular/core';
import { DialogService } from 'src/app/services/Dialog.service';
import { CompanyStructureDialogueComponent } from './company-structure-dialogue/company-structure-dialogue.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-company-structure-card',
  templateUrl: './company-structure-card.component.html',
  styleUrls: ['./company-structure-card.component.scss']
})
export class CompanyStructureCardComponent implements OnInit {
  constructor(
    public dialog: MatDialog
  ) { }
  @Input() treeDataItem: any;
  @Input() activeLevel: number;

  companyStructureLabel = "Company Structure";
  companyStructureCardShade = "light";
  zoomLevel: number = 1;
  ngOnInit(): void {

  }

  zoomIn() {
    this.zoomLevel += 0.1;
  }

  zoomOut() {
    this.zoomLevel -= 0.1;
    if (this.zoomLevel < 0.1) {
      this.zoomLevel = 0.1;
    }
  }

  openFullScreen() {
    this.dialog.open(CompanyStructureDialogueComponent, {
      data: {
        treeDataItem: this.treeDataItem,
        activeLevel: this.activeLevel
      },
    });
  }
}
