import { Component } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-offline-payment-dialog',
  templateUrl: './offline-payment-dialog.component.html',
  styleUrls: ['./offline-payment-dialog.component.scss'],
})
export class OfflinePaymentDialogComponent {
  constructor(public dialogRef: MatDialogRef<OfflinePaymentDialogComponent>) {}
  closeSuccessDialog() {
    console.log('close dialog clicked');
    // window.location.reload();
    this.dialogRef.close();
  }
}
