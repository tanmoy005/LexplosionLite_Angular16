import { Component,Input,ViewChild  } from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css'],
  // standalone: true,
  // imports: [
  //   MatStepperModule,
  //   FormsModule,
  //   ReactiveFormsModule,
  //   MatFormFieldModule,
  //   MatInputModule,
  //   MatButtonModule,
  //   CommonModule
  // ]
})

export class StepperComponent {
  @Input() currentStep: number = 0;
  stepperSteps = ["Business Details","Subscription Details", "Preliminary List of Laws", "Payment", "Go Live !"]
  isStepDisabled(index: number): boolean {
    // If the index is not the current step, disable the step
    return index !== this.currentStep;
  }
}
