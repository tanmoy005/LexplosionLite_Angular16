import { Component,EventEmitter, Input, Output  } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EntityTableComponent } from '../entity-table/entity-table.component';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { DialogService } from 'src/app/services/Dialog.service';


@Component({
  selector: 'app-table-add-header',
  templateUrl: './table-add-header.component.html',
  styleUrls: ['./table-add-header.component.scss'],
  standalone:true,
  imports:[MatButtonModule,MatIconModule,EntityTableComponent,NgFor,NgIf,NgClass]
})
export class TableHeaderComponent {
  constructor(private entityDialogService: DialogService) {}

  @Input() path: string[] = [];
  @Input() buttonName: string = '';
  // @Output() addEntity = new EventEmitter<boolean>();

  //  emitAddNewEntity() {
  //   this.addEntity.emit(true);
  // }
  emitAddNewEntity() {
    this.entityDialogService.emitOpenDialog();
  }

}
