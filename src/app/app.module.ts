import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import date from 'date-and-time';
import { CommonModule, DatePipe } from '@angular/common';

// importing the order module
import { Ng2OrderModule } from 'ng2-order-pipe';
import {FlightsService} from './components/flights/flights.service';
import { AppComponent } from './app.component';
import { FlightsComponent } from './components/flights/flights.component';
import { FiltersComponent } from './filters/filters.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    FlightsComponent,
    FiltersComponent  ],
  imports: [
    BrowserModule,
    Ng2OrderModule,
    CommonModule,
    FormsModule
    
  ],
  providers: [DatePipe,FlightsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
