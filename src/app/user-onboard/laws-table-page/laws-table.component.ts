import { Component } from '@angular/core';
import { applicableLawsItems } from 'src/app/shared/menu-items/applicable-laws';
import { Router } from '@angular/router';
import { ApplicableLaws } from 'src/app/shared/menu-items/applicable-laws';

@Component({
  selector: 'app-laws-table-page',
  templateUrl: './laws-table.component.html',
  styleUrls: ['./laws-table.component.css']
})
export class LawsTablePageComponent {
  constructor(private router: Router){ }

  ApplicableLawsItems:ApplicableLaws[] = applicableLawsItems

  navigateToPaymentPage(event:any){
    this.router.navigate(['/payment']);
  }
  

}
