import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-company-structure-card',
  templateUrl: './company-structure-card.component.html',
  styleUrls: ['./company-structure-card.component.scss']
})
export class CompanyStructureCardComponent {
 @Input() treeDataItem:any;
 companyStructureLabel = "Company Structure";
 companyStructureCardShade = "light"
}
