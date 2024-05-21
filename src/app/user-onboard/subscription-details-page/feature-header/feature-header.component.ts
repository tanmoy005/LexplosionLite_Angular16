import { Component } from '@angular/core';

@Component({
  selector: 'app-feature-header',
  templateUrl: './feature-header.component.html',
  styleUrls: ['./feature-header.component.scss']
})
export class FeatureHeaderComponent {
  // komrisk=false;
  // komriskLite=false;

  // handleCheckboxSelection(event:any){
  //   console.log("CHECK BOX CHNG", event.target);
    
  // }
  checkboxItems = [
    {
      imgSrc: './assets/images/logos/Komrisk logo.png',
      checked: false,
      name: 'komrisk'
    },
    {
      imgSrc: './assets/images/logos/Komrisk Lite logo.png',
      checked: false,
      name: 'komriskLite'
    }
  ];
  // onCheckboxChange(event: any): void {
  //   console.log('Checkbox value of komrisk:', this.komrisk);
  //   console.log('Checkbox value of komrisk Lite:', this.komriskLite);
  // }
  onCheckboxChange(index: number): void {
    // Uncheck all checkboxes
    this.checkboxItems.forEach((item, i) => {
      if (i !== index) {
        item.checked = false;
      }
    });

    // Ensure the selected checkbox remains checked
    this.checkboxItems[index].checked = true;

    console.log(`Checkbox value of ${this.checkboxItems[index].name}:`, this.checkboxItems[index].checked);
  }

}
