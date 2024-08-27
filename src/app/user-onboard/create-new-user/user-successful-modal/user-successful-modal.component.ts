import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-successful-modal',
  templateUrl: './user-successful-modal.component.html',
  styleUrls: ['./user-successful-modal.component.scss'],
})
export class UserSuccessfulModalComponent {
  constructor(public dialogRef: MatDialogRef<UserSuccessfulModalComponent>) {}

  closeSuccessDialog() {
    console.log('close dialog clicked');
    this.dialogRef.close();
  }
}
