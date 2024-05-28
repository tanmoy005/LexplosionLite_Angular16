import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BusinessDetails } from '../shared/menu-items/entity-interfaces';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  // private openDialogSubject = new Subject<void>();
  private openDialogSubject = new Subject<BusinessDetails | null>();
  openDialog$ = this.openDialogSubject.asObservable();

  emitOpenDialog(entity?:BusinessDetails) {
    if (entity) {
      console.log('Entity provided in dialog component:', entity);
    } 
    else {
      console.log('No entity provided', entity);
    }
    this.openDialogSubject.next(entity || null);
  }
}
