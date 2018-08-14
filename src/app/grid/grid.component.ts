import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { InteractionService } from '../service/interaction.service';
import { IoService } from '../service/io.service';

@Component({
  selector: 'app-grid-component',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  sortDefaultActive = 'name';
  sortDefaultDirection = 'asc';
  mainGrid: any = [];                      // Данные для отображения
  displayedColumns: string[] = [
    'name',
    'authorstr',
    'publishing',
    'year',
    'remove'];      // Колонки таблицы

  constructor(private io: IoService,
              private interaction: InteractionService) {

    /* Событие обновления таблицы */
    interaction.gridRefresh$.subscribe(() => {
      this.setMainGrid();
    });
  }


  /* При инициализации вставляем данные в таблицу и подключаем сортировку */
  ngOnInit() {
    this.setMainGrid();

    this.applyGridSort();

    // this.mainGrid.sort = this.sort;
  }

  /* Клик по сортировке таблицы */
  onSort($event) {
    const active = $event.active;
    const descDirection = ($event.direction === 'desc') ? 1 : -1;

    this.io.setSort(active, $event.direction);

    this.mainGrid.data.sort((a, b) => {
      const A = (a && a[active] && typeof a[active] === 'string') ? a[active].toLowerCase() : a[active];
      const B = (b && b[active] && typeof b[active] === 'string') ? b[active].toLowerCase() : b[active];

      if (A > B) { return descDirection; }
      if (A < B) { return (-1 * descDirection); }

      return 0;
    });

    this.mainGrid = new MatTableDataSource(this.mainGrid.data);
  }

  /* Применить сохраненную сортировку */
  applyGridSort() {
    const gridSort: any = this.io.getSort();

    this.sortDefaultActive = gridSort.active;
    this.sortDefaultDirection = gridSort.direction;

    this.onSort(gridSort);
  }

  /* Получаем данные из IoService и вставляем в таблицу */
  setMainGrid() {
    const data = this.io.getData(null);

    if (data) {
      this.mainGrid = new MatTableDataSource(data);
    }
  }

  /* При клике на строку (если это не ячейка с кнопкой "удалить")
  запускаем событие редактирования книги */
  onRowClick($event, id) {
    if (!$event || !$event.target.getAttribute('name')) {
      this.interaction.modalEdit(id);
    }
  }

  /* Клик по кнопке "Удалить" удаляет книгу при помощи IoService */
  onClickRemove(id) {
    this.io.removeData(id, () => {this.setMainGrid(); });
  }
}
