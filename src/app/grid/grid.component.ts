import { Component, OnInit } from '@angular/core';
import { InteractionService } from '../service/interaction.service';
import { IoService } from '../service/io.service';

@Component({
  selector: 'app-grid-component',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
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
  }

  ngOnInit() {
    this.setMainGrid();
  }

  setMainGrid() {
    const data = this.io.getData(null);

    this.mainGrid = data;

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
