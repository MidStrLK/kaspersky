import { Component } from '@angular/core';

@Component({
  selector: 'app-sort-component',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.css']
})
export class SortComponent {


  onSelectChange($event) {
    const value = $event.target.value;

    console.log(value);
  }
}
