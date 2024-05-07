import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Menu, MenuItems } from '../../../shared/menu-items/menu-items';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MenuRecursiveComponent } from 'src/app/material-component/menu-recursive/menu-recursive.component';
import { ButtonsComponent } from 'src/app/material-component/buttons/buttons.component';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [DemoMaterialModule, NgFor, NgIf, RouterModule, CommonModule, MatIconModule, MenuRecursiveComponent,ButtonsComponent],
  templateUrl: './sidebar.component.html',
  styleUrls: []
})
export class AppSidebarComponent implements OnDestroy {
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;
  MenuDataItems: Menu[] = [];
  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public menuItems: MenuItems
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnInit() {
    this.MenuDataItems= this.menuItems.getMenuitem();
    // console.log(this.menuItems.getMenuitem);
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
