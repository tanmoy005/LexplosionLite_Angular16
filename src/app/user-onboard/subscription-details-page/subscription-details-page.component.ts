import { KomriskSelectedDialogComponent } from './komrisk-selected-dialog/komrisk-selected-dialog.component';
import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  AfterViewInit,
  ElementRef,
} from '@angular/core';
import { Router } from '@angular/router';
import * as komriskFeaturesInterface from '../../shared/menu-items/demokomriskFeaturesList';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { demoKomriskFeaturesListInterface } from './../../shared/menu-items/demokomriskFeaturesList';

import { StepperComponent } from '../common-components/stepper/stepper.component';

@Component({
  selector: 'app-subscription-details-page',
  templateUrl: './subscription-details-page.component.html',
  styleUrls: ['./subscription-details-page.component.scss'],
})
export class SubscriptionDetailsPageComponent implements OnInit, AfterViewInit {
  subscriptionFeaturesListTitle = 'Features';
  subscriptionFeaturesListShade = 'light';
  subscriptionType: string;

  featureList: demoKomriskFeaturesListInterface;
  komriskFeaturesList: komriskFeaturesInterface.komriskFeaturesInterface[];
  komriskLiteFeaturesList: komriskFeaturesInterface.komriskFeaturesInterface[];
  displayedColumns = ['Features', 'DETAILS', 'KOMRISK', 'KOMISK_LITE'];

  @ViewChild(StepperComponent, { static: false }) stepper: StepperComponent;
  @ViewChild('featureCardcontainerElement') containerElement!: ElementRef;

  ngAfterViewInit() {
    const containerHeight = this.containerElement.nativeElement.offsetHeight;

    // You can now use `containerHeight` as needed
  }

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private apiService: ApiService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subscriptionType = 'komriskLite';
    this.featureList = this.apiService.getDemoKomriskFeatureData();
    this.komriskLiteFeaturesList = this.featureList.products[0].features;
    this.komriskFeaturesList = this.featureList.products[1].features;
  }

  navigateToLawsPage(event: any, subscriptionType: String) {
    if (subscriptionType === 'komrisk') {
      this.dialog.open(KomriskSelectedDialogComponent);
    } else if (subscriptionType === 'komriskLite') {
      this.router.navigate(['/laws']);
    }
  }

  handleSubscriptionType(event: string) {
    this.subscriptionType = event;

    if (this.subscriptionType === 'komrisk') {
      this.stepper.stepCompletionStatus = false;
      this.stepper.stepCompletionMessage =
        'Please select the KomriskLite to proceed further.';
    } else {
      this.stepper.stepCompletionStatus = true;
    }
  }

  navigateToEntityPage(event: any) {
    this.router.navigate(['/entity-details'], { state: { entity: '' } });
  }
}
