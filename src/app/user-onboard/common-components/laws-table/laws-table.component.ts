import { komriskLawCategories } from './../../../shared/menu-items/field-definition-interfaces';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { ApplicableLaws } from 'src/app/shared/menu-items/applicable-laws';
import { Law } from 'src/app/shared/menu-items/applicable-laws';
import { LawsReadMoreDialogComponent } from './laws-read-more-dialog/laws-read-more-dialog.component';

export interface LawsTableData{
  serialNumber: number;
    lawName: {name: string, id: number}[];
    applicability: string;
    noOfCompliances: number;
    module: string;
}
@Component({
  selector: 'app-laws-table',
  templateUrl: './laws-table.component.html',
  styleUrls: ['./laws-table.component.css'],
 
})


export class LawsTableComponent {
  @Input() data: ApplicableLaws[];

  displayedColumns = ['serialNumber','lawName', 'applicability', 'module'];
  dataSource: LawsTableData[] = [];

  ngOnChanges() {
   
    this.dataSource = this.transformData(this.data);
  }

  constructor(public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(LawsReadMoreDialogComponent);
  }

  transformData(
    data: ApplicableLaws[]
  ):LawsTableData[] {
    const transformedData: LawsTableData[] = [];
    data.forEach((item,index) => {
      
      transformedData.push({
          serialNumber:  index + 1,
          lawName: item.komriskLaws,
          noOfCompliances: item.komriskCompliances.length,
          applicability: item.applicability,
          module: item.komriskLawCategory.description,
          
      }
      )
    });
   
    return transformedData;
  }

   filterLawsContainingAct(laws: Law[]): Law[] {
    return laws.filter(law => law.name.toLowerCase().includes('act'));
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


