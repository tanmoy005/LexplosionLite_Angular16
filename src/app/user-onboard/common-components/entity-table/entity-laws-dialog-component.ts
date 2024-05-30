import { Component } from '@angular/core';


@Component({
    selector: 'dialog-content-example-dialog',
    templateUrl: 'entity-law-details-dialog.html',
    // standalone: true,
    // imports: [MatDialogModule, MatButtonModule, MatListModule],
  })
  
  export class ViewEntityLawsDialog {
    data = {'name':'Laws'}
  }