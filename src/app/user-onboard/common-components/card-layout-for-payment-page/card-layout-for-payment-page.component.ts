import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-layout-for-payment-page',
  templateUrl: './card-layout-for-payment-page.component.html',
  styleUrls: ['./card-layout-for-payment-page.component.scss'],
})
export class CardLayoutForPaymentPageComponent {
  @Input() cardHeight: string | number;
  @Input() cardWidth: string | number;
}
