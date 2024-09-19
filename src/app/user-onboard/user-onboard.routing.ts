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
import { authGuard } from '../auth.guard';
export const UserOnboardRoutes: Routes = [
  {
    path: 'laws',
    component: LawsTablePageComponent,
    canActivate: [authGuard],
  },
  {
    path: 'terms-condition',
    component: TermsConditionComponent,
    canActivate: [authGuard],
  },
  {
    path: 'payment',
    component: PaymentComponent,
    canActivate: [authGuard],
  },
  {
    path: 'common-component',
    component: CommonComponentsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'entity-details',
    component: EntityDetailsPageComponent,
    canActivate: [authGuard],
  },

  {
    path: 'entity',
    component: EntityComponent,
    canActivate: [authGuard],
  },
  {
    path: 'subscription',
    component: SubscriptionDetailsPageComponent,
    canActivate: [authGuard],
  },
  {
    path: 'operatingunit',
    component: OperatingUnitComponent,
    canActivate: [authGuard],
  },
  {
    path: 'golive',
    component: GoLivePageComponent,
    canActivate: [authGuard],
  },
  {
    // path: 'newuserVerification',
    path: 'verify',
    //path: '%23/verify',
    component: NewUserVerificationComponent,
  },
];
