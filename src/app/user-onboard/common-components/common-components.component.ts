import { Component } from '@angular/core';
import { applicableLawsItems } from 'src/app/shared/menu-items/applicable-laws';


@Component({
  selector: 'app-common-components',
  templateUrl: './common-components.component.html',
  styleUrls: ['./common-components.component.scss']
})

export class CommonComponentsComponent {
  ApplicableLawsItems = applicableLawsItems
 
}
