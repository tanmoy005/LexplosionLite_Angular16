import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-card-layout',
  templateUrl: './card-layout.component.html',
  styleUrls: ['./card-layout.component.scss'],
})
export class CardLayoutComponent {
  @Input() cardHeaderTitle: string;
  @Input() cardHeaderImage: string;
  @Input() shade: string;
  @Input() headerRequired: boolean = true;
  @Input() isCrossRequired: boolean = false;
  @Input() currentDialog: MatDialogRef<any>;

  handleCloseDialog() {
    this.currentDialog.close();
  }
}
