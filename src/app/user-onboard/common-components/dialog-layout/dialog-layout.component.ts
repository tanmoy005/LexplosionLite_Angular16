import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dialog-layout',
  templateUrl: './dialog-layout.component.html',
  standalone: true,
  styleUrls: ['./dialog-layout.component.scss']
})
export class DialogLayoutComponent {
  @Input() dialogHeader: string;
}
