import * as moment from 'moment';

export class IoService {
  /* Префикс, добавляется к id записи, для простого поиска в localStorage */
  private localStorageKey = 'book-';

  /* Получить записть (если есть id) или все записи */
  public getData(id) {
    const result = [];
    const prefix = this.localStorageKey + (id || '');

    for (const key in localStorage) {
      if (key.indexOf(prefix) === 0) {
        const item = JSON.parse(localStorage.getItem(key));
        result.push(this.prepareBook(item));
      }
    }

    console.log('GET - ', result);

    return id ? result[0] : result;
  }

  /* Сохранить запись */
  public setData(data) {
    localStorage.setItem(this.localStorageKey + data.id, JSON.stringify(data));
  }

  /* Удалить запись */
  public removeData(id, callback) {
    console.log(id);
    if (!id) { return; }

    if (id && localStorage.getItem(this.localStorageKey + id)) {
      localStorage.removeItem(this.localStorageKey + id);

      if (callback && typeof callback === 'function') {
        callback();
      }
    }
  }

  /* Сохраняет данные сортировки */
  public setSort(active, direction) {
    localStorage.setItem('grid_sort', JSON.stringify({active, direction}));
  }

  /* Возвращает данные для сортировки */
  public getSort() {
    const grid_sort = localStorage.getItem('grid_sort');

    return grid_sort ? JSON.parse(grid_sort) : {active: 'name', direction: 'desc'};
  }

  /* Подготовка книги к отображению
   * 1. Дату перевести в формат даты
   * 2. Авторов записать в строку */
  private prepareBook(item) {
    item.date = moment(String(item.date), 'YYYYMMDD').toDate();
    item.authorstr = [];

    item.author.forEach(aut => {
      item.authorstr.push(aut.name + ' ' + aut.lastname);
    });

    item.authorstr = item.authorstr.join(', ');

    return item;
  }
}
