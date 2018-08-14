import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class InteractionService {
  public modalNewSource = new Subject<any>();     // Открыть окно для добавления
  public modalEditSource = new Subject<any>();    // Открыть окно для редактирования
  public gridRefreshSource = new Subject<any>();  // Обновить таблицу

  modalNew$ = this.modalNewSource.asObservable();
  modalEdit$ = this.modalEditSource.asObservable();
  gridRefresh$ = this.gridRefreshSource.asObservable();

  /* Открыть окно для добавления (ловится в modal.component.ts) */
  modalNew() {
    this.modalNewSource.next();
  }

  /* Открыть окно для редактирования (ловится в modal.component.ts) */
  modalEdit(id) {
    this.modalEditSource.next(id);
  }

  /* Обновить таблицу (ловится в grid.component.ts) */
  gridRefresh() {
    this.gridRefreshSource.next();
  }
}
