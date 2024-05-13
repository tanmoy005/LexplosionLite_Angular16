import { Component } from '@angular/core';
import { Router } from '@angular/router';


interface menuItem {
  displayName: string;
  path: string;
}
@Component({
  selector: 'app-initial-layout-header',
  templateUrl: './initial-layout-header.component.html',
  styleUrls: ['./initial-layout-header.component.scss'],
  // standalone: true
})

export class InitialLayoutHeaderComponent {
  constructor(private router: Router) {}
  menuItemList: menuItem[] = [
    {
      displayName: 'Home',
      path: 'home'
    },
    {
      displayName: 'About us',
      path: 'about-us'
    },
    {
      displayName: 'Features',
      path: 'features'
    },
    {
      displayName: 'Pricing',
      path: 'pricing'
    },
    {
      displayName: 'Partnership',
      path: 'partnership'
    },
    {
      displayName: 'Login',
      path: 'login'
    }
  ]
  
  handleMenuItemClick(path: string) {
    this.router.navigate([path])
  }
}
