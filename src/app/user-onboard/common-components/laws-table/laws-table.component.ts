import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { ApplicableLaws } from 'src/app/shared/menu-items/applicable-laws';

@Component({
  selector: 'app-laws-table',
  templateUrl: './laws-table.component.html',
  styleUrls: ['./laws-table.component.css'],
 
})
export class LawsTableComponent {
  @Input() data: ApplicableLaws;

  displayedColumns = ['serialNumber','lawName', 'applicability', 'module'];
  dataSource: {
    serialNumber: number;
    lawName: string;
    applicability: string;
    noOfCompliances: number;
    module: string;
  }[] = [];

  ngOnChanges() {
    console.log('Input Data:', this.data);
    this.dataSource = this.transformData(this.data['data']);
  }

  constructor(public dialog: MatDialog) {
    //this.dataSource = this.transformData(DATA);
  }

  openDialog() {
    this.dialog.open(DialogElementsExampleDialog);
  }
  transformData(
    data: any[]
  ): {
    serialNumber: number;
    lawName: string;
    applicability: string;
    noOfCompliances: number;
    module: string;
  }[] {
    const transformedData: {
      serialNumber: number;
      lawName: string;
      applicability: string;
      noOfCompliances: number;
      module: string;
    }[] = [];
    data.forEach((item,index) => {
      item.komriskLaws.forEach((law: { id: number; name: string }) => {
        transformedData.push({
          serialNumber:  index + 1,
          lawName: law.name,
          noOfCompliances: item.komriskCompliances.length,
          applicability: item.applicability,
          module: item.komriskLawCategory.description,
        });
      });
    });
    return transformedData;
  }

  getImageSource(element: any): string {
    if (element.applicability === 'Definitely Applicable') {
      return './assets/images/icons/LawDefiniteny.svg';
    } else if (element.applicability === 'Maybe Applicable') {
      return './assets/images/icons/LawMaybeVector.svg';
    } else {
      return './assets/images/icons/LawAll.svg';
    }
  }
}

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'read-with-law-dialog.html',
  standalone: true,
  imports: [MatDialogModule],
})
export class DialogElementsExampleDialog {}
