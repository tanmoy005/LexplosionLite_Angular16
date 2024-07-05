import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css'],
})
export class StepperComponent implements OnInit {
  @Input() currentStep: number = 0;
  @Input() stepAutoComplete: boolean = true;
  @Input() stepCompletionStatus: boolean = true;
  @Input() stepCompletionMessage: string = '';

  stepperSteps = [
    'Business Details',
    'Subscription Details',
    'Preliminary List of Laws',
    'Payment',
    'Go Live !',
  ];
  stepRoutings = [
    'entity-details',
    'subscription',
    'laws',
    'payment',
    'golive',
  ];
  stepPointerEventNoneStatus = [false, false, false, false, false];
  stepForms: FormGroup[];
  selectedIndex: number = 0;
  isClickable = true;
  condition: boolean = true;
  lastStep: number = 0;

  constructor(private fb: FormBuilder, private router: Router) {
    this.stepForms = this.stepperSteps.map(() =>
      this.fb.group({ completed: [false, Validators.requiredTrue] })
    );
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateStepper(event.urlAfterRedirects);
      }
    });
  }

  updateStepper(url: string) {
    const lastSegment = url ? url.split('/').pop() : '';

    const stepIndex = this.stepRoutings.indexOf(lastSegment as string);
    if (stepIndex >= 0) {
      this.currentStep = stepIndex;
    }
  }

  setIndex(event: any) {
    this.selectedIndex = event.selectedIndex;
  }

  triggerClick() {
    this.navigateToStep(this.selectedIndex);
  }

  clickableIndexes(index: number) {
    if (index >= 0 && index < this.stepperSteps.length) {
    }
  }

  navigateToStep(index: number) {
    if (this.stepCompletionStatus) {
      if (
        index >= 0 &&
        index < this.stepperSteps.length &&
        (index === this.currentStep + 1 || index < this.currentStep)
      ) {
        this.router.navigate([this.stepRoutings[index]]);
        this.currentStep = index;
        this.lastStep = index;
      } else {
        alert('Please complete all steps in between first.');
        window.location.reload();
      }
      this.updatePointerEvents();
    } else {
      alert(this.stepCompletionMessage);
      window.location.reload();
    }
  }

  updatePointerEvents() {
    for (let i = 0; i < this.stepPointerEventNoneStatus.length; i++) {
      this.stepPointerEventNoneStatus[i] = !(
        i === this.currentStep + 1 || i <= this.currentStep
      );
    }
  }

  getStepControl(index: number) {}
}
