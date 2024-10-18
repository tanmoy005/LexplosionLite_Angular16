import { treeDataitem } from './../../../shared/menu-items/tree-items';
import {
  Component,
  ViewChild,
  ViewEncapsulation,
  Input,
  OnInit,
} from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuTrigger, MatMenuModule } from '@angular/material/menu';
import { EncryptStorage } from 'encrypt-storage';
import { environment } from 'dotenv';
import { CommonModule } from '@angular/common';

function getFirstName() {
  const encryptStorage = new EncryptStorage(environment.localStorageKey);

  const { user } = encryptStorage.getItem('login-details');
  const userFirstName = user.firstName;

  return userFirstName;
}
function getLastName() {
  const encryptStorage = new EncryptStorage(environment.localStorageKey);

  const { user } = encryptStorage.getItem('login-details');
  const userLastName = user.lastName;

  return userLastName;
}
@Component({
  selector: 'app-reg-header',
  templateUrl: './reg-header.component.html',
  styleUrls: ['./reg-header.component.css'],
  standalone: true,
  imports: [MatDividerModule, MatIconModule, MatMenuModule, CommonModule],
  encapsulation: ViewEncapsulation.None,
})
export class RegHeaderComponent implements OnInit {
  constructor(private router: Router) {}
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;
  @Input() isProfileActive: boolean = true;
  userName: string = 'Uername';
  ngOnInit(): void {
    this.userName = getFirstName() + ' ' + getLastName();
  }

  handleClickOnLogo() {
    this.router.navigate(['/home']);
  }

  handleClickOnLogOut() {
    const encryptStorage = new EncryptStorage(environment.localStorageKey);

    // Remove all necessary items from encryptStorage
    Promise.all([
      encryptStorage.removeItem('company-id'),
      encryptStorage.removeItem('login-details'),
      encryptStorage.removeItem('entityTypes'),
      encryptStorage.removeItem('states'),
      encryptStorage.removeItem('countries'),
      encryptStorage.removeItem('komriskLawCategories'),
      encryptStorage.removeItem('industryActivities'),
      encryptStorage.removeItem('operatingUnitTypes'),
      encryptStorage.removeItem('companyLaws'),
      encryptStorage.removeItem('token'),
    ])
      .then(() => {
        this.router.navigate(['/home']);
      })
      .catch((error) => {});
  }
}
