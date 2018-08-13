import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import { InteractionService } from '../service/interaction.service';
import { IoService } from '../service/io.service';

@Component({
  selector: 'app-grid-component',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  mainGrid: any = [];
  displayedColumns: string[] = [
    'name',
    'authorstr',
    'publishing',
    'year',
    'remove'];

  constructor(private io: IoService,
              private interaction: InteractionService) {
    interaction.gridRefresh$.subscribe(() => {
      this.setMainGrid();
    });
  }


  ngOnInit() {
    this.setMainGrid();

    this.mainGrid.sort = this.sort;
  }

  setMainGrid() {
    const data = this.io.getData(null);

    if (data) {
      this.mainGrid = new MatTableDataSource(data);
    }
  }

  onRowClick($event, id) {
    if (!$event || !$event.target.getAttribute('name')) {
      this.interaction.modalEdit(id);
    }
  }

  onClickRemove(id) {
    this.io.removeData(id, () => {this.setMainGrid(); });
  }
}
