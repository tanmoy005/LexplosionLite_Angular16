import { Injectable } from '@angular/core';

interface PaymentSharedData {
    amount: string;
    companyId: string;
    promoCode: string;
}
@Injectable({
  providedIn: 'root'  // This makes the service available application-wide
})
export class PaymentService {

  private sharedData: PaymentSharedData;

  constructor() { }

  // Method to set data
  setData(data: PaymentSharedData) {
    this.sharedData = data;
  }

  // Method to get data
  getData() {
    return this.sharedData;
  }
}
