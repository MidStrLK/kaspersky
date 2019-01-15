import { Component  } from '@angular/core';
import { InteractionService } from '../service/interaction.service';


@Component({
  selector:  'app-button-component',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  is_show_tooltip = false;

  constructor(private interaction: InteractionService) {}

  /* Клик по кнопке добавления книги */
  onClickAdd() {
    this.interaction.modalNew();
  }

  /* Показать тултип при наведении на инфо */
  openTooltip(){
    this.is_show_tooltip = true;
  }

  /* Скрыть тултип */
  closeTooltip(){
    this.is_show_tooltip = false;
  }

}
