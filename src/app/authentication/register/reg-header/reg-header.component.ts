import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuTrigger, MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-reg-header',
  templateUrl: './reg-header.component.html',
  styleUrls: ['./reg-header.component.css'],
  standalone: true,
  imports: [MatDividerModule, MatIconModule, MatMenuModule],
  encapsulation: ViewEncapsulation.None,
})
export class RegHeaderComponent {
  constructor(private router: Router) {}
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;

  handleClickOnLogo() {
    this.router.navigate(['/home']);
  }
}
