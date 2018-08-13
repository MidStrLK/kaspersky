import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class InteractionService {
  public modalNewSource = new Subject<any>();
  public modalEditSource = new Subject<any>();
  public gridRemoveSource = new Subject<any>();
  public gridRefreshSource = new Subject<any>();

  modalNew$ = this.modalNewSource.asObservable();
  modalEdit$ = this.modalEditSource.asObservable();
  gridRemove$ = this.gridRemoveSource.asObservable();
  gridRefresh$ = this.gridRefreshSource.asObservable();

  modalNew() {
    this.modalNewSource.next();
  }

  modalEdit(id) {
    this.modalEditSource.next(id);
  }

  gridRemove(id) {
    this.gridRemoveSource.next(id);
  }

  gridRefresh() {
    this.gridRefreshSource.next();
  }
}
