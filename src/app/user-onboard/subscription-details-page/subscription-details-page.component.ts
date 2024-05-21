import { Component } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {FormsModule} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { FeaturesComponent } from './features/features.component';
import { AppHeaderComponent } from 'src/app/layouts/full/header/header.component';

@Component({
  selector: 'app-subscription-details-page',
  templateUrl: './subscription-details-page.component.html',
  styleUrls: ['./subscription-details-page.component.scss'],
  // standalone:true,
  // imports:[MatCheckboxModule, FormsModule, MatCardModule,FeaturesComponent]
})

export class SubscriptionDetailsPageComponent {
 
}
