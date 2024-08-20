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
    private snackbar: SnackbarService
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
    // const payload = { otp: this.otp, email: this.stateData.email };
    // try {
    //   this.apiService.postVerifyOTP(payload).subscribe((response) => {
    //     if (response.success) {
    //       this.snackbar.showSuccess(
    //         'OTP verified successfully! You can login to your profile.'
    //       );
    //       this.router.navigate(['/login']);
    //     } else {
    //       this.snackbar.showError(
    //         'Some error occurred while verifying your email!'
    //       );
    //     }
    //   });
    // } catch (error) {
    //   this.snackbar.showError(
    //     'Some error occurred while verifying your email!'
    //   );
    // }

    this.router.navigate(['/login']);
  }

  handleBackToRegistration(event: any) {
    this.router.navigate(['/register']);
  }
}
