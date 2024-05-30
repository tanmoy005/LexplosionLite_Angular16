import { Component } from '@angular/core';

@Component({
  selector: 'app-feature-header',
  templateUrl: './feature-header.component.html',
  styleUrls: ['./feature-header.component.scss']
})
export class FeatureHeaderComponent {
 
  checkboxItems = [
    {
      imgSrc: './assets/images/logos/Komrisk logo.png',
      checked: false,
      name: 'komrisk',
      selectedImgSrc:'./assets/images/logos/Komrisk logowhite.png'
    },
    {
      imgSrc: './assets/images/logos/Komrisk Lite logo.png',
      checked: false,
      name: 'komriskLite',
      selectedImgSrc:'./assets/images/logos/Komrisk Lite logoWhite.png'
    }
  ];
  
  // onCheckboxChange(index: number): void {
  //   // Uncheck all checkboxes
  //   this.checkboxItems.forEach((item, i) => {
  //     if (i !== index) {
  //       item.checked = false;
  //     }
  //   });

  //   // Ensure the selected checkbox remains checked
  //   this.checkboxItems[index].checked = true;

  //   console.log(`Checkbox value of ${this.checkboxItems[index].name}:`, this.checkboxItems[index].checked);
  // }
  onCardClick(index: number): void {
    // Uncheck all cards
    this.checkboxItems.forEach((item, i) => {
      if (i !== index) {
        item.checked = false;
      }
    });

    // Ensure the selected card remains checked
    this.checkboxItems[index].checked = true;

    console.log(`Card value of ${this.checkboxItems[index].name}:`, this.checkboxItems[index].checked);
  }

}
