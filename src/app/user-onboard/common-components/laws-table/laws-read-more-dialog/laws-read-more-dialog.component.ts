import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-laws-read-more-dialog',
  templateUrl: './laws-read-more-dialog.component.html',
  styleUrls: ['./laws-read-more-dialog.component.scss']
})
export class LawsReadMoreDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<LawsReadMoreDialogComponent>,
  ) { }
  closeDialog() {
    this.dialogRef.close();
  }
}
