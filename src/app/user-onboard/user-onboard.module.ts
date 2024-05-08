import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsComponent } from './common-components/common-components.component';
import { LawsTableComponent } from './laws-table/laws-table.component';
import { TermsConditionComponent } from './terms-condition/terms-condition.component';
import { PaymentComponent } from './payment/payment.component';
import { StepperComponent } from './common-components/stepper/stepper.component';
import { StepperHelperTextComponent } from './common-components/stepper-helper-text/stepper-helper-text.component';
import { TermsConditionCardComponent } from './common-components/terms-condition-card/terms-condition-card.component';
import { PaymentSectionComponent } from './common-components/payment-section/payment-section.component';



@NgModule({
  declarations: [
    CommonComponentsComponent,
    LawsTableComponent,
    TermsConditionComponent,
    PaymentComponent,
    StepperComponent,
    StepperHelperTextComponent,
    TermsConditionCardComponent,
    PaymentSectionComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UserOnboardModule { }
