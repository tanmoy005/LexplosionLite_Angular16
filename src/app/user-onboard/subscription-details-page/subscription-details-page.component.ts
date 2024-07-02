import { KomriskSelectedDialogComponent } from './komrisk-selected-dialog/komrisk-selected-dialog.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as komriskFeaturesInterface from '../../shared/menu-items/demokomriskFeaturesList';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { demoKomriskFeaturesListInterface } from './../../shared/menu-items/demokomriskFeaturesList';


@Component({
  selector: 'app-subscription-details-page',
  templateUrl: './subscription-details-page.component.html',
  styleUrls: ['./subscription-details-page.component.scss'],
})
export class SubscriptionDetailsPageComponent implements OnInit {
  subscriptionFeaturesListTitle = 'Features';
  subscriptionFeaturesListShade = 'light';
  subscriptionType: string;

  featureList : demoKomriskFeaturesListInterface;
  komriskFeaturesList: komriskFeaturesInterface.komriskFeaturesInterface[];
  komriskLiteFeaturesList: komriskFeaturesInterface.komriskFeaturesInterface[];

  constructor(private router: Router,public dialog: MatDialog,private apiService: ApiService,) {}

  ngOnInit(): void {
    // try {
    //   this.komriskLiteFeaturesList =
    //     komriskFeaturesInterface.demoKomriskAndKomriskLiteAPIFeaturesList.products[0].features;
    //   this.komriskFeaturesList =
    //     komriskFeaturesInterface.demoKomriskAndKomriskLiteAPIFeaturesList.products[1].features;
    //   this.subscriptionType = 'komriskLite';
    // } catch (e) {
      
    //   this.komriskLiteFeaturesList = [];
    //   this.komriskFeaturesList = [];
    // }
    this.subscriptionType = 'komriskLite';
    this.featureList = this.apiService.getDemoKomriskFeatureData();

  }

  navigateToLawsPage(event: any,subscriptionType: String) {
    //this.router.navigate(['/laws']);
    if (subscriptionType === "komrisk"){
      this.dialog.open(KomriskSelectedDialogComponent);
    }
    else if (subscriptionType === "komriskLite"){
      this.router.navigate(['/laws']);
    }
    }
    

  handleSubscriptionType(event: string) {
    this.subscriptionType = event;
  }

  navigateToEntityPage(event:any){
    this.router.navigate(['/entity-details'], { state: { entity: '' } });
  }
}
