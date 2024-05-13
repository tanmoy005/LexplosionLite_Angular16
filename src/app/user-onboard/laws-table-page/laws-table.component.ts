import { Component } from '@angular/core';
import { applicableLawsItems } from 'src/app/shared/menu-items/applicable-laws';


@Component({
  selector: 'app-laws-table-page',
  templateUrl: './laws-table.component.html',
  styleUrls: ['./laws-table.component.css']
})
export class LawsTablePageComponent {
  ApplicableLawsItems = applicableLawsItems

}
