import { Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { DialogService } from 'src/app/services/Dialog.service';
import { CompanyStructureDialogueComponent } from './company-structure-dialogue/company-structure-dialogue.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ZoomService } from 'src/app/services/Zoom-Service';

@Component({
  selector: 'app-company-structure-card',
  templateUrl: './company-structure-card.component.html',
  styleUrls: ['./company-structure-card.component.scss']
})
export class CompanyStructureCardComponent implements OnInit {
  // @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  constructor(
    public dialog: MatDialog,
    private zoomService: ZoomService
  ) { }
  @Input() treeDataItem: any;
  @Input() activeLevel: number;

  companyStructureLabel = "Company Structure";
  companyStructureCardShade = "light";
  zoomLevel: number;
  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    // Access the scroll container after the view has initialized
    // const container = this.scrollContainer.nativeElement;

    // // Calculate vertical center
    // const scrollTopCenter = (container.scrollHeight - container.clientHeight) / 2;
    // // Calculate horizontal center
    // const scrollLeftCenter = (container.scrollWidth - container.clientWidth) / 2;

    // // Set the scroll positions
    // container.scrollTop = scrollTopCenter;
    // container.scrollLeft = scrollLeftCenter;

    //   this.scrollContainer.nativeElement.addEventListener('scroll', this.handleScroll.bind(this, 'Box 1'));

    //   // Attach scroll event listener to the second scrollable element
    //   // this.scrollBox2.nativeElement.addEventListener('scroll', this.handleScroll.bind(this, 'Box 2'));

    //   // Optionally, detect scrolling on the window (document scrolling)
    //   window.addEventListener('scroll', () => {
    //     console.log('The document is being scrolled');
    //   });
    // }

    // handleScroll(boxName: string): void {
    //   console.log(`${boxName} is being scrolled`);
    // }

 
  }

  zoomIn() {
    this.zoomLevel = this.zoomService.zoomIn(this.zoomLevel); // Use service
  }

  zoomOut() {
    this.zoomLevel = this.zoomService.zoomOut(this.zoomLevel); // Use service
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
