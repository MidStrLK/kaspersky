import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InteractionService } from '../service/interaction.service';
import { IoService } from '../service/io.service';

import * as moment from 'moment';

@Component({
  selector: 'app-modal-component',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})

export class ModalComponent {
  formGroup: FormGroup;
  is_open_window = false;
  authorsList = [];
  author = {
    name: '',
    lastname: ''
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
  formDefaultValues = {
    id: '',
    name: '',
    pages: 1,
    publishing: '',
    year: parseInt(moment().format('YYYY'), 10),
    date: new Date(),
    isbn: '',
    authorname: '',
    authorlastname: ''
  };
  formValidationMessages = {
    'name': [
      { type: 'required', message: 'Введите заголовок' },
      { type: 'maxlength', message: 'Максимальная длина заголовка - 30 символов' }
    ],
    'pages': [
      { type: 'required', message: 'Введите количество страниц' },
      { type: 'min', message: 'Должна быть хотя бы одна страница' },
      { type: 'max', message: 'Максимальное количество страниц - 10 000' }
    ],
    'publishing': [
      { type: 'maxlength', message: 'Максимальное количество символов - 30' }
    ],
    'year': [
      { type: 'min', message: 'Не ранее 1800 года' },
      { type: 'max', message: 'Не позднее текущего года года' }
    ],
    'date': [
      { type: 'min', message: 'Не ранее 1 января 1800 года' }
    ],
    'isbn': [
      { type: 'pattern', message: 'ISBN должно быть правильным' }
    ]
  };

  constructor(private fb: FormBuilder,
              private io: IoService,
              private interaction: InteractionService) {
    interaction.modalNew$.subscribe(() => {
      this.openModalWindow();
    });

    interaction.modalEdit$.subscribe((id) => {
      this.openEditModal(id);
    });


    this.formGroup = fb.group({
      'id': '',
      'name': [this.formDefaultValues.name, Validators.compose([
        Validators.required,
        Validators.maxLength(30)
      ])],
      'pages': [this.formDefaultValues.pages, Validators.compose([
        Validators.required,
        Validators.min(1),
        Validators.max(10000)
      ])],
      'publishing': [this.formDefaultValues.publishing, Validators.maxLength(30)],
      'year': [this.formDefaultValues.year, Validators.compose([
        Validators.min(1800),
        Validators.max(parseInt(moment().format('YYYY'), 10))
      ])],
      'date': [this.formDefaultValues.date],
      'isbn': [this.formDefaultValues.isbn, Validators.pattern('(ISBN[-]*(1[03])*[ ]*(: ){0,1})*(([0-9Xx][- ]*){13}|([0-9Xx][- ]*){10})')]
    });
  }

  clearModal() {
    this.formGroup.patchValue(this.formDefaultValues);
    this.authorsList = [];
    this.author = {
      name: '',
      lastname: ''
    };
  }

  onAuthorButtonClick() {
    this.authorsList.push({
      name: this.author.name,
      lastname: this.author.lastname,
    });

    this.author.name = '';
    this.author.lastname = '';
  }

  onApplyClick() {
    if (!this.formGroup.valid) {
      return;
    }

    const values = this.formGroup.value;
    values.date = moment(values.date).format('YYYYMMDD');
    values.author = this.authorsList;

    if (!values.id) { values.id = moment().format('x'); }

    this.io.setData(values);

    this.closeModalWindow(null, false);

    this.interaction.refreshGrid();
  }

  openEditModal(id) {
    const data = this.io.getData(id);

    this.formGroup.patchValue(data);

    this.authorsList = data.author;

    this.openModalWindow();
  }

  /* Закрыть окно */
  closeModalWindow($event, notClose) {
    if ($event && typeof $event === 'object' && $event.stopPropagation) {
      $event.stopPropagation();
    }

    if (!notClose) {
      this.is_open_window = false;
      this.clearModal();
    }
  }

  openModalWindow(){
    this.is_open_window = true;
  }



}
