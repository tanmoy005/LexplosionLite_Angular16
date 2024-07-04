import { Component,Input, OnInit, AfterContentInit, AfterViewInit ,SimpleChanges,OnChanges,Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router ,NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css'],
 
})

export class StepperComponent implements  OnInit{
  @Input() currentStep: number = 0;
  @Input() stepAutoComplete: boolean = true;
//  @Output() stepChanged: EventEmitter<number> = new EventEmitter<number>();

  stepperSteps = ["Business Details", "Subscription Details", "Preliminary List of Laws", "Payment", "Go Live !"]
  stepRoutings =["entity-details","subscription","laws","payment","golive"]
  stepForms: FormGroup[];

  constructor(private fb: FormBuilder, private router: Router) {
    this.stepForms = this.stepperSteps.map(() => this.fb.group({ completed: [false, Validators.requiredTrue] }));
  }
  // ngOnInit(): void {
  //   console.log('Initial currentStep:', this.currentStep);
  // }

  ngOnInit(): void {
    console.log('Initial currentStep:', this.currentStep);
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateStepper(event.urlAfterRedirects);
      }
    });
  }

  updateStepper(url: string) {
    const lastSegment = url ? url.split('/').pop() : '';
    console.log('Last segment of URL:', lastSegment);
    const stepIndex = this.stepRoutings.indexOf(lastSegment as string);
    if (stepIndex >= 0) {
      this.currentStep = stepIndex;
      console.log('Current step index set to:', this.currentStep);
    }
  }

  navigateToStep(index: number) {
    console.log('index come to navigate to step',index)
    if (index >= 0 && index < this.stepperSteps.length && (index === this.currentStep+1 || index < this.currentStep)) {
      console.log('Navigating to:', this.stepRoutings[index]);
      this.router.navigate([this.stepRoutings[index]]);
    }
  }

  getStepControl(index:number){
    
  }
 
}
