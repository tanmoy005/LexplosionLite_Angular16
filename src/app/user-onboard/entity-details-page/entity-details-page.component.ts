import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { EntityTableComponent } from '../common-components/entity-table/entity-table.component';
import { StepperHelperTextComponent } from '../common-components/stepper-helper-text/stepper-helper-text.component';
import { MatCardModule } from '@angular/material/card';
import { treeDataitem } from 'src/app/shared/menu-items/tree-items';

@Component({
  selector: 'app-entity-details-page',
  templateUrl: './entity-details-page.component.html',
  styleUrls: ['./entity-details-page.component.css'],
})
export class EntityDetailsPageComponent {

  receivedData: any;
  // treeDataItem: any;

  constructor(private router: Router) {
    // Retrieve data from navigation state
    
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.receivedData = navigation.extras.state;
      console.log("This is the received data back in entity page", this.receivedData); 
         
    }
  }

  treeDataItem = treeDataitem;

  showTreeData(){
    console.log("Tree data- ", this.treeDataItem)
  }

  


}
