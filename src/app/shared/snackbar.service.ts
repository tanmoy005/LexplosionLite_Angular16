import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(public snackBar: MatSnackBar) { }
  duration: 2000;
  showError(message: string) {
    this.snackBar.open(message, '', {
      duration: this.duration,
    });
    
  }
}
