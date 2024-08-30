import { Component } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-online-payment-dialog',
  templateUrl: './online-payment-dialog.component.html',
  styleUrls: ['./online-payment-dialog.component.scss'],
})
export class OnlinePaymentDialogComponent {
  constructor(public dialogRef: MatDialogRef<OnlinePaymentDialogComponent>) {}
  closeSuccessDialog() {
    console.log('close dialog clicked');
    // window.location.reload();
    this.dialogRef.close();
  }
}
