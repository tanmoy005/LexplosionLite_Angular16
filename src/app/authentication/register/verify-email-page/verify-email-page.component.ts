import { Component, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RegHeaderComponent } from '../reg-header/reg-header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormsModule,
  ReactiveFormsModule,
  FormControl,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from 'src/app/services/api.service';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { loginSource } from 'dotenv';
import { UserAuthenticationService } from 'src/app/services/user-authentication.service';
@Component({
  selector: 'app-verify-email-page',
  templateUrl: './verify-email-page.component.html',
  styleUrls: ['./verify-email-page.component.css'],
  standalone: true,
  imports: [
    RegHeaderComponent,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class VerifyEmailPageComponent {
  stateData: any;
  businessName: string;
  otpFormControl = new FormControl('', [Validators.required]);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private snackbar: SnackbarService,
    private authService: UserAuthenticationService
  ) {
    const navigation = this.router.getCurrentNavigation();

    if (navigation && navigation.extras.state) {
      this.stateData = navigation.extras.state;
      this.businessName = this.stateData['businessname'];
    }
  }

  get otp() {
    return this.otpFormControl.value;
  }

  handleRegistration(event: any) {
    // // UNCOMMENT THIS PORTION WHEN THE "VERIFY OTP" API IS READY
    // // const payload = { otp: this.otp, email: this.stateData.email };
    // // try {
    // //   this.apiService.postVerifyOTP(payload).subscribe((response) => {
    // //     if (response.success) {
    // //       this.snackbar.showSuccess(
    // //         'OTP verified successfully! You can login to your profile.'
    // //       );
    // //       const usernameParts = this.stateData.username?.trim().split(' ') || [
    // //         '',
    // //       ];
    // //       const payload = {
    // //         name: this.stateData.username,
    // //         description: this.stateData.headquarterAddress,
    // //         firstName: usernameParts[0] || '', // First word as the first name
    // //         lastName: usernameParts.slice(1).join(' ') || '', // Remaining words as the last name
    // //         email: this.stateData.email,
    // //         mobile: this.stateData.phoneNumber,
    // //         password: this.stateData.password,
    // //         source: loginSource,
    // //       };
    // //       try {
    // //         this.apiService
    // //           .postCreateAdminCompany(payload)
    // //           .subscribe((response) => {
    // //             if (response.success) {
    // //               const payload = {
    // //                 unique_key: this.stateData.username,
    // //                 password: this.stateData.password,
    // //                 source: loginSource,
    // //               };
    // //               this.authService.handleUserLogin(payload);
    // //             }
    // //           });
    // //       } catch (e) {
    // //         this.snackbar.showError(
    // //           'Some error occurred while creating your admin profile.'
    // //         );
    // //       }
    // //       //this.router.navigate(['/login']);
    // //     } else {
    // //       this.snackbar.showError(
    // //         'Some error occurred while verifying your email!'
    // //       );
    // //     }
    // //   });
    // // } catch (error) {
    // //   this.snackbar.showError(
    // //     'Some error occurred while verifying your email!'
    // //   );
    // // }
    // // COMMENT OR THIS PORTION AS FOR NOW, JUST ADMIN AND COMPANY CREATION TAKES PLACE
    // const usernameParts = this.stateData.username?.trim().split(' ') || [''];
    // const payload = {
    //   name: this.stateData.username,
    //   description: this.stateData.headquarterAddress,
    //   firstName: usernameParts[0] || '',
    //   lastName: usernameParts.slice(1).join(' ') || '',
    //   email: this.stateData.email,
    //   mobile: this.stateData.phoneNumber,
    //   password: this.stateData.password,
    //   source: loginSource,
    //   countries: [1],
    // };
    // try {
    //   this.apiService.postCreateAdminCompany(payload).subscribe((response) => {
    //     if (response.success) {
    //       const payload = {
    //         unique_key: this.stateData.email,
    //         password: this.stateData.password,
    //         source: loginSource,
    //       };
    //       this.authService.handleUserLogin(payload);
    //     }
    //   });
    // } catch (e) {
    //   this.snackbar.showError(
    //     'Some error occurred while creating your admin profile.'
    //   );
    // }
    // UNCOMMENT THIS PORTION AND COMMENT OTHER ONES IF ONLY ROUTING IS WHAT YOU WANT TO ENABLE
    // this.router.navigate(['/login']);
    const payload = { otp: this.otp, email: this.stateData.email };
    try {
      this.apiService.postVerifyOTP(payload).subscribe((response) => {
        if (response) {
          this.router.navigate(['/entity-details'], { state: { entity: '' } });
        }
      });
    } catch (e) {
      this.snackbar.showError(
        'Some error occurred while creating your admin profile.'
      );
    }

    // this.router.navigate(['/entity-details'], { state: { entity: '' } });
  }

  handleBackToRegistration(event: any) {
    this.router.navigate(['/register']);
  }
}
