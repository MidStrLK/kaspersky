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
  formGroup: FormGroup;                   // Форма
  id = null;                              // id книги (null - новая)
  image = null;                           // картинка обложки книги
  is_open_window = false;                 // Флаг открытого окна
  image_height: 250;                      // высота изображения обложки
  authorsList = [{
    name: '',
    lastname: ''
  }];          // Список авторов
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
  };  // Список названий полей формы
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
  };        // Значения полей формы по умолчанию
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
      {type: 'pattern', message: 'ISBN должно быть правильным'}
    ]
  };         // Сообщения ошибок при валидации формы

  constructor(private fb: FormBuilder,
              private io: IoService,
              private interaction: InteractionService) {

    /* Событие добавления книги */
    interaction.modalNew$.subscribe(() => {
      this.openModalWindow();
    });

    /* Событие редактирования книги */
    interaction.modalEdit$.subscribe((id) => {
      this.openEditModal(id);
    });

    this.image_height = 250;

    /* инициируем форму */
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

  /* Клик  по кнопке "добавить автора" добавляет 2 поля для имени и фамилии */
  onAuthorButtonClick() {
    this.authorsList.unshift({
      name: '',
      lastname: '',
    });
  }

  /* Клик по кнопке "Сохранить" */
  onApplyClick() {
    if (!this.formGroup.valid) {
      return;
    }

    const values = this.formGroup.value;
    values.date = moment(values.date).format('YYYYMMDD');
    values.author = [];
    values.id = this.id;
    values.image = this.image;

    this.authorsList.forEach(item => {
      if (item.name || item.lastname) {
        values.author.push({
          name: item.name,
          lastname: item.lastname
        });
      }
    });

    if (!values.id) { values.id = moment().format('x'); }

    this.io.setData(values);

    this.closeModalWindow(null, false);

    this.interaction.gridRefresh();
  }

  /* Вставка загруженного изображения в  #imageView и получения base64 кода*/
  encodeImageFileAsURL() {
    const inputFileToLoad: any = document.getElementById('inputFileToLoad');
    const filesSelected = inputFileToLoad.files;
    if (filesSelected.length > 0) {
      const fileToLoad = filesSelected[0];
      const fileReader = new FileReader();
      const me = this;

      fileReader.onload = function(fileLoadedEvent) {
        const target: any =  fileLoadedEvent.target;
        const srcData = target.result; // <--- data: base64

        const newImage = document.createElement('img');
        newImage.src = srcData;

        document.getElementById('imageView').innerHTML = newImage.outerHTML;
        const node: any = document.getElementById('imageView').childNodes[0];
        node.height = me.image_height;

        me.image = newImage.outerHTML;
      };

      fileReader.readAsDataURL(fileToLoad);
    }
  }

  /* Очистка всех полей окна */
  clearModal() {
    this.formGroup.patchValue(this.formDefaultValues);
    this.authorsList = [];
    this.id = null;
    this.image = null;
  }

  /* Открытие окна для редактирования */
  openEditModal(id) {
    const data = this.io.getData(id);

    this.id = data.id;
    this.image = data.image;
    this.formGroup.patchValue(data);

    this.authorsList = data.author;

    this.openModalWindow();

    if (data.image) {
      setTimeout(() => {
        document.getElementById('imageView').innerHTML = data.image;
        const node: any = document.getElementById('imageView').childNodes[0];
        node.height = this.image_height;
      }, 10);

    }
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

  /* Открыть окно */
  openModalWindow() {
    this.is_open_window = true;
  }



}
