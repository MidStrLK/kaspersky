import { Component } from '@angular/core';
import { InteractionService } from '../service/interaction.service';

@Component({
  selector:  'app-button-component',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  constructor(private interaction: InteractionService) {}

  /* Клик по кнопке добавления книги */
  onClickAdd() {
    this.interaction.modalNew();
  }
}
