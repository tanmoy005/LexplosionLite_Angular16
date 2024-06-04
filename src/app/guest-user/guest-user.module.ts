import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { GuestUserRoutes } from './guest-user.routing';
import { AppSideLoginComponent } from './login/login.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(GuestUserRoutes),
    HomeComponent,
    AppSideLoginComponent,
  ],
  providers: [],
})
export class GuestUserModule {}
