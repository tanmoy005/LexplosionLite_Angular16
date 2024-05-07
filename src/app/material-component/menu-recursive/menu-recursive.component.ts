import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterModule } from '@angular/router';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import { Menu } from 'src/app/shared/menu-items/menu-items';

@Component({
  selector: 'app-menu-recursive',
  standalone: true,
  imports:[DemoMaterialModule, NgFor, NgIf, RouterModule, CommonModule, MatIconModule,MatMenuModule],
  templateUrl: './menu-recursive.component.html',
  styleUrls: ['./menu-recursive.component.scss']
})

export class MenuRecursiveComponent {
  @Input() menuItems: Menu[]=[];
  constructor(private router: Router) { }
  navigate(path: string): void {
    if (path) {
      this.router.navigate([path]);
    }
    console.log('Navigate to:', path); // Implement navigation logic or use Angular Router
  }

  getMenu(item: Menu): any {
    console.log('Get menu',item)
    return item.submenu && item.submenu.length ? 'subMenu' : null;
  }
}