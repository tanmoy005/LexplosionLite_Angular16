import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// icons
// import { TablerIconsModule } from 'angular-tabler-icons';
// import * as TablerIcons from 'angular-tabler-icons/icons';

import { AuthenticationRoutes } from './authentication.routing';

import { AppSideLoginComponent } from '../guest-user/login/login.component';
import { AppSideRegisterComponent } from './register/register.component';
import { RegHeaderComponent } from './register/reg-header/reg-header.component';
import { VerifyEmailPageComponent } from './register/verify-email-page/verify-email-page.component';
import { MatDividerModule } from '@angular/material/divider';
import { MaterialModule } from '../material-module';
import { CommonComponentModule } from '../user-onboard/common-components/common-component.module';
//import { BusinessCardComponent } from '../user-onboard/common-components/business-card/business-card.component';

@NgModule({
  declarations: [
    AppSideRegisterComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AuthenticationRoutes),
    // MatIconModule,
    // MatCardModule,
    // MatInputModule,
    // MatCheckboxModule,
    // MatButtonModule,
    // MatDividerModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AppSideLoginComponent,
    RegHeaderComponent,
    VerifyEmailPageComponent,
    CommonComponentModule    
   // TablerIconsModule.pick(TablerIcons),
  ],
  
  exports: [
  ]
})
export class AuthenticationModule { }
