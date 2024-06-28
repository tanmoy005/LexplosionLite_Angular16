import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as komriskFeaturesInterface from '../../shared/menu-items/demokomriskFeaturesList';
@Component({
  selector: 'app-subscription-details-page',
  templateUrl: './subscription-details-page.component.html',
  styleUrls: ['./subscription-details-page.component.scss'],
})
export class SubscriptionDetailsPageComponent implements OnInit {
  subscriptionFeaturesListTitle = 'Features';
  subscriptionFeaturesListShade = 'light';
  subscriptionType: string;

  komriskFeaturesList: komriskFeaturesInterface.komriskFeaturesInterface[];
  komriskLiteFeaturesList: komriskFeaturesInterface.komriskFeaturesInterface[];

  constructor(private router: Router) {}

  ngOnInit(): void {
    try {
      this.komriskLiteFeaturesList =
        komriskFeaturesInterface.demoKomriskAndKomriskLiteAPIFeaturesList.products[0].features;
      this.komriskFeaturesList =
        komriskFeaturesInterface.demoKomriskAndKomriskLiteAPIFeaturesList.products[1].features;
      this.subscriptionType = 'komriskLite';
    } catch (e) {
      
      this.komriskLiteFeaturesList = [];
      this.komriskFeaturesList = [];
    }
  }

  navigateToLawsPage(event: any) {
    this.router.navigate(['/laws']);
  }

  handleSubscriptionType(event: string) {
    this.subscriptionType = event;
  }

  navigateToEntityPage(event:any){
    this.router.navigate(['/entity-details'], { state: { entity: '' } });
  }
}
