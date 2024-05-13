import { Component } from '@angular/core';
import { InitialLayoutComponent } from 'src/app/layouts/initial-layout/initial-layout.component';
import { ComplianceSectionComponent } from './compliance-section/compliance-section.component';
import { AppSideRegisterComponent } from 'src/app/authentication/register/register.component';
import { AppSideLoginComponent } from 'src/app/authentication/login/login.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    ComplianceSectionComponent,
    // AppSideRegisterComponent,
    AppSideLoginComponent
    ],
})
export class HomeComponent {

}
