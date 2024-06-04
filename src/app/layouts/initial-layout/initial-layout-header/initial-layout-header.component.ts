import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, Scroll } from '@angular/router';
import { Subscription } from 'rxjs';

interface menuItem {
  displayName: string;
  path: string;
}
@Component({
  selector: 'app-initial-layout-header',
  templateUrl: './initial-layout-header.component.html',
  styleUrls: ['./initial-layout-header.component.scss'],
})
export class InitialLayoutHeaderComponent implements OnInit, OnDestroy {
  private routerEventsSubscription: Subscription;
  selectedMenuItem: string | null = null;
  constructor(private router: Router) {}

  ngOnInit() {
    this.routerEventsSubscription = this.router.events.subscribe((event) => {
      if (event instanceof Scroll) {
        this.selectedMenuItem = event.routerEvent.url.replace('/', '');
      }
    });
  }
  ngOnDestroy() {
    this.routerEventsSubscription.unsubscribe();
  }

  menuItemList: menuItem[] = [
    {
      displayName: 'Home',
      path: 'home',
    },
    {
      displayName: 'About us',
      path: 'about-us',
    },
    {
      displayName: 'Features',
      path: 'features',
    },
    {
      displayName: 'Pricing',
      path: 'pricing',
    },
    {
      displayName: 'Partnership',
      path: 'partnership',
    },
    {
      displayName: 'Login',
      path: 'login',
    },
  ];
  handleMenuItemClick(path: string) {
    this.router.navigate([path]);
  }
}
