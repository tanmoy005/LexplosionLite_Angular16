import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-stepper-helper-text',
  templateUrl: './stepper-helper-text.component.html',
  styleUrls: ['./stepper-helper-text.component.scss']
})
export class StepperHelperTextComponent {
  @Input() currentStep: number = 0;
  @Input() subStep: number = 1;

 
}
