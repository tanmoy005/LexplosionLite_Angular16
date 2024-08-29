import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  FormBuilder,
} from '@angular/forms';

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
export class NewUserVerificationComponent {
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
}
