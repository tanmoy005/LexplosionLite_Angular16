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
    this.dialogRef.close();
  }
  navigateToGoLivePage(mode: string) {
    this.dialogRef.close();
    this.router.navigate(['/golive'], { state: { mode: mode } });
  }
}
