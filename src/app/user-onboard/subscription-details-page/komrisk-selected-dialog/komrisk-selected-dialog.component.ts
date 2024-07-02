import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-komrisk-selected-dialog',
  templateUrl: './komrisk-selected-dialog.component.html',
  styleUrls: ['./komrisk-selected-dialog.component.scss']
})
export class KomriskSelectedDialogComponent {
  constructor(private router: Router){}

  navigateToLandingPage(event: any){
    this.router.navigate(['/home']);
  }
}
