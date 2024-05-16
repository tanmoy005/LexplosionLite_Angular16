import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-count-card',
  templateUrl: './employee-count-card.component.html',
  styleUrls: ['./employee-count-card.component.scss'],
  standalone: true,
  imports:[
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    CommonModule
  ]
})
export class EmployeeCountCardComponent {

}
