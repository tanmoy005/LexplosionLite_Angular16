import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { DialogService } from 'src/app/services/Dialog.service';
import { ZoomService } from 'src/app/services/Zoom-Service';

@Component({
  selector: 'app-company-structure-dialogue',
  templateUrl: './company-structure-dialogue.component.html',
  styleUrls: ['./company-structure-dialogue.component.scss'],
})
export class CompanyStructureDialogueComponent {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  @ViewChild('scrollBox1') scrollBox1!: ElementRef;
  @ViewChild('scrollBox2') scrollBox2!: ElementRef;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      treeDataItem: any;
      activeLevel: any;
    },
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<CompanyStructureDialogueComponent>,
    private zoomService: ZoomService
  ) {}
  dialogHeaderTitle: string = 'Company Structure';
  treeDataItem: any;
  activeLevel: any;
  zoomLevel: number = 1;

  ngOnInit(): void {
    this.initializeTreeData();
  }
  ngAfterViewInit(): void {
    this.scrollBox1?.nativeElement.addEventListener(
      'scroll',
      this.handleScroll.bind(this, 'Box 1')
    );

    this.scrollBox2?.nativeElement.addEventListener(
      'scroll',
      this.handleScroll.bind(this, 'Box 2')
    );

    window.addEventListener('scroll', () => {});
    const container = this.scrollContainer.nativeElement;

    const scrollTopCenter =
      (container.scrollHeight - container.clientHeight) / 2;

    const scrollLeftCenter =
      (container.scrollWidth - container.clientWidth) / 2;

    container.scrollTop = scrollTopCenter;
    container.scrollLeft = scrollLeftCenter;

    this.scrollContainer.nativeElement.addEventListener(
      'scroll',
      this.handleScroll.bind(this, 'Box 1')
    );

    window.addEventListener('scroll', () => {});
  }

  handleScroll(boxName: string): void {}
  initializeTreeData() {
    this.treeDataItem = this.data.treeDataItem;
    this.activeLevel = this.data.activeLevel;
  }
  closeCompanyStructureDialog() {
    this.dialogRef.close();
  }
  zoomIn() {
    this.zoomLevel = this.zoomService.zoomIn(this.zoomLevel);
  }

  zoomOut() {
    this.zoomLevel = this.zoomService.zoomOut(this.zoomLevel);
  }
}
