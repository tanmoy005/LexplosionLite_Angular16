import { Component } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {FormsModule} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { FeaturesComponent } from './features/features.component';

@Component({
  selector: 'app-subscription-details-page',
  templateUrl: './subscription-details-page.component.html',
  styleUrls: ['./subscription-details-page.component.scss'],
  standalone:true,
  imports:[MatCheckboxModule, FormsModule, MatCardModule,FeaturesComponent]
})

export class SubscriptionDetailsPageComponent {
  komrisk=false;
  komriskLite=false;

  handleCheckboxSelection(event:any){
    console.log("CHECK BOX CHNG", event.target);
    // if(this.komrisk === true)
  //  if(this.komrisk === true){
  //     this.komriskLite=false;
  //   }
  //  else if(this.komriskLite === true){
  //     this.komrisk=false;
  //  }
  //   console.log(this.komrisk, this.komriskLite)
  }
}
