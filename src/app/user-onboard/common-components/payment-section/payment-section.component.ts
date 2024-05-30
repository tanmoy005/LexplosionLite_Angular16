import { Component } from '@angular/core';

@Component({
  selector: 'app-payment-section',
  templateUrl: './payment-section.component.html',
  styleUrls: ['./payment-section.component.scss']
})
export class PaymentSectionComponent {
  paymentDetailsColumns: string[] = ["Item", "Particulars", "Rate", "Free Units"]
}
