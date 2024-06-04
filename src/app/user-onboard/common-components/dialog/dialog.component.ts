import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'dialog-law-details',

  templateUrl: './dialog-law-list.html',
})
export class DialogLawDetailsComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogLawDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
@Component({
  selector: 'dialog-department-details',

  templateUrl: './dialog-dept-list.html',
})
export class DialogDepartmentDetailsComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogDepartmentDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
