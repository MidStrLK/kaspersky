import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule, MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatNativeDateModule} from '@angular/material';

import { AppComponent } from './app.component';
import { ButtonComponent } from './buttons/button.component';
import { GridComponent } from './grid/grid.component';
import { ModalComponent } from './modal/modal.component';
import { SortComponent } from './sort/sort.component';

import { IoService } from './service/io.service';
import { InteractionService } from './service/interaction.service';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    GridComponent,
    ModalComponent,
    SortComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    IoService,
    InteractionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
