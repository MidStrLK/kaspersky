import { Component } from '@angular/core';

@Component({
  selector: 'app-button-component',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {

  onClickAdd() {
    console.log('CLICK_ADD');
  }
  onClickEdit() {
    console.log('CLICK_EDIT');
  }
  onClickRemove() {
    console.log('CLICK_REMOVE');
  }
}
