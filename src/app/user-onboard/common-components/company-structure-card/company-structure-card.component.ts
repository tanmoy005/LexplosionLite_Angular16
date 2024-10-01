import {
  Component,
  ElementRef,
  Inject,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DialogService } from 'src/app/services/Dialog.service';
import { CompanyStructureDialogueComponent } from './company-structure-dialogue/company-structure-dialogue.component';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { ZoomService } from 'src/app/services/Zoom-Service';

@Component({
  selector: 'app-company-structure-card',
  templateUrl: './company-structure-card.component.html',
  styleUrls: ['./company-structure-card.component.scss'],
})
export class CompanyStructureCardComponent implements OnInit {
  constructor(public dialog: MatDialog, private zoomService: ZoomService) {}
  @Input() treeDataItem: any;
  @Input() activeLevel: number;

  companyStructureLabel = 'Company Structure';
  companyStructureCardShade = 'light';
  zoomLevel: number;
  ngOnInit(): void {}

  zoomIn() {
    this.zoomLevel = this.zoomService.zoomIn(this.zoomLevel);
  }

  zoomOut() {
    this.zoomLevel = this.zoomService.zoomOut(this.zoomLevel);
  }

  openFullScreen() {
    this.dialog.open(CompanyStructureDialogueComponent, {
      data: {
        treeDataItem: this.treeDataItem,
        activeLevel: this.activeLevel,
      },
    });
  }
}
