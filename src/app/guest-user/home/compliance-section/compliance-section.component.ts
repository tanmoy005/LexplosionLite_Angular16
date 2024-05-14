import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-compliance-section',
  templateUrl: './compliance-section.component.html',
  styleUrls: ['./compliance-section.component.scss'],
  standalone: true
})
export class ComplianceSectionComponent {
  constructor( private router: Router) {}
  
  goToRegistrationPage(event: any){
    this.router.navigate(['/register']);
  }

}
