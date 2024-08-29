import { TermsConditionComponent } from './terms-condition-page/terms-condition.component';
import { PaymentComponent } from './payment-page/payment.component';
import { Routes } from '@angular/router';

import { LawsTablePageComponent } from './laws-table-page/laws-table.component';
import { CommonComponentsComponent } from './common-components/common-components.component';
import { EntityDetailsPageComponent } from './entity-details-page/entity-details-page.component';

import { EntityComponent } from './entity/entity.component';
import { SubscriptionDetailsPageComponent } from './subscription-details-page/subscription-details-page.component';
import { OperatingUnitComponent } from './operating-unit/operating-unit.component';
import { GoLivePageComponent } from './go-live-page/go-live-page.component';
import { NewUserVerificationComponent } from './new-user-verification/new-user-verification.component';

export const UserOnboardRoutes: Routes = [
  {
    path: 'laws',
    component: LawsTablePageComponent,
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
  {
    path: 'entity-details',
    component: EntityDetailsPageComponent,
  },

  {
    path: 'entity',
    component: EntityComponent,
  },
  {
    path: 'subscription',
    component: SubscriptionDetailsPageComponent,
  },
  {
    path: 'operatingunit',
    component: OperatingUnitComponent,
  },
  {
    path: 'golive',
    component: GoLivePageComponent,
  },
  {
    path: 'newuserVerification',
    component: NewUserVerificationComponent,
  },
];
