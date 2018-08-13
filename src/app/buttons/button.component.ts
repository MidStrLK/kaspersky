import { Component } from '@angular/core';
import { InteractionService } from '../service/interaction.service';

@Component({
  selector: 'app-button-component',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  sortItems: [{
    label: 'По заголовку',
    value: 'name'
  }, {
    label: 'По году публикации',
    value: 'year'
  }];

  constructor(private interaction: InteractionService) {
    this.sortItems = [{
      label: 'По заголовку',
      value: 'name'
    }, {
      label: 'По году публикации',
      value: 'year'
    }];
  }

  onClickAdd() {
    console.log('CLICK_ADD');
    this.interaction.modalNew();
  }
  onClickEdit() {
    console.log('CLICK_EDIT');
    this.interaction.modalEdit('id');
  }
  onClickRemove() {
    console.log('CLICK_REMOVE');
    this.interaction.gridRemove('id');
  }

  onSelectChange($event) {
    const value = $event.value;

    if (value) { this.interaction.gridSort(value); }
  }
}
