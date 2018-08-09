import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ButtonComponent } from './buttons/button.component';
import { GridComponent } from './grid/grid.component';
import { ModalComponent } from './modal/modal.component';
import { SortComponent } from './sort/sort.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    GridComponent,
    ModalComponent,
    SortComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
