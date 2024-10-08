import { Subscription } from 'rxjs';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { ApiService } from 'src/app/services/api.service';

const ELEMENT_DATA: any[] = [
  { FEATURES: 1, DETAILS: 'Hydrogen', KOMRISK: 1.0079, KOMISK_LITE: 'H' },
  { FEATURES: 2, DETAILS: 'Helium', KOMRISK: 4.0026, KOMISK_LITE: 'He' },
  { FEATURES: 3, DETAILS: 'Lithium', KOMRISK: 6.941, KOMISK_LITE: 'Li' },
  { FEATURES: 4, DETAILS: 'Beryllium', KOMRISK: 9.0122, KOMISK_LITE: 'Be' },
  { FEATURES: 5, DETAILS: 'Boron', KOMRISK: 10.811, KOMISK_LITE: 'B' },
  { FEATURES: 6, DETAILS: 'Carbon', KOMRISK: 12.0107, KOMISK_LITE: 'C' },
  { FEATURES: 7, DETAILS: 'Nitrogen', KOMRISK: 14.0067, KOMISK_LITE: 'N' },
  { FEATURES: 8, DETAILS: 'Oxygen', KOMRISK: 15.9994, KOMISK_LITE: 'O' },
  { FEATURES: 9, DETAILS: 'Fluorine', KOMRISK: 18.9984, KOMISK_LITE: 'F' },
  { FEATURES: 10, DETAILS: 'Neon', KOMRISK: 20.1797, KOMISK_LITE: 'Ne' },
];

export class TableExpandableRowsExample {
  dataSource = ELEMENT_DATA;
  columnsToDisplay = ['name', 'weight', 'symbol', 'position'];
  expandedElement: PeriodicElement | null;
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  description: string;
}

const mainData = [
  {
    id: 1,
    name: 'Home/Dashboard',
    description: 'Features related to the home/dashboard module',
    komriskLite: true,
    komrisk: true,
    features: [
      {
        id: 1,
        name: 'Compliance Status Report',
        description:
          'The first report seen on the dashboard is Compliance Status Report...',
        komriskLite: true,
        komrisk: true,
      },
      {
        id: 2,
        name: 'Compliance Activity Report',
        description: 'The second chart shows triggered compliance tasks...',
        komriskLite: false,
        komrisk: true,
      },
      {
        id: 3,
        name: 'Impact analysis of compliances pending completion report',
        description:
          'The third chart is Impact Analysis of Pending Compliance Completion...',
        komriskLite: false,
        komrisk: true,
      },
    ],
  },
  {
    id: 2,
    name: 'Alerts',
    description: 'Features related to compliance alerts',
    komriskLite: true,
    komrisk: true,
    features: [
      {
        id: 18,
        name: 'Compliance Changes Alert',
        description: 'Alerts for compliance changes...',
        komriskLite: false,
        komrisk: true,
      },
    ],
  },
  {
    id: 3,
    name: 'Inbox',
    description: 'Features related to the inbox module',
    komriskLite: true,
    komrisk: true,
    features: [
      {
        id: 21,
        name: 'Compliance Tasks (Inbox)',
        description: 'Shows compliance tasks available in inbox...',
        komriskLite: true,
        komrisk: true,
      },
      {
        id: 22,
        name: 'Incident Tasks (Inbox)',
        description: 'Shows incident tasks in inbox...',
        komriskLite: false,
        komrisk: true,
      },
      {
        id: 23,
        name: 'Contingent Tasks (Inbox)',
        description: 'Shows contingent tasks in inbox...',
        komriskLite: false,
        komrisk: true,
      },
    ],
  },
];

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*', minHeight: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class FeaturesComponent implements OnInit {
  displayedColumns = ['FEATURES', 'DETAILS', 'KOMRISK', 'KOMISK_LITE'];
  dataSource = mainData;
  constructor(private apiService: ApiService) {}
  featuresList: any = [];
  restructuredData: any = [];
  subcriptionHighlighterHeight: number;
  subcriptionHighlighterPosition: number;

  @Input() SubscriptionType: string;
  @ViewChild('subcriptionTableRef') subcriptionTableRef!: ElementRef;
  @ViewChild('subcriptionHiglighterRef') subcriptionHiglighterRef!: ElementRef;
  private resizeObserver!: ResizeObserver;
  restructureFeaturesList() {
    this.featuresList.forEach((parentFeature: any) => {
      let mismatchFound = false;

      // Check if any of the child features have the mismatch
      parentFeature.features.forEach((feature: any) => {
        if (feature.komriskLite === false && feature.komrisk === true) {
          mismatchFound = true;
        }
      });

      // If a mismatch is found, restructure the parent data accordingly
      if (mismatchFound) {
        this.restructuredData.push({
          id: parentFeature.id,
          name: parentFeature.name,
          description: parentFeature.description,
          features: parentFeature.features,
          komriskLite: true,
          komrisk: false,
        });
      }
    });

    this.dataSource = this.restructuredData;
  }
  ngOnInit(): void {
    const payload = null;
    try {
      this.apiService.postFetchFeatureList(payload).subscribe((response) => {
        if (response) {
          //this.snackbar.showSuccess('OTP has been sent to your email');

          this.featuresList = response;
          this.restructureFeaturesList();
          // this.router.navigate(['/entity-details'], { state: { entity: '' } });
        }
      });
    } catch (e) {
      // this.snackbar.showError(
      //   'Some error occurred while creating your admin profile.'
      // );
    }
  }
  ngAfterViewInit() {
    const element = this.subcriptionTableRef.nativeElement;

    // Initialize the ResizeObserver to monitor height changes
    this.resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        this.subcriptionHighlighterHeight = entry.contentRect.height + 48;
      }
    });

    // Start observing the element
    this.resizeObserver.observe(element);

    this.setSubcriptionHighlighterPosition();
  }
  ngOnChanges(changes: any) {
    if (changes['SubscriptionType']) {
      this.setSubcriptionHighlighterPosition();
    }
  }
  ngOnDestroy() {
    // Clean up the observer when the component is destroyed
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }
  private setSubcriptionHighlighterPosition() {
    const subcriptionHighlighterWidth =
      this.subcriptionHiglighterRef.nativeElement.clientWidth;
    this.subcriptionHighlighterPosition =
      this.SubscriptionType === 'komriskLite'
        ? 0
        : subcriptionHighlighterWidth + 12;
  }
}
