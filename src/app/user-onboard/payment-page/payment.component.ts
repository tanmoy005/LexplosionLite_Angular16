import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {
  constructor(private router: Router){ }

  colorPaymentDoneButton:string="#42C997";

  navigateToGoLivePage(event:any){
    this.router.navigate(['/golive']);
  }
}
