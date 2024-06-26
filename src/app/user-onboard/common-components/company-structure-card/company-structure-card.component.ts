// import { Component,Input } from '@angular/core';

// @Component({
//   selector: 'app-company-structure-card',
//   templateUrl: './company-structure-card.component.html',
//   styleUrls: ['./company-structure-card.component.scss']
// })
// export class CompanyStructureCardComponent {
//  @Input() treeDataItem:any;
//  companyStructureLabel = "Company Structure";
//  companyStructureCardShade = "light"
// }


import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-company-structure-card',
  templateUrl: './company-structure-card.component.html',
  styleUrls: ['./company-structure-card.component.scss']
})
export class CompanyStructureCardComponent {
  @Input() treeDataItem: any;
  //@Input() treeBase: number;
  companyStructureLabel = "Company Structure";
  companyStructureCardShade = "light";
  zoomLevel: number = 1;

  zoomIn() {
    this.zoomLevel += 0.1;
  }

  zoomOut() {
    this.zoomLevel -= 0.1;
    if (this.zoomLevel < 0.1) {
      this.zoomLevel = 0.1; 
    }
  }
}
