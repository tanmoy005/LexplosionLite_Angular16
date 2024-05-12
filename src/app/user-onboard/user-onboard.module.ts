import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { CommonComponentsComponent } from './common-components/common-components.component';
import { LawsTablePageComponent } from './laws-table-page/laws-table.component';
import { TermsConditionComponent } from './terms-condition-page/terms-condition.component';
import { PaymentComponent } from './payment-page/payment.component';
import { StepperComponent } from './common-components/stepper/stepper.component';
import { StepperHelperTextComponent } from './common-components/stepper-helper-text/stepper-helper-text.component';
import { TermsConditionCardComponent } from './common-components/terms-condition-card/terms-condition-card.component';
import { PaymentSectionComponent } from './common-components/payment-section/payment-section.component';
import { UserOnboardRoutes } from './user-onboard.routing';
import { BusinessCardComponent } from './common-components/business-card/business-card.component';

import { EntityTableComponent } from './common-components/entity-table/entity-table.component';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';

import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { OperatingUnitTableComponent } from './common-components/operating-unit-table/operating-unit-table.component';
import { FeaturesSectionComponent } from './common-components/features-section/features-section/features-section.component';
import { LawsTableComponent } from './common-components/laws-table/laws-table.component';



@NgModule({
  declarations: [
    
    CommonComponentsComponent,
  
    TermsConditionComponent,
    PaymentComponent,
    StepperHelperTextComponent,
    PaymentSectionComponent,
    PaymentSectionComponent,
    LawsTablePageComponent,
    
         
  ],
  
  imports: [
    CommonModule,
    TermsConditionCardComponent,
    StepperComponent,
    RouterModule.forChild(UserOnboardRoutes),
    BusinessCardComponent,
    FeaturesSectionComponent,
    
    EntityTableComponent,
    FormsModule,
    MatTableModule,
  
    MatDialogModule,
    OperatingUnitTableComponent,
    LawsTableComponent,
    
   
    
  ],
  exports:[
    BusinessCardComponent
  ]
})
export class UserOnboardModule { }
