import { Component } from '@angular/core';
import { applicableLawsItems } from 'src/app/shared/menu-items/applicable-laws';
import { Router } from '@angular/router';


@Component({
  selector: 'app-laws-table-page',
  templateUrl: './laws-table.component.html',
  styleUrls: ['./laws-table.component.css']
})
export class LawsTablePageComponent {
  constructor(private router: Router){ }

  ApplicableLawsItems = applicableLawsItems

  navigateToPaymentPage(event:any){
    this.router.navigate(['/payment']);
  }
  

}
