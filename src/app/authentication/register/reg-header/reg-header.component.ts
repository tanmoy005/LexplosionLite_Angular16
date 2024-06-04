import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reg-header',
  templateUrl: './reg-header.component.html',
  styleUrls: ['./reg-header.component.css'],
  standalone: true,
  imports: [MatDividerModule],
})
export class RegHeaderComponent {
  constructor(private router: Router) {}
  handleClickOnLogo() {
    this.router.navigate(['/home']);
  }
}
