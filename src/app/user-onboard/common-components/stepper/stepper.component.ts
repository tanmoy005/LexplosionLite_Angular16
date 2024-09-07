// import { Component, Input, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router, NavigationEnd } from '@angular/router';

// @Component({
//   selector: 'app-stepper',
//   templateUrl: './stepper.component.html',
//   styleUrls: ['./stepper.component.css'],
// })
// export class StepperComponent implements OnInit {
//   @Input() currentStep: number = 0;
//   @Input() stepAutoComplete: boolean = true;
//   @Input() stepCompletionStatus: boolean = true;
//   @Input() stepCompletionMessage: string = '';

//   stepperSteps = [
//     'Business Details',
//     'Subscription Details',
//     'Preliminary List of Laws',
//     'Payment',
//     'Go Live !',
//   ];
//   stepRoutings = [
//     'entity-details',
//     'subscription',
//     'laws',
//     'payment',
//     'golive',
//   ];
//   // step_routing_dict = {
//   //   'entity-details': 0,
//   //   subscription: 1,
//   //   laws: 2,
//   //   payment: 3,
//   //   golive: 4,
//   // };
//   step_routing_dict: { [key: string]: number } = {
//     'entity-details': 0,
//     subscription: 1,
//     laws: 2,
//     payment: 3,
//     golive: 4,
//   };
//   stepPointerEventNoneStatus = [false, false, false, false, false];
//   stepForms: FormGroup[];
//   selectedIndex: number = 0;
//   isClickable = true;
//   condition: boolean = true;
//   lastStep: number = 0;

//   constructor(private fb: FormBuilder, private router: Router) {
//     this.stepForms = this.stepperSteps.map(() =>
//       this.fb.group({ completed: [false, Validators.requiredTrue] })
//     );
//   }

//   ngOnInit(): void {
//     this.router.events.subscribe((event) => {
//       if (event instanceof NavigationEnd) {
//         this.updateStepper(event.urlAfterRedirects);
//       }
//     });
//   }

//   updateStepper(url: string) {
//     const lastSegment = url ? url.split('/').pop() : '';

//     const stepIndex = this.stepRoutings.indexOf(lastSegment as string);
//     if (stepIndex >= 0) {
//       this.currentStep = stepIndex;
//     }
//   }

//   setIndex(event: any) {
//     this.selectedIndex = event.selectedIndex;
//   }

//   triggerClick() {
//     this.navigateToStep(this.selectedIndex);
//   }

//   clickableIndexes(index: number) {
//     if (index >= 0 && index < this.stepperSteps.length) {
//     }
//   }

//   navigateToStep(index: number) {
//     const currentUrl = this.router.url;
//     console.log('the current URL', currentUrl);
//     if (this.stepCompletionStatus) {
//       if (
//         index >= 0 &&
//         index < this.stepperSteps.length &&
//         (index === this.currentStep + 1 || index < this.currentStep)
//       ) {
//         this.router.navigate([this.stepRoutings[index]]);
//         this.currentStep = index;
//         this.lastStep = index;
//       } else {
//         alert('Please complete all steps in between first.');
//         const lastSegment = currentUrl.split('/').pop();

//         if (lastSegment && this.step_routing_dict[lastSegment]) {
//           this.currentStep = this.step_routing_dict[lastSegment];
//           console.log(
//             'the current URL 111',
//             this.step_routing_dict[lastSegment]
//           );
//         }

//         this.router.navigate([currentUrl]);
//         //this.router.navigate([currentUrl]);
//         // this.currentStep =
//         //this.selectedIndex = this.currentStep;
//         //window.location.reload();
//       }
//       this.updatePointerEvents();
//     } else {
//       alert(this.stepCompletionMessage);
//       // window.location.reload();
//     }
//   }

//   updatePointerEvents() {
//     for (let i = 0; i < this.stepPointerEventNoneStatus.length; i++) {
//       this.stepPointerEventNoneStatus[i] = !(
//         i === this.currentStep + 1 || i <= this.currentStep
//       );
//     }
//   }

