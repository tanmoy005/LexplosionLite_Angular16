import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-go-live-page',
  templateUrl: './go-live-page.component.html',
  styleUrls: ['./go-live-page.component.scss'],
})
export class GoLivePageComponent {
  constructor(private router: Router) {}
  workSpaceColumns: string[] = ['#', 'Name', 'Admin'];
  screenWidth: number;
  getCardSize(defaultHeight: number | string, defaultWidth: string | number) {
    if (this.screenWidth <= 1280) {
      return { height: '100%', width: '100%' };
    } else {
      return { height: defaultHeight, width: defaultWidth };
    }
  }

  goToSubscription() {
    this.router.navigate(['/payment']);

    // this.router.navigate(['/subscription'], { state: { entity: '' } });
  }
}
