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
  displayedColumns: string[] = ['name', 'authorstr', 'publishing', 'year'];

  constructor(private io: IoService,
              private interaction: InteractionService) {
    interaction.gridRemove$.subscribe((id) => {
      this.removeStr(id);
    });

    interaction.gridRefresh$.subscribe(() => {
      this.setMainGrid();
    });

    interaction.gridSort$.subscribe((val) => {
      this.sortMainGrid(val);
    });
  }


  ngOnInit() {
    this.setMainGrid();

    this.mainGrid.sort = this.sort;
  }

  sortMainGrid(field) {
    console.log(field);

    this.mainGrid.sort((a, b) => {
      if (a[field] === undefined || b[field] === undefined) {
        return 0;
      }

      if (a[field] < b[field]) {
        return -1;
      }

      if (a[field] > b[field]) {
        return 1;
      }

      return 0;
    });

    console.log(this.mainGrid);
  }

  setMainGrid() {
    const data = this.io.getData(null);

    this.mainGrid = new MatTableDataSource(data);

    console.log(data);
  }

  onRowClick(id) {
    this.interaction.modalEdit(id);
  }

  addStr(data) {
    console.log('ADD STR', data);
  }

  editStr(data) {
    console.log('EDIT STR', data);
  }

  removeStr(id) {
    console.log('REMOVE STR', id);
  }
}
