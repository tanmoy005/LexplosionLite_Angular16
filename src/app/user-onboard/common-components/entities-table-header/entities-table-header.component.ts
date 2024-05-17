import { Component,EventEmitter, Input, Output  } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EntityTableComponent } from '../entity-table/entity-table.component';
import { NgClass, NgFor, NgIf } from '@angular/common';



@Component({
  selector: 'app-entities-table-header',
  templateUrl: './entities-table-header.component.html',
  styleUrls: ['./entities-table-header.component.scss'],
  standalone:true,
  imports:[MatButtonModule,MatIconModule,EntityTableComponent,NgFor,NgIf,NgClass]
})
export class EntitiesTableHeaderComponent {
  @Input() path: string[] = [];
  @Input() buttonName: string = '';
  @Output() addEntity = new EventEmitter<boolean>();

   emitAddNewEntity() {
    this.addEntity.emit(true);
  }

}
