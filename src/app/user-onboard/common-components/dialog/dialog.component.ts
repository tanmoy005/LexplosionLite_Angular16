import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { DemoMaterialModule } from 'src/app/demo-material-module';

@Component({
  selector: 'dialog-law-details',
  standalone: true,
  imports: [DemoMaterialModule, CommonModule, MatButtonModule, MatDialogModule],
  templateUrl:'./dialog-law-list.html'
})
export class DialogLawDetailsComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogLawDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
@Component({
  selector: 'dialog-department-details',
  standalone: true,
  imports: [DemoMaterialModule, CommonModule, MatButtonModule, MatDialogModule],
  templateUrl:'./dialog-dept-list.html'
})
export class DialogDepartmentDetailsComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogDepartmentDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [DialogLawDetailsComponent, DemoMaterialModule,  MatDialogModule, MatButtonModule],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

  //// to call a dialog component
  animal: string = '';
  name: string = 'Komrisk User';

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogLawDetailsComponent, {
      width: '250px',
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
  //// to call a dialog component
}
