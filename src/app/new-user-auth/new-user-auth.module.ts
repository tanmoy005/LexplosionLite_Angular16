import { NewUserAuthRoutes } from './new-user-auth.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserVerificationComponent } from './user-verification/user-verification.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [UserVerificationComponent],
  imports: [CommonModule, RouterModule.forChild(NewUserAuthRoutes)],
})
export class NewUserAuthModule {}
