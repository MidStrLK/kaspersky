import * as moment from 'moment';

export class IoService {
  private localStorageKey = 'book-';

  public setData(data) {
    localStorage.setItem(this.localStorageKey + data.id, JSON.stringify(data));
  }

  public getData(id) {
    const result = [];
    const prefix = this.localStorageKey + (id || '');

    for (const key in localStorage) {
      if (key.indexOf(prefix) === 0) {
        const item = JSON.parse(localStorage.getItem(key));
        result.push(this.prepareBook(item));
      }
    }

    return id ? result[0] : result;
  }


  private prepareBook(item){
    item.date = moment(String(item.date), 'YYYYMMDD').toDate();
    item.authorstr = [];

    item.author.forEach(aut => {
      item.authorstr.push(aut.name + ' ' + aut.lastname);
    });

    item.authorstr = item.authorstr.join(', ');

    return item;
  }
}
