import { Component } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offline-payment-dialog',
  templateUrl: './offline-payment-dialog.component.html',
  styleUrls: ['./offline-payment-dialog.component.scss'],
})
export class OfflinePaymentDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<OfflinePaymentDialogComponent>,
    private router: Router
  ) {}
  closeSuccessDialog() {
    console.log('close dialog clicked');
    // window.location.reload();
    this.dialogRef.close();
  }
  navigateToGoLivePage(event: any) {
    this.dialogRef.close();
    this.router.navigate(['/golive']);
  }
}