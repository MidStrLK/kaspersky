import { Component } from '@angular/core';
import { InteractionService } from '../service/interaction.service';

@Component({
  selector: 'app-modal-component',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})

export class ModalComponent {
  is_open_window = true;
  authorsList = [];
  author = {
    name: '',
    lastname: ''
  };
  form = {
    name: 'NAME',
    author: 'AUTHOR',
    pages: 100,
    publishing: 'PUBLISHING',
    year: 'YEAR',
    date: 'DATE',
    isbn: 'ISBN',
    image: 'IMAGE'
  };
  placeholders = {
    name: 'Заголовок',
    author: 'Список авторов',
    pages: 'Количество страниц',
    publishing: 'Название издательства',
    year: 'Год публикации',
    date: 'Дата выхода в тираж',
    isbn: 'ISBN',
    image: 'Загрузка изображения',
    authorname: 'Имя автора',
    authorlastname: 'Фамилия автора'
  };

  constructor(private interaction: InteractionService) {
    interaction.modalNew$.subscribe(() => {
      this.openNewModal();
    });

    interaction.modalEdit$.subscribe((id) => {
      this.openEditModal(id);
    });
  }

  onAuthorButtonClick() {
    this.authorsList.push({
      name: this.author.name,
      lastname: this.author.lastname,
    });

    this.author.name = '';
    this.author.lastname = '';
  }

  onApplyClick(){
    console.log(this.form);
  }

  openNewModal() {
    console.log('OPEN NEW');
    this.is_open_window = true;
  }

  openEditModal(id) {
    console.log('EDIT', id);
    this.is_open_window = true;
  }

  /* Закрыть окно */
  closeModalWindow($event, notClose) {
    if (typeof $event === 'object' && $event.stopPropagation) {
      $event.stopPropagation();
    }

    if (!notClose) {
      this.is_open_window = false;
    }
  }







}
