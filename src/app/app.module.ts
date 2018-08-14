import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatInputModule,
  MatButtonModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatTableModule,
  MatSortModule,
  MatSelectModule
} from '@angular/material';
import {MAT_DATE_LOCALE} from '@angular/material/core';

import { AppComponent } from './app.component';
import { ButtonComponent } from './buttons/button.component';
import { GridComponent } from './grid/grid.component';
import { ModalComponent } from './modal/modal.component';

import { IoService } from './service/io.service';
import { InteractionService } from './service/interaction.service';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    GridComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatSortModule,
    MatSelectModule
  ],
  providers: [
    IoService,
    InteractionService,
    {provide: MAT_DATE_LOCALE, useValue: 'ru-RU'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
