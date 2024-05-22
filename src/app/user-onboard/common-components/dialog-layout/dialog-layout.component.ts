import { Component, Input } from '@angular/core';
import { CardLayoutComponent } from '../card-layout/card-layout.component';

@Component({
  selector: 'app-dialog-layout',
  templateUrl: './dialog-layout.component.html',
  // standalone: true,
  styleUrls: ['./dialog-layout.component.scss'],
  // imports: [CardLayoutComponent]
})
export class DialogLayoutComponent {
  @Input() dialogHeaderTitle: string;
  @Input() dialogHeaderImage: string;
  shade = 'dark';
}
