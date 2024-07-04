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
  stepPointerEventNoneStatus = [false,false,false,false,false]
  stepForms: FormGroup[];
  selectedIndex: number = 0;
  isClickable = true;
  condition: boolean = true; 
  lastStep: number = 0;

  constructor(private fb: FormBuilder, private router: Router) {
    this.stepForms = this.stepperSteps.map(() => this.fb.group({ completed: [false, Validators.requiredTrue] }));
  }


  ngOnInit(): void {
   
    this.router.events.subscribe(event => {
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
      console.log('Current step index set to:', this.currentStep);
    }
  }

 setIndex(event:any) {
  
  this.selectedIndex = event.selectedIndex;
   
  }

  triggerClick() {
   
    this.navigateToStep(this.selectedIndex);

  

  }

  clickableIndexes(index:number){
    if (index>=0 && index < this.stepperSteps.length){

    }
  }



  navigateToStep(index: number) {
    if (index >= 0 && index < this.stepperSteps.length && (index === this.currentStep + 1 || index < this.currentStep)) {
      console.log('Navigating to:', this.stepRoutings[index]);
      this.router.navigate([this.stepRoutings[index]]);
      this.currentStep = index;
      this.lastStep = index;
      console.log('the last step in if part',this.lastStep)
    }
    else{
      alert('You can not skip middle steps!')
      window.location.reload()
    }
    this.updatePointerEvents();
  }

  updatePointerEvents() {
    for (let i = 0; i < this.stepPointerEventNoneStatus.length; i++) {
      this.stepPointerEventNoneStatus[i] = !(i === this.currentStep + 1 || i <= this.currentStep);
    }
    console.log('update Pointer event',this.stepPointerEventNoneStatus)
  }

  getStepControl(index:number){
    
  }
 
}
