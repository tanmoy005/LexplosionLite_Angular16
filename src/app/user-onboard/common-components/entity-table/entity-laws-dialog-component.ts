import { Component, ViewChild, Inject } from '@angular/core';
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from '@angular/material/list';


@Component({
    selector: 'dialog-content-example-dialog',
    templateUrl: 'entity-law-details-dialog.html',
    standalone: true,
    imports: [MatDialogModule, MatButtonModule, MatListModule],
  })
  
  export class ViewEntityLawsDialog {
    data = {'name':'Laws'}
  }