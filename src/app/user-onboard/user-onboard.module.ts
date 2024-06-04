import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { CommonComponentsComponent } from './common-components/common-components.component';
// import { LawsTableComponent } from './laws-table-page/laws-table.component';
import { TermsConditionComponent } from './terms-condition-page/terms-condition.component';
import { PaymentComponent } from './payment-page/payment.component';
import { UserOnboardRoutes } from './user-onboard.routing';

import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';

import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { EntityDetailsPageComponent } from './entity-details-page/entity-details-page.component';
//import { OpUnitDetailsPageComponent } from './op-unit-details-page/op-unit-details-page.component';
import {MatDividerModule} from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { LawsTablePageComponent } from './laws-table-page/laws-table.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RegHeaderComponent } from '../authentication/register/reg-header/reg-header.component';
import { SubscriptionDetailsPageComponent } from './subscription-details-page/subscription-details-page.component';
import { FeaturesComponent } from './subscription-details-page/features/features.component';
import { EntityComponent } from './entity/entity.component';
import { OperatingUnitComponent } from './operating-unit/operating-unit.component';
import { MatListModule } from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';

//import { BadgeComponentComponent } from './common-components/badge-component/badge-component.component';
import { FeatureHeaderComponent } from './subscription-details-page/feature-header/feature-header.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonComponentModule } from './common-components/common-component.module';
import { MaterialModule } from '../material-module';
import { GoLivePageComponent } from './go-live-page/go-live-page.component';
@NgModule({
  declarations: [
    
    CommonComponentsComponent,
    LawsTablePageComponent,
    TermsConditionComponent,
    PaymentComponent,
    EntityDetailsPageComponent,
   // OpUnitDetailsPageComponent,
    SubscriptionDetailsPageComponent,
    OperatingUnitComponent,
    EntityComponent,
   // BadgeComponentComponent,
    FeatureHeaderComponent,
    // ActivitiesListComponent,
    FeaturesComponent,
    GoLivePageComponent,
    
  ],
  
  imports: [
    CommonModule,
    RouterModule.forChild(UserOnboardRoutes),
    FormsModule,
    MatTableModule,
    MatDialogModule,
    MatDividerModule,
    MatCardModule,
    MatFormFieldModule,
    RegHeaderComponent,
    MatIconModule,
    MatListModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatButtonModule,
    CommonComponentModule,
    MaterialModule
  ],
  exports:[
    // BusinessCardComponent
    CommonComponentModule
  ]
})
export class UserOnboardModule { }
