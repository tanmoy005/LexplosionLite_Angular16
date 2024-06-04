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
  
 
  onCardClick(index: number): void {
   
    this.checkboxItems.forEach((item, i) => {
      if (i !== index) {
        item.checked = false;
      }
    });

  
    this.checkboxItems[index].checked = true;

    
  }

}
