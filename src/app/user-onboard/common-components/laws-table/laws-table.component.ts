import { Component,Input  } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { ApplicableLaws } from 'src/app/shared/menu-items/applicable-laws';


@Component({
  selector: 'app-laws-table',
  templateUrl: './laws-table.component.html',
  styleUrls: ['./laws-table.component.css'],
  // standalone:true,
  // imports:[MatTableModule,CommonModule,MatButtonModule
  // ]
})


export class LawsTableComponent {

  @Input() data: ApplicableLaws

   
  displayedColumns = ['lawName', 'applicability','Add/RemovefromCP'];
  dataSource: { lawName: string, applicability: string ,noOfCompliances:number}[] = [];

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
  transformData(data: any[]): { lawName: string , applicability: string,noOfCompliances:number}[] {
    const transformedData: { lawName: string, applicability: string ,noOfCompliances:number}[] = [];
    data.forEach(item => {
      item.komriskLaws.forEach((law: { id: number, name: string }) => { 
        transformedData.push(
          { 
            lawName: law.name,
            noOfCompliances:item.komriskCompliances.length,
            applicability: item.applicability 
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