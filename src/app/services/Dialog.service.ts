import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BusinessDetails } from '../shared/menu-items/entity-interfaces';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private openDialogSubject = new Subject<BusinessDetails | null>();
  openDialog$ = this.openDialogSubject.asObservable();

  emitOpenDialog(entity?: BusinessDetails) {
    this.openDialogSubject.next(entity || null);
  }
}
