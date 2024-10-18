import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-layout',
  templateUrl: './dialog-layout.component.html',
  styleUrls: ['./dialog-layout.component.scss'],
})
export class DialogLayoutComponent {
  @Input() dialogHeaderTitle: string;
  @Input() dialogHeaderImage: string;

  @Input() shade: string = 'dark';
  @Input() isCrossPresent: boolean = false;
  @Input() currentDialog: MatDialogRef<any>;
}
