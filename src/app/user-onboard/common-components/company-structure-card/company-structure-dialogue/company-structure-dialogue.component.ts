import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogService } from 'src/app/services/Dialog.service';

@Component({
    selector: 'app-company-structure-dialogue',
    templateUrl: './company-structure-dialogue.component.html',
    styleUrls: ['./company-structure-dialogue.component.scss']
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
    ngAfterViewInit(): void {
        // Attach scroll event listener to the first scrollable element
        this.scrollBox1.nativeElement.addEventListener('scroll', this.handleScroll.bind(this, 'Box 1'));

        // Attach scroll event listener to the second scrollable element
        this.scrollBox2.nativeElement.addEventListener('scroll', this.handleScroll.bind(this, 'Box 2'));

        window.addEventListener('scroll', () => {
            console.log('The document is being scrolled');
        });
        const container = this.scrollContainer.nativeElement;

        // Calculate vertical center
        const scrollTopCenter = (container.scrollHeight - container.clientHeight) / 2;
        // Calculate horizontal center
        const scrollLeftCenter = (container.scrollWidth - container.clientWidth) / 2;

        // Set the scroll positions
        container.scrollTop = scrollTopCenter;
        container.scrollLeft = scrollLeftCenter;

        this.scrollContainer.nativeElement.addEventListener('scroll', this.handleScroll.bind(this, 'Box 1'));

        // Attach scroll event listener to the second scrollable element
        // this.scrollBox2.nativeElement.addEventListener('scroll', this.handleScroll.bind(this, 'Box 2'));

        // Optionally, detect scrolling on the window (document scrolling)
        window.addEventListener('scroll', () => {
            console.log('The document is being scrolled');
        });
    }

    handleScroll(boxName: string): void {
        console.log(`${boxName} is being scrolled`);
    }
    initializeTreeData() {
        this.treeDataItem = this.data.treeDataItem;
        this.activeLevel = this.data.activeLevel;
    }
    closeCompanyStructureDialog() {
        this.dialogRef.close();
    }
}
