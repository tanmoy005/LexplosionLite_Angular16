import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-layout',
  templateUrl: './card-layout.component.html',
  styleUrls: ['./card-layout.component.scss'],
  // standalone: true
})
export class CardLayoutComponent {
  @Input() cardHeaderTitle: string;
  @Input() cardHeaderImage: string;
  @Input() shade: string;
}
