import { Component ,ViewEncapsulation} from '@angular/core';
import { Router  } from '@angular/router';
import { RegHeaderComponent } from '../reg-header/reg-header.component';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-verify-email-page',
  templateUrl: './verify-email-page.component.html',
  styleUrls: ['./verify-email-page.component.css'],
  standalone:true,
  imports:[RegHeaderComponent,
    MatInputModule,
    MatFormFieldModule,
    FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule,
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule
  ],
  encapsulation: ViewEncapsulation.None
})
export class VerifyEmailPageComponent {

  stateData: any ;
  businessName: string;

  constructor( private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    
    if (navigation && navigation.extras.state) {
      this.stateData = navigation.extras.state;
      console.log("This is the received data in op-unit page", this.stateData);
      this.businessName = this.stateData['businessname'] 
      
    }
  }
  
  handleRegistration(event: any){
    this.router.navigate(['/login']);
  }
  handleBackToRegistration(event: any){
    this.router.navigate(['/register']);
  }

}
