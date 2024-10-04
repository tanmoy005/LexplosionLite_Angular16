// import { Component, Input } from '@angular/core';

// @Component({
//   selector: 'app-dialog-layout',
//   templateUrl: './dialog-layout.component.html',

//   styleUrls: ['./dialog-layout.component.scss'],
// })
// export class DialogLayoutComponent {
//   @Input() dialogHeaderTitle: string;
//   @Input() dialogHeaderImage: string;
//   shade = 'dark';
// }

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

  // Set default value for shade to 'dark'
  @Input() shade: string = 'dark';
  @Input() isCrossPresent: boolean = false;
  @Input() currentDialog: MatDialogRef<any>;
}
