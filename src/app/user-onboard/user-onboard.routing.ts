import { TermsConditionComponent } from './terms-condition-page/terms-condition.component';
import { PaymentComponent } from './payment-page/payment.component';
import { Routes } from '@angular/router';

import { LawsTableComponent } from './laws-table-page/laws-table.component';
import { CommonComponentsComponent } from './common-components/common-components.component';
 

export const UserOnboardRoutes: Routes = [
  {
    path: 'laws',
    component: LawsTableComponent,
  },
  {
    path: 'terms-condition',
    component: TermsConditionComponent,
  },
  {
    path: 'payment',
    component: PaymentComponent,
  },
  {
    path: 'common-component',
    component: CommonComponentsComponent,
  },
];

