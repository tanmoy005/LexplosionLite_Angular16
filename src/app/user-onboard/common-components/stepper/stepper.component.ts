import { Component,Input  } from '@angular/core';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css'],
 
})

export class StepperComponent {
  @Input() currentStep: number = 0;
  stepperSteps = ["Business Details","Subscription Details", "Preliminary List of Laws", "Payment", "Go Live !"]
  isStepDisabled(index: number): boolean {
 
    return index !== this.currentStep;
  }
}
