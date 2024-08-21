import { Component, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MaterialModule } from 'src/app/material-module';
import { CommonModule } from '@angular/common';
import { UserAuthenticationService } from 'src/app/services/user-authentication.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SnackbarService } from 'src/app/shared/snackbar.service';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { EncryptStorage } from 'encrypt-storage';
import { environment, loginSource } from 'dotenv';
import { operatingUnitFetchDefinitions } from 'src/app/user-onboard/component-interfaces';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MaterialModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
  ],

  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppSideLoginComponent {
  constructor(
    private authService: UserAuthenticationService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private apiService: ApiService,
    private snackbar: SnackbarService,
    private opUnitFetchObj: operatingUnitFetchDefinitions
  ) {}

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  successdurationInSeconds = 2;
  failuredurationInSeconds = 4;
  usernameFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [Validators.required]);

  get username() {
    return this.usernameFormControl.value;
  }
  get password() {
    return this.passwordFormControl.value;
  }

  loginResponse: any;
  loginSource: string = loginSource;

  // THIS FUNCTION IS BEING MOVED IN AND EXPORTED FROM - src\app\user-onboard\component-interfaces.ts

  // fetchDefinitions() {
  //   const fieldPayload = [
  //     'entityTypes',
  //     'industryActivities',
  //     'states',
  //     'operatingUnitTypes',
  //     'komriskLawCategories',
  //   ];

  //   this.apiService.getFieldDefinition(fieldPayload).subscribe((response) => {
  //     const encryptStorage = new EncryptStorage(environment.localStorageKey);
  //     encryptStorage.setItem('entityTypes', response.data.entityTypes);
  //     encryptStorage.setItem(
  //       'industryActivities',
  //       response.data.industryActivities
  //     );
  //     encryptStorage.setItem('states', response.data.states);
  //     encryptStorage.setItem(
  //       'operatingUnitTypes',
  //       response.data.operatingUnitTypes
  //     );
  //     encryptStorage.setItem(
  //       'komriskLawCategories',
  //       response.data.komriskLawCategories
  //     );
  //   });
  // }

  handleLogin(event: any) {
    const loginPayload = {
      unique_key: this.username,
      password: this.password,
      source: this.loginSource,
    };

    // THIS FUNCTION IS BEING MOVED IN AND EXPORTED FROM - src\app\guest-user\login\login.component.ts
    // try {
    //   this.authService.userLogin(loginPayload).subscribe((response) => {
    //     this.snackbar.showSuccess('Login Successful!');
    //     const encryptStorage = new EncryptStorage(environment.localStorageKey);
    //     encryptStorage.setItem('login-details', response);
    //     //this.fetchDefinitions();
    //     this.opUnitFetchObj.fetchEntityOPUnitDefinitions();
    //     this.router.navigate(['/entity-details'], { state: { entity: '' } });
    //   });
    // } catch (error) {
    //   this.snackbar.showError('Some error occurred while logging you in!');
    // }

    this.authService.handleUserLogin(loginPayload);
  }
}
