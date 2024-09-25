import { Component, EventEmitter } from '@angular/core';
import { Input, Output } from '@angular/core';

@Component({
  selector: 'app-feature-header',
  templateUrl: './feature-header.component.html',
  styleUrls: ['./feature-header.component.scss'],
})
export class FeatureHeaderComponent {
  checkboxItems = [
    {
      imgSrc: './assets/images/logos/Komrisk-Logo.svg',
      checked: false,
      name: 'komrisk',
      selectedImgSrc: './assets/images/logos/Property 1=Komrisk Logo L.svg',
    },
    {
      imgSrc: './assets/images/logos/Komrisk Lite Logo_2024.svg',
      checked: true,
      name: 'komriskLite',
      selectedImgSrc: './assets/images/logos/Property 1=KL Lite.svg',
    },
  ];

  checkedSubscriptionType: string = 'komriskLite';

  @Output() selectedSubscriptionType = new EventEmitter<string>();

  onCardClick(index: number): void {
    this.checkboxItems.forEach((item, i) => {
      if (i !== index) {
        item.checked = false;
      }
    });

    this.checkboxItems[index].checked = true;
    this.checkedSubscriptionType = this.checkboxItems[index].name;
    this.selectedSubscriptionType.emit(this.checkedSubscriptionType);
  }
}
