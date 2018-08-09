import { Component } from '@angular/core';
import { InteractionService } from '../service/interaction.service';

@Component({
  selector: 'app-grid-component',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent {
  constructor(private interaction: InteractionService) {
    interaction.gridRemove$.subscribe((id) => {
      this.removeStr(id);
    });
  }

  addStr(data){
    console.log('ADD STR', data);
  }

  editStr(data){
    console.log('EDIT STR', data);
  }

  removeStr(id){
    console.log('REMOVE STR', id);
  }
}
