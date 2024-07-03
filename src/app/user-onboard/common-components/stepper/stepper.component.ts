import { Component,Input, OnInit, AfterContentInit, AfterViewInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css'],
 
})

export class StepperComponent implements AfterViewInit {
  @Input() currentStep: number = 0;
  @Input() stepAutoComplete: boolean = false;

  stepperSteps = ["Business Details", "Subscription Details", "Preliminary List of Laws", "Payment", "Go Live !"]
  stepRoutings =["entity-details","subscription","laws","payment","golive"]
  stepForms: FormGroup[];

  constructor(private fb: FormBuilder, private router: Router) {
    this.stepForms = this.stepperSteps.map(() => this.fb.group({ completed: [false, Validators.requiredTrue] }));
  }

  ngAfterViewInit(): void {
    if(this.stepAutoComplete){
      this.getStepControl(this.currentStep).get('completed')?.setValue(true);
    }
  } 

  getStepControl(index: number): FormGroup {
    return this.stepForms[index];
  }

  onStepChange(event: any): void {
    const selectedIndex = event.selectedIndex;
    if (this.canNavigateToStep(selectedIndex)) {
      this.currentStep = selectedIndex;
      this.router.navigate([`/${this.stepRoutings[selectedIndex]}`]);
    } else {
      // Prevent navigation if step is not completed
      event.previouslySelectedIndex = this.currentStep;
    }
  }

  canNavigateToStep(index: number): boolean {
    if (index <= this.currentStep) {
      return true;
    }
    for (let i = 0; i < index; i++) {
      if (!this.stepForms[i].valid) {
        return false;
      }
    }
    return true;
  }

  isStepDisabled(index: number): boolean {
    return index !== this.currentStep;
  }
}
