import { Component, ViewEncapsulation, OnInit } from '@angular/core';
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
  maskedEmail: string = '';

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
      this.maskedEmail = this.maskEmail(this.stateData.email);
    }
  }

  get otp() {
    return this.otpFormControl.value;
  }

  handleRegistration(event: any) {
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

  maskEmail(email: string): string {
    const [user, domain] = email.split('@');
    const maskedUser =
      user.slice(0, 4) + '*'.repeat(Math.max(user.length - 4, 0));
    const [domainName, domainExtension] = domain.split('.');
    const maskedDomain =
      domainName.slice(0, 2) + '*'.repeat(Math.max(domainName.length - 2, 0));
    return `${maskedUser}@${maskedDomain}.${domainExtension}`;
  }

  handleBackToRegistration(event: any) {
    this.router.navigate(['/register']);
  }
}
