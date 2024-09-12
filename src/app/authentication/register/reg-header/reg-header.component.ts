import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-reg-header',
  templateUrl: './reg-header.component.html',
  styleUrls: ['./reg-header.component.css'],
  standalone: true,
  imports: [MatDividerModule, MatIconModule],
})
export class RegHeaderComponent {
  constructor(private router: Router) {}
  handleClickOnLogo() {
    this.router.navigate(['/home']);
  }
}
