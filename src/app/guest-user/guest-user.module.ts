import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { GuestUserRoutes } from './guest-user.routing';
import { AppSideLoginComponent } from './login/login.component';



@NgModule({
  // declarations: [
  //   ComplianceSectionComponent
  // ],
  imports: [
    CommonModule,
    RouterModule.forChild(GuestUserRoutes),
    HomeComponent,
    AppSideLoginComponent
    // ComplianceSectionComponent
  ],
  providers: [],
})
export class GuestUserModule { }
