import { AfterViewInit, Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { StepperComponent } from '../common-components/stepper/stepper.component';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent  {
  constructor(private router: Router){ }
  @ViewChild(StepperComponent, { static: false }) stepper: StepperComponent;

  colorPaymentDoneButton:string="#42C997";
  navigateToGoLivePage(event:any){
    this.router.navigate(['/golive']);
  }
  navigateToLawsPage(event:any){
    this.router.navigate(['/laws']);
  }
}
