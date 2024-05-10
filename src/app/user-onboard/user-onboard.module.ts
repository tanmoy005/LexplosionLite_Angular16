import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { CommonComponentsComponent } from './common-components/common-components.component';
import { LawsTableComponent } from './laws-table-page/laws-table.component';
import { TermsConditionComponent } from './terms-condition-page/terms-condition.component';
import { PaymentComponent } from './payment-page/payment.component';
import { StepperComponent } from './common-components/stepper/stepper.component';
import { StepperHelperTextComponent } from './common-components/stepper-helper-text/stepper-helper-text.component';
import { TermsConditionCardComponent } from './common-components/terms-condition-card/terms-condition-card.component';
import { PaymentSectionComponent } from './common-components/payment-section/payment-section.component';
import { UserOnboardRoutes } from './user-onboard.routing';
import { BusinessCardComponent } from './common-components/business-card/business-card.component';


@NgModule({
  declarations: [
    
    CommonComponentsComponent,
   
    LawsTableComponent,
    TermsConditionComponent,
    PaymentComponent,
    
    StepperHelperTextComponent,
    
    PaymentSectionComponent,
    
         
  ],
  imports: [
    CommonModule,
    TermsConditionCardComponent,
    StepperComponent,
    RouterModule.forChild(UserOnboardRoutes),
    BusinessCardComponent
    
    
  ],
  exports:[
    BusinessCardComponent
  ]
})
export class UserOnboardModule { }
