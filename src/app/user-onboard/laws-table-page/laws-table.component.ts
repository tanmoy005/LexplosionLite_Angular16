import { Component, OnInit } from '@angular/core';
import { applicableLawsItems } from 'src/app/shared/menu-items/applicable-laws';
import { Router } from '@angular/router';
import { ApplicableLaws } from 'src/app/shared/menu-items/applicable-laws';
import { EncryptStorage } from 'encrypt-storage';
import { environment } from 'dotenv';

import { ApiService } from 'src/app/services/api.service';
import { SnackbarService } from 'src/app/shared/snackbar.service';

function getCompanyId() {
  const encryptStorage = new EncryptStorage(environment.localStorageKey);
  //return encryptStorage.getItem('company-id');
  const { user } = encryptStorage.getItem('login-details');
  const userCompanies = user.companies;
  const userCompanyId = userCompanies.length > 0 ? userCompanies[0]['id'] : '';
  return userCompanyId;
}

@Component({
  selector: 'app-laws-table-page',
  templateUrl: './laws-table.component.html',
  styleUrls: ['./laws-table.component.css'],
})
export class LawsTablePageComponent implements OnInit {
  constructor(
    private router: Router,
    private apiService: ApiService,
    private snackbar: SnackbarService
  ) {
    const navigation = this.router.getCurrentNavigation();

    if (navigation && navigation.extras.state) {
      this.receivedData = navigation.extras.state;
      console.log('Received data:', navigation.extras.state);
      // this.businessName = this.stateData['businessname'];
    }
  }
  isLoading: boolean = false;
  receivedData: any;

  // ngOnInit(): void {
  //   const payload = {
  //     company: getCompanyId(),
  //   };
  //   if (this.receivedData) {
  //     Object.assign(payload, this.receivedData);
  //   }

  //   this.isLoading = true;
  //   try {
  //     this.apiService.postApplicableLaws(payload).subscribe((response) => {
  //       if (response) {
  //         console.log('the applicable laws', response.data);
  //         this.ApplicableLawsItems = response.data;
  //         this.isLoading = false;
  //       } else {
  //         this.isLoading = false;
  //       }
  //     });
  //   } catch (e) {
  //     this.snackbar.showError('Some error occurred while fetching Laws');
  //     this.isLoading = false;
  //   }
  // }
  ngOnInit(): void {
    const payload = {
      company: getCompanyId(),
    };
    if (this.receivedData) {
      Object.assign(payload, this.receivedData);
    }

    this.isLoading = true;

    this.apiService.postApplicableLaws(payload).subscribe(
      (response) => {
        if (response) {
          console.log('the applicable laws', response.data);
          this.ApplicableLawsItems = response.data;
        }
        this.isLoading = false; // Ensure loading spinner is turned off after successful response
      },
      (error) => {
        this.isLoading = false; // Turn off loading even if an error occurs
        if (error.status === 500) {
          this.snackbar.showError(
            'Internal Server Error (500): Failed to fetch applicable laws'
          );
        } else {
          this.snackbar.showError(
            'internal server error. please try again after a while.'
          );
        }
      }
    );
  }

  ApplicableLawsItems: ApplicableLaws[] = applicableLawsItems;

  navigateToPaymentsPage(event: any) {
    this.router.navigate(['/payment']);
  }

  navigateToFeaturesPage(event: any) {
    this.router.navigate(['/subscription']);
  }
}
