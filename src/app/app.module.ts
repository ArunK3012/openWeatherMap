import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherReportComponent } from './components/weather-report/weather-report.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule} from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { FavouriteComponent } from './components/favourite/favourite.component';
import { RecentSearchComponent } from './components/recent-search/recent-search.component';

@NgModule({
  declarations: [
    AppComponent,
    WeatherReportComponent,
    HomeComponent,
    FavouriteComponent,
    RecentSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
