import { Component ,ViewEncapsulation} from '@angular/core';
import { Router } from '@angular/router';
import { RegHeaderComponent } from '../reg-header/reg-header.component';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, Validators, FormsModule, ReactiveFormsModule,ValidatorFn, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';

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
    MatButtonModule
  ],
  encapsulation: ViewEncapsulation.None
})
export class VerifyEmailPageComponent {
  constructor( private router: Router) {}
  
  handleRegistration(event: any){
    this.router.navigate(['/entity-details']);
  }

}
