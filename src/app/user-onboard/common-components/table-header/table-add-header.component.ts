import { Component, Input, EventEmitter, Output } from '@angular/core';
import { DialogService } from 'src/app/services/Dialog.service';

@Component({
  selector: 'app-table-add-header',
  templateUrl: './table-add-header.component.html',
  styleUrls: ['./table-add-header.component.scss'],
})
export class TableHeaderComponent {
  constructor(private entityDialogService: DialogService) {}

  @Input() path: string[] = [];
  @Input() buttonName: string = '';
  @Input() secondButtonName: string = '';
  @Output() isAddNewUserClicked = new EventEmitter<boolean>();

  emitAddNewEntity() {
    this.entityDialogService.emitOpenDialog();
  }

  onAddNewUserClick() {
    this.isAddNewUserClicked.emit(true);
  }
}
