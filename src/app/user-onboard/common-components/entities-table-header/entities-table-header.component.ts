import { Component,EventEmitter, Output  } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EntityTableComponent } from '../entity-table/entity-table.component';



@Component({
  selector: 'app-entities-table-header',
  templateUrl: './entities-table-header.component.html',
  styleUrls: ['./entities-table-header.component.scss'],
  standalone:true,
  imports:[MatButtonModule,MatIconModule,EntityTableComponent]
})
export class EntitiesTableHeaderComponent {

  @Output() addEntity = new EventEmitter<boolean>();

   emitAddNewEntity() {
    this.addEntity.emit(true);
  }

}
