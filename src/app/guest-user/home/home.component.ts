import { Component } from '@angular/core';
import { ComplianceSectionComponent } from './compliance-section/compliance-section.component';
import { AppSideLoginComponent } from 'src/app/guest-user/login/login.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [ComplianceSectionComponent, AppSideLoginComponent],
})
export class HomeComponent {}
