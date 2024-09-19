import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationRoutes } from './authentication.routing';
import { AppSideLoginComponent } from '../guest-user/login/login.component';
import { AppSideRegisterComponent } from './register/register.component';
import { RegHeaderComponent } from './register/reg-header/reg-header.component';
import { VerifyEmailPageComponent } from './register/verify-email-page/verify-email-page.component';
import { MaterialModule } from '../material-module';
import { CommonComponentModule } from '../user-onboard/common-components/common-component.module';
import { MatMenuModule } from '@angular/material/menu'; // Import MatMenuModule

@NgModule({
  declarations: [AppSideRegisterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(AuthenticationRoutes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AppSideLoginComponent,
    RegHeaderComponent,
    VerifyEmailPageComponent,
    CommonComponentModule,
    MatMenuModule,
  ],

  exports: [],
})
export class AuthenticationModule {}