//   getStepControl(index: number) {}
// }

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

  setIndex(event: any) {
    console.log('click is triggered from setIndex');
    this.selectedIndex = event.selectedIndex;
    this.currentStep = event.selectedIndex;
  }

  triggerClick() {
    //  this.selectedIndex = event.selectedIndex;
    // const selInd = event.selectedIndex;
    console.log('click is triggered');
    this.navigateToStep(this.selectedIndex);
  }

  clickableIndexes(index: number) {}

  // navigateToStep(index: number) {
  //   const currentUrl = this.router.url;
  //   let currindex: number | undefined; // Declare currindex here

  //   const lastSegment = currentUrl.split('/').pop();
  //   if (lastSegment && this.step_routing_dict[lastSegment]) {
  //     currindex = this.step_routing_dict[lastSegment];
  //   }

  //   console.log('the current URL', currentUrl);
  //   if (this.stepCompletionStatus) {
  //     if (
  //       index >= 0 &&
  //       index < this.stepperSteps.length &&
  //       (index === this.currentStep + 1 || index < this.currentStep)
  //     ) {
  //       this.ngZone.run(() => {
  //         this.router.navigate([this.stepRoutings[index]]).then(() => {
  //           this.currentStep = index;
  //           this.lastStep = index;
  //           this.cdr.detectChanges();
  //         });
  //       });
  //     } else {
  //       alert('Please complete all steps in between first.');
  //       console.log('the current URL 11', currentUrl);
  //       this.router.navigate([currentUrl]).then(() => {
  //         // if (currindex !== undefined) {
  //         //   this.currentStep = currindex;
  //         //   console.log('Navigates happened with currindex', currindex);
  //         // }
  //       });
  //     }
  //     this.updatePointerEvents();
  //   } else {
  //     alert(this.stepCompletionMessage);
  //   }
  // }
  // navigateToStep(index: number) {
  //   console.log('number from trigger click', index);
  //   const currentUrl = this.router.url;
  //   console.log('the current URL', currentUrl);
  //   const lastSegment = currentUrl.split('/').pop();
  //   if (lastSegment && this.step_routing_dict[lastSegment]) {
  //   }
  //   //this.lastStep = this.currentStep;
  //   if (this.stepCompletionStatus) {
  //     if (
  //       index >= 0 &&
  //       index < this.stepperSteps.length &&
  //       (index === this.step_routing_dict[lastSegment] + 1 ||
  //         index < this.step_routing_dict[lastSegment])
  //     ) {
  //       this.router.navigate([this.stepRoutings[index]]);
  //       // this.currentStep = index;
  //       // this.lastStep = index;
  //     } else {
  //       alert('Please complete all steps in between first.');
  //       console.log('the current URL', currentUrl);
  //       const lastSegment = currentUrl.split('/').pop();

  //       if (lastSegment && this.step_routing_dict[lastSegment]) {
  //         this.currentStep = this.step_routing_dict[lastSegment];
  //         console.log(
  //           'the current URL 111',
  //           this.step_routing_dict[lastSegment]
  //         );
  //       }
  //     }
  //     this.updatePointerEvents();
  //   } else {
  //     alert(this.stepCompletionMessage);
  //     // window.location.reload();
  //   }
  // }

  navigateToStep(index: number) {
    const currentUrl = this.router.url;
    let currindex: number | undefined;

    const lastSegment = currentUrl.split('/').pop();
    if (lastSegment && this.step_routing_dict[lastSegment] !== undefined) {
      currindex = this.step_routing_dict[lastSegment];
    }

    console.log('the current URL', currentUrl);
    console.log('the stepcompletion status', this.stepCompletionStatus);
    console.log('the curr index ', currindex);
    console.log('the curr index want to go ', index);
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
        console.log('the current URL 11', currentUrl);
        this.router.navigate([currentUrl]).then(() => {
          if (currindex !== undefined) {
            this.currentStep = currindex;
            console.log('Navigates happened with currindex', currindex);
          }
        });
      }
      this.updatePointerEvents();
    } else {
      alert(this.stepCompletionMessage);
      this.router.navigate([currentUrl]).then(() => {
        if (currindex !== undefined) {
          this.currentStep = currindex;
          console.log('Navigates happened with currindex', currindex);
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
