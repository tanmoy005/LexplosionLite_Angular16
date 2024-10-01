import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  FormBuilder,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { Router } from '@angular/router';

function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumeric = /[0-9]/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    const isValidLength = value.length >= 8;

    const passwordValid =
      hasUpperCase &&
      hasLowerCase &&
      hasNumeric &&
      hasSpecialChar &&
      isValidLength;

    return !passwordValid ? { passwordInvalid: true } : null;
  };
}

export function confirmPasswordValidator(
  passwordControl: AbstractControl
): ValidatorFn {
  return (confirmPasswordControl: AbstractControl): ValidationErrors | null => {
    const password = passwordControl.value;
    const confirmPassword = confirmPasswordControl.value;

    if (password !== confirmPassword) {
      return { passwordsMismatch: true };
    }
    return null;
  };
}

@Component({
  selector: 'app-new-user-verification',
  templateUrl: './new-user-verification.component.html',
  styleUrls: ['./new-user-verification.component.scss'],
})
export class NewUserVerificationComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private snackbar: SnackbarService,
    private router: Router
  ) {}

  token: string | null = null; // Variable to store the token

  ngOnInit(): void {
    // Retrieve the 'token' parameter from the URL
    this.route.queryParamMap.subscribe((params) => {
      this.token = params.get('token');
    });
  }

  passwordFormControl = new FormControl('', [
    Validators.required,
    passwordValidator(),
  ]);

  confirmPasswordFormControl = new FormControl('', [
    Validators.required,
    confirmPasswordValidator(this.passwordFormControl),
  ]);

  get password() {
    return this.passwordFormControl.value;
  }

  get confirmPassword() {
    return this.confirmPasswordFormControl.value;
  }

  handleSetPassword(event: any) {
    const payload = { token: this.token, newPassword: this.password };

    try {
      this.apiService.postNewUserVerification(payload).subscribe((response) => {
        if (response) {
          this.snackbar.showSuccess('Your Password is set');
          this.router.navigate(['/login']);
        }
      });
    } catch (e) {
      this.snackbar.showError('Some error occurred while setting Password');
    }
  }

  handleCancleClick(event: any) {
    this.router.navigate(['/login']);
  }
}
