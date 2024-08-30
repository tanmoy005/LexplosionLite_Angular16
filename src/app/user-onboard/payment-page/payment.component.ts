import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { StepperComponent } from '../common-components/stepper/stepper.component';
import { OfflinePaymentDialogComponent } from './offline-payment-dialog/offline-payment-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { OnlinePaymentDialogComponent } from './online-payment-dialog/online-payment-dialog.component';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent {
  constructor(private router: Router, public dialog: MatDialog) {}
  @ViewChild(StepperComponent, { static: false }) stepper: StepperComponent;

  colorPaymentDoneButton: string = '#42C997';
  navigateToGoLivePage(event: any) {
    this.router.navigate(['/golive']);
  }
  navigateToLawsPage(event: any) {
    this.router.navigate(['/laws']);
  }

  openOnlinePaymentDialog() {
    const dialogRef = this.dialog.open(OfflinePaymentDialogComponent);
    // dialogRef.componentInstance.isAddNewUserClickedModal.subscribe(() => {
    //   this.handleCancelClick();
    // });
  }
  openOfflinePaymentDialog() {
    const dialogRef = this.dialog.open(OnlinePaymentDialogComponent);
    // dialogRef.componentInstance.isAddNewUserClickedModal.subscribe(() => {
    //   this.handleCancelClick();
    // });
  }
}
