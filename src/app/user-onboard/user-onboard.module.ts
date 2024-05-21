import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { CommonComponentsComponent } from './common-components/common-components.component';
// import { LawsTableComponent } from './laws-table-page/laws-table.component';
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
import { EntityDetailsPageComponent } from './entity-details-page/entity-details-page.component';
import { OpUnitDetailsPageComponent } from './op-unit-details-page/op-unit-details-page.component';
import {MatDividerModule} from '@angular/material/divider';
import { TreeStructureComponent } from './common-components/tree-structure/tree-structure.component';
import { MatCardModule } from '@angular/material/card';
import { FeaturesSectionComponent } from './common-components/features-section/features-section/features-section.component';
import { LawsTablePageComponent } from './laws-table-page/laws-table.component';
import { LawsTableComponent } from './common-components/laws-table/laws-table.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DropdownComponent } from './common-components/dropdown/dropdown.component';
import { EmployeeCountCardComponent } from './common-components/operating-unit-table/employee-count-card/employee-count-card.component';
import { AddNewOperatingUnitDialogComponent } from './common-components/operating-unit-table/add-new-operating-unit-dialog/add-new-operating-unit-dialog.component';
import { RegHeaderComponent } from '../authentication/register/reg-header/reg-header.component';
import { MatDivider } from '@angular/material/divider';
import { SubscriptionDetailsPageComponent } from './subscription-details-page/subscription-details-page.component';
import { FeaturesComponent } from './subscription-details-page/features/features.component';
import { TableHeaderComponent } from './common-components/table-header/table-add-header.component';
import { EntityComponent } from './entity/entity.component';
import { OperatingUnitComponent } from './operating-unit/operating-unit.component';
import { ActivitiesListComponent } from './common-components/activities-list/activities-list.component';
import { MatListModule } from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';

import { BadgeComponentComponent } from './common-components/badge-component/badge-component.component';
import { FeatureHeaderComponent } from './subscription-details-page/feature-header/feature-header.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
@NgModule({
  declarations: [
    
    CommonComponentsComponent,
    LawsTablePageComponent,
    TermsConditionComponent,
    PaymentComponent,
    StepperHelperTextComponent,
    PaymentSectionComponent,
    PaymentSectionComponent,
    EntityDetailsPageComponent,
    OpUnitDetailsPageComponent,
    SubscriptionDetailsPageComponent,
    OperatingUnitComponent,
    EntityComponent,
    BadgeComponentComponent,
    FeatureHeaderComponent,
    ActivitiesListComponent
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
    MatDividerModule,
    TreeStructureComponent,
    MatCardModule,
    LawsTableComponent,
    MatFormFieldModule,
    DropdownComponent,
    EmployeeCountCardComponent,
    AddNewOperatingUnitDialogComponent,
    RegHeaderComponent,
    TableHeaderComponent,
    MatIconModule,
    FeaturesComponent,
    MatListModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatButtonModule
  ],
  exports:[
    BusinessCardComponent
  ]
})
export class UserOnboardModule { }
