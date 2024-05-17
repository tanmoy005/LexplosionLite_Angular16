import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-stepper-helper-text',
  templateUrl: './stepper-helper-text.component.html',
  styleUrls: ['./stepper-helper-text.component.css']
})
export class StepperHelperTextComponent {
  @Input() helperText: string = "";
  @Input() stepText: string = "";

  
 
}
