import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { InteractionService } from '../service/interaction.service';
import { IoService } from '../service/io.service';

@Component({
  selector: 'app-grid-component',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
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

    this.mainGrid.sort = this.sort;
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
