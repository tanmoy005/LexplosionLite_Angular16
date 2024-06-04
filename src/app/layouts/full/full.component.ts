import { MediaMatcher } from '@angular/cdk/layout';
import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  AfterViewInit,
  ViewChild,
  Renderer2,
  ElementRef,
} from '@angular/core';
import { MenuItems } from '../../shared/menu-items/menu-items';

/** @title Responsive sidenav */
@Component({
  selector: 'app-full-layout',
  templateUrl: 'full.component.html',
  styleUrls: [],
})
export class FullComponent implements OnDestroy, AfterViewInit {
  @ViewChild('sidenav') sidenav: ElementRef;
  isPartiallyClosed = false;
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;
  events: string[] = [];
  opened: boolean = true;
  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public menuItems: MenuItems,
    private renderer: Renderer2
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 1024px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  ngAfterViewInit() {}

  toggleSidebar() {
    this.isPartiallyClosed = !this.isPartiallyClosed;
    if (this.isPartiallyClosed) {
      this.renderer.removeClass(this.sidenav.nativeElement, 'opened');
      this.renderer.addClass(this.sidenav.nativeElement, 'closed');
    } else {
      this.renderer.removeClass(this.sidenav.nativeElement, 'closed');
      this.renderer.addClass(this.sidenav.nativeElement, 'opened');
    }
  }
}
