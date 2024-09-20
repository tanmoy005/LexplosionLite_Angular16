import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as GoliveInterFaces from 'src/app/shared/menu-items/go-live-inerfaces';
import { LawsTableData } from '../common-components/laws-table/laws-table.component';


const WORKSAPCE_DATA: GoliveInterFaces.WorkSpaceDetails[] = [];
export interface WorkspaceDetails {
  serialNumber: number;
  workSpaceName: string;
  adminName: string;
}
@Component({
  selector: 'app-go-live-page',
  templateUrl: './go-live-page.component.html',
  styleUrls: ['./go-live-page.component.scss'],
})

export class GoLivePageComponent {

  paymentMode: any;

  constructor(private router: Router) { 
    const data = this.router.getCurrentNavigation()?.extras.state;
    console.log('data423', data);
    this.paymentMode = data?.['mode'];
  }

  // workSpaceColumns: string[] = ['#', 'Name', 'Admin'];
  // dataSource: GoliveInterFaces.WorkSpaceDetails[] = [];
  screenWidth: number;
  workSpaceColumns = ['serialNumber', 'workSpaceName', 'adminName'];
  dataSource: WorkspaceDetails[] = [];

  // ngOnChanges() {
  //   this.dataSource = [{
  //     serialNumber: 1,
  //   }];
  // }

  getCardSize(defaultHeight: number | string, defaultWidth: string | number) {
    if (this.screenWidth <= 1280) {
      return { height: '100%', width: '100%' };
    } else {
      return { height: defaultHeight, width: defaultWidth };
    }
  }
  ngOnInit() {
    this.dataSource = [
      {
      serialNumber: 1,
      workSpaceName: 'Test',
      adminName: 'Test'
    },
      {
      serialNumber: 1,
      workSpaceName: 'Test',
      adminName: 'Test'
    },
      {
      serialNumber: 1,
      workSpaceName: 'Test',
      adminName: 'Test'
    },
      {
      serialNumber: 1,
      workSpaceName: 'Test',
      adminName: 'Test'
    },
      {
      serialNumber: 1,
      workSpaceName: 'Test',
      adminName: 'Test'
    },
      {
      serialNumber: 1,
      workSpaceName: 'Test',
      adminName: 'Test'
    },
      {
      serialNumber: 1,
      workSpaceName: 'Test',
      adminName: 'Test'
    },
      {
      serialNumber: 1,
      workSpaceName: 'Test',
      adminName: 'Test'
    },
      {
      serialNumber: 1,
      workSpaceName: 'Test',
      adminName: 'Test'
    },
      {
      serialNumber: 1,
      workSpaceName: 'Test',
      adminName: 'Test'
    },
  ];
  }
  goToSubscription() {
    this.router.navigate(['/payment']);

    // this.router.navigate(['/subscription'], { state: { entity: '' } });
  }
  navigateToPaymentPage() {
    this.router.navigate(['/payment']);
  }

}
