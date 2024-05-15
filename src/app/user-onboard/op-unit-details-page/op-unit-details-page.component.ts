import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { treeDataitem } from 'src/app/shared/menu-items/tree-items';
import { TreeStructureComponent } from '../common-components/tree-structure/tree-structure.component';
@Component({
  selector: 'app-op-unit-details-page',
  templateUrl: './op-unit-details-page.component.html',
  styleUrls: ['./op-unit-details-page.component.css']
})
export class OpUnitDetailsPageComponent {
  receivedData: any;
  entityDetails: any;
  
  constructor(private router: Router) {
   
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.receivedData = navigation.extras.state;
      
      this.entityDetails = this.receivedData[0] 
    
    }
  }
  treeDataItem = treeDataitem;
}



  
