import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private openDialogSubject = new Subject<void>();
  openDialog$ = this.openDialogSubject.asObservable();

  emitOpenDialog() {
    this.openDialogSubject.next();
  }
}
