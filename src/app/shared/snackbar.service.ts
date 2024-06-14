import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(public snackBar: MatSnackBar) {}
 
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  showError(message: string ,  duration: number = 3000) {
    this.snackBar.open(message, 'close', {
      duration: duration,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
     
      panelClass: ['custom-error-snackbar'],
    });
  }

  showSuccess(message: string,  duration: number = 3000) {
    this.snackBar.open(message, 'close', {
      duration: duration,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    
      panelClass: ['custom-success-snackbar'],
    });
  }

  showInfo(message: string,  duration: number = 3000) {
    this.snackBar.open(message, 'close', {
      duration: duration,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      
      panelClass: ['custom-info-snackbar'],
    });
  }

  showWarning(message: string,  duration: number = 3000) {
    this.snackBar.open(message, 'close', {
      duration: duration,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      
      panelClass: ['custom-warning-snackbar'],
    });
  }
}
