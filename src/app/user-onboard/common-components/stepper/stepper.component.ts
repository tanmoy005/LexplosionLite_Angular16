import {
  Component,
  Input,
  OnInit,
  ChangeDetectorRef,
  NgZone,
} from '@angular/core';
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
  step_routing_dict: { [key: string]: number } = {
    'entity-details': 0,
    subscription: 1,
    laws: 2,
    payment: 3,
    golive: 4,
  };
  stepPointerEventNoneStatus = [false, false, false, false, false];
  stepForms: FormGroup[];
  selectedIndex: number = 0;
  isClickable = true;
  condition: boolean = true;
  lastStep: number = 0;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {
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

  isSetIndexTriggered: boolean = false;

  setIndex(event: any) {
    this.selectedIndex = event.selectedIndex;
    this.currentStep = event.selectedIndex;
    this.isSetIndexTriggered = true;
  }

  triggerClick() {
    if (!this.isSetIndexTriggered) {
      return;
    }

    this.navigateToStep(this.selectedIndex);
    this.isSetIndexTriggered = false;
  }

  clickableIndexes(index: number) {}

  navigateToStep(index: number) {
    const currentUrl = this.router.url;
    let currindex: number | undefined;

    const lastSegment = currentUrl.split('/').pop();
    if (lastSegment && this.step_routing_dict[lastSegment] !== undefined) {
      currindex = this.step_routing_dict[lastSegment];
    }

    if (this.stepCompletionStatus) {
      if (
        index >= 0 &&
        index < this.stepperSteps.length &&
        currindex !== undefined &&
        (index === currindex + 1 || index < currindex)
      ) {
        this.ngZone.run(() => {
          this.router.navigate([this.stepRoutings[index]]).then(() => {
            this.currentStep = index;
            this.lastStep = index;
            this.cdr.detectChanges();
          });
        });
      } else {
        alert('Please complete all steps in between first.');

        this.router.navigate([currentUrl]).then(() => {
          if (currindex !== undefined) {
            this.currentStep = currindex;
          }
        });
      }
      this.updatePointerEvents();
    } else {
      alert(this.stepCompletionMessage);
      this.router.navigate([currentUrl]).then(() => {
        if (currindex !== undefined) {
          this.currentStep = currindex;
        }
      });
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
