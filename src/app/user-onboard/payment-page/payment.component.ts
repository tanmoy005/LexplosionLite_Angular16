import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { StepperComponent } from '../common-components/stepper/stepper.component';
import { OfflinePaymentDialogComponent } from './offline-payment-dialog/offline-payment-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { OnlinePaymentDialogComponent } from './online-payment-dialog/online-payment-dialog.component';
import { ApiService } from 'src/app/services/api.service';
import { EncryptStorage } from 'encrypt-storage';
import { environment } from 'dotenv';
import { PaymentService } from 'src/app/services/Payment.service';
import { SnackbarService } from 'src/app/shared/snackbar.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent {
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private apiService: ApiService,
    private paymentService: PaymentService,
    private snackbar: SnackbarService
  ) {}
  @ViewChild(StepperComponent, { static: false }) stepper: StepperComponent;

  colorPaymentDoneButton: string = '#42C997';
  navigateToGoLivePage(event: any) {
    this.router.navigate(['/golive']);
  }
  navigateToLawsPage(event: any) {
    this.router.navigate(['/laws']);
  }

  openOnlinePaymentDialog() {
    const dialogRef = this.dialog.open(OnlinePaymentDialogComponent);
  }
  openOfflinePaymentDialog() {
    const dialogRef = this.dialog.open(OfflinePaymentDialogComponent);
  }
  handleClickOnOnlinePayment() {
    this.redirectUserToPaymentPage();
    this.openOnlinePaymentDialog();
  }
  private redirectUserToPaymentPage() {
    const { amount, promoCode, companyId } = this.paymentService.getData();
    try {
      this.apiService
        .initiatePayment(amount, companyId, promoCode)
        .subscribe((response) => {
          const { success, redirectUrl } = response;
          if (success) {
          }
        });
    } catch (error) {
      this.snackbar.showError('Some error occurred, please try again');
    }
  }
}
