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
    }
  }
  isLoading: boolean = false;
  receivedData: any;

  ngOnInit(): void {
    this.setApplicableLaws();
  }

  ApplicableLawsItems: ApplicableLaws[] = applicableLawsItems;

  navigateToPaymentsPage(event: any) {
    this.router.navigate(['/payment']);
  }

  private setApplicableLaws() {
    try {
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
            this.ApplicableLawsItems = response.data;
          }
          this.isLoading = false;
        },
        (error) => {
          this.isLoading = false;
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
    } catch (error) {

    } finally {
      this.isLoading = true;
    }
  }

  navigateToFeaturesPage(event: any) {
    this.router.navigate(['/subscription']);
  }
}
