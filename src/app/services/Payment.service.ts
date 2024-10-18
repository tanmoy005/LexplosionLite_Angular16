import { Injectable } from '@angular/core';

interface PaymentSharedData {
  amount: string;
  companyId: string;
  promoCode: string;
}
@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private sharedData: PaymentSharedData;

  constructor() {}

  setData(data: PaymentSharedData) {
    this.sharedData = data;
  }

  getData() {
    return this.sharedData;
  }
}
