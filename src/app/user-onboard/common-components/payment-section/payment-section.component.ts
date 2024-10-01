import { SnackbarService } from './../../../shared/snackbar.service';
import { Component, HostListener } from '@angular/core';
import { environment } from 'dotenv';
import { EncryptStorage } from 'encrypt-storage';
import { ApiService } from 'src/app/services/api.service';
import { PaymentService } from 'src/app/services/Payment.service';

interface SubscriptionPlan {
  label: string;
}
interface Tax {
  amount: string;
  itemId: number;
  name: string;
  rate: string;
}
interface PaymountAmount {
  amount: string;
  name: string;
}
function getCompanyId() {
  const encryptStorage = new EncryptStorage(environment.localStorageKey);
  //return encryptStorage.getItem('company-id');
  const { user } = encryptStorage.getItem('login-details');
  const userCompanies = user.companies;
  const userCompanyId = userCompanies.length > 0 ? userCompanies[0]['id'] : '';
  return userCompanyId;
}
// function setNetPayableAmount() {
//   // Retrieve the login details from encrypted storage
//   const encryptStorage = new EncryptStorage(environment.localStorageKey);
//     encryptStorage.setItem('payment-details', companyId);
// }
@Component({
  selector: 'app-payment-section',
  templateUrl: './payment-section.component.html',
  styleUrls: ['./payment-section.component.scss'],
})
export class PaymentSectionComponent {
  constructor(
    private apiService: ApiService,
    private paymentService: PaymentService,
    private snackbar: SnackbarService
  ) {
    this.screenWidth = window.innerWidth;
  }
  orderHeaders: [] = [];
  paymentDetailsColumns: string[] = [];
  orderData: string[] = [];
  paymentDetailsColClass: string;
  subsriptionPlanList: SubscriptionPlan[] = [
    {
      label: 'Monthly',
    },
    {
      label: 'Yearly',
    },
  ];
  netPayableAmount: string;
  total: PaymountAmount;
  subTotal: PaymountAmount;
  taxes: Tax[] = [];
  promoCode: string = 'null';
  companyId: string = getCompanyId();

  ngOnInit(): void {
    this.setOrderDetails();
  }
  selectedOption: string | null = null;
  screenWidth: number;

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
  updateSubscriptionPeriod(subscriptionPlanLabel: string) {
    if (this.selectedOption === subscriptionPlanLabel) {
      this.selectedOption = null;
    } else {
      this.selectedOption = subscriptionPlanLabel;
    }
  }
  setOrderDetails() {
    const payload = {
      company_id: this.companyId,
    };

    try {
      this.apiService.getOrderDetails(payload).subscribe((response) => {
        if (response) {
          const { orderHeaders, orderData, orderSummary } = response;
          const { netPayableAmount, total, subTotal, tax } = orderSummary;
          this.paymentDetailsColumns = orderHeaders;
          this.orderData = orderData;
          this.paymentDetailsColClass = `col-${String(
            12 / orderHeaders.length
          )}`;
          this.netPayableAmount = netPayableAmount;
          this.total = total;
          this.subTotal = subTotal;
          this.taxes = tax;
          this.storePaymentInitiationData(netPayableAmount);
        }
      });
    } catch (e) {
      this.snackbar.showError('Some error occurred, try again.');
    }
  }
  storePaymentInitiationData(amount: string) {
    const paymentInitiationData = {
      amount: amount,
      companyId: this.companyId,
      promoCode: this.promoCode,
    };
    this.paymentService.setData(paymentInitiationData);
  }
}
