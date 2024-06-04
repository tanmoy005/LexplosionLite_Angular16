import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dialog-layout',
  templateUrl: './dialog-layout.component.html',

  styleUrls: ['./dialog-layout.component.scss'],
})
export class DialogLayoutComponent {
  @Input() dialogHeaderTitle: string;
  @Input() dialogHeaderImage: string;
  shade = 'dark';
}
