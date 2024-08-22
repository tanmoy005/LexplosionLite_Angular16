import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-payment-section',
  templateUrl: './payment-section.component.html',
  styleUrls: ['./payment-section.component.scss'],
})
export class PaymentSectionComponent {
  paymentDetailsColumns: string[] = [
    'Item',
    'Particulars',
    'Rate',
    'Free Units',
  ];

  screenWidth: number;

  constructor() {
    this.screenWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
  }

  // getCardSize(defaultHeight: string, defaultWidth: string) {
  //   if (this.screenWidth <= 1280) {
  //     return { height: '100%', width: '100%' };
  //   } else {
  //     return { height: defaultHeight, width: defaultWidth };
  //   }
  // }
  // getCardSize(defaultHeight: number, defaultWidth: number) {
  //   if (this.screenWidth <= 1280) {
  //     const height = window.innerHeight; // Total height of the screen in pixels
  //     const width = window.innerWidth; // Total width of the screen in pixels
  //     return { height, width };
  //   } else {
  //     return { height: defaultHeight, width: defaultWidth };
  //   }
  // }

  getCardSize(defaultHeight: number | string, defaultWidth: string | number) {
    if (this.screenWidth <= 1280) {
      return { height: '100%', width: '100%' };
    } else {
      return { height: defaultHeight, width: defaultWidth };
    }
  }
}
