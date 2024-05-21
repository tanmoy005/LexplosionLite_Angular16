import { Component } from '@angular/core';

@Component({
  selector: 'app-feature-header',
  templateUrl: './feature-header.component.html',
  styleUrls: ['./feature-header.component.scss']
})
export class FeatureHeaderComponent {
  komrisk=false;
  komriskLite=false;

  // handleCheckboxSelection(event:any){
  //   console.log("CHECK BOX CHNG", event.target);
    
  // }
  onCheckboxChange(event: any): void {
    console.log('Checkbox value of komrisk:', this.komrisk);
    console.log('Checkbox value of komrisk Lite:', this.komriskLite);
  }
}
