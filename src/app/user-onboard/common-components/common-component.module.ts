import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogLayoutComponent } from './dialog-layout/dialog-layout.component';
import { CardLayoutComponent } from './card-layout/card-layout.component';
import { AddEntityDialog } from './entity-table/add-entity-dialog-component';
import { ViewEntityLawsDialog } from './entity-table/entity-laws-dialog-component';
import { BusinessCardComponent } from './business-card/business-card.component';
import {
  DialogDepartmentDetailsComponent,
  DialogLawDetailsComponent,
} from './dialog/dialog.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { EntityTableComponent } from './entity-table/entity-table.component';
import { FeaturesSectionComponent } from './features-section/features-section/features-section.component';
import { LawsTableComponent } from './laws-table/laws-table.component';
import { AddNewOperatingUnitDialogComponent } from './operating-unit-table/add-new-operating-unit-dialog/add-new-operating-unit-dialog.component';
import { EmployeeCountCardComponent } from './operating-unit-table/employee-count-card/employee-count-card.component';
import { OperatingUnitTableComponent } from './operating-unit-table/operating-unit-table.component';
import { PaymentSectionComponent } from './payment-section/payment-section.component';
import { StepperComponent } from './stepper/stepper.component';
import { StepperHelperTextComponent } from './stepper-helper-text/stepper-helper-text.component';
import { TableHeaderComponent } from './table-header/table-add-header.component';
import { TermsConditionCardComponent } from './terms-condition-card/terms-condition-card.component';
import { TreeStructureComponent } from './tree-structure/tree-structure.component';
import { MaterialModule } from 'src/app/material-module';
import { FormsModule } from '@angular/forms';
import { CompanyStructureCardComponent } from './company-structure-card/company-structure-card.component';
import { ActivitiesListComponent } from './activities-list/activities-list.component';
import { OpUnitLawsDialogComponent } from './operating-unit-table/op-unit-laws-dialog/op-unit-laws-dialog.component';
import { LawsReadMoreDialogComponent } from './laws-table/laws-read-more-dialog/laws-read-more-dialog.component';
import { CardLayoutForPaymentPageComponent } from './card-layout-for-payment-page/card-layout-for-payment-page.component';
import { IndustryDialogComponent } from './entity-table/industry-dialog/industry-dialog.component';
import { CompanyStructureDialogueComponent } from './company-structure-card/company-structure-dialogue/company-structure-dialogue.component';

@NgModule({
  declarations: [
    BusinessCardComponent,
    DialogDepartmentDetailsComponent,
    DialogLawDetailsComponent,
    DialogLayoutComponent,
    DropdownComponent,
    CardLayoutComponent,
    AddEntityDialog,
    ViewEntityLawsDialog,
    EntityTableComponent,
    FeaturesSectionComponent,
    LawsTableComponent,
    AddNewOperatingUnitDialogComponent,
    EmployeeCountCardComponent,
    OperatingUnitTableComponent,
    PaymentSectionComponent,
    StepperComponent,
    StepperHelperTextComponent,
    TableHeaderComponent,
    TermsConditionCardComponent,
    TreeStructureComponent,
    CompanyStructureCardComponent,
    ActivitiesListComponent,
    OpUnitLawsDialogComponent,
    LawsReadMoreDialogComponent,
    CardLayoutForPaymentPageComponent,
    IndustryDialogComponent,
    CompanyStructureDialogueComponent
  ],
  imports: [CommonModule, MaterialModule, FormsModule],
  exports: [
    StepperComponent,
    TableHeaderComponent,
    EntityTableComponent,
    TreeStructureComponent,
    BusinessCardComponent,
    StepperHelperTextComponent,
    OperatingUnitTableComponent,
    DialogLayoutComponent,
    CardLayoutComponent,
    FeaturesSectionComponent,
    DropdownComponent,
    CompanyStructureCardComponent,
    LawsTableComponent,
    ActivitiesListComponent,
    PaymentSectionComponent,
    CardLayoutForPaymentPageComponent,
  ],
})
export class CommonComponentModule {}
