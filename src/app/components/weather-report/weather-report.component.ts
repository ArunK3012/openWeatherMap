import { environment } from './../../../environments/environment.prod';
import { Weather } from '../../interface/weather';
import { StorageServiceService } from './../../service/storage-service.service';
import { WeatherserviceService } from './../../service/weatherservice.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-weather-report',
  templateUrl: './weather-report.component.html',
  styleUrls: ['./weather-report.component.scss'],
  providers: [DatePipe],
})

export class WeatherReportComponent implements OnInit {

  @Output() cityNames = new EventEmitter<string>();

  search = '';
  searchCityWeather = '';
  APIResponse: Weather = {
    location: '',
    description: '',
    temperature: 0,
    tempFahrenite: 0,
    tempMin: 0,
    tempMax: 0,
    humidity: '',
    wind: '',
    icon: '',
    visibility: '',
    country: '',
    cityId: 0,
    isFavourite: false,
  };
  myDate = new Date();
  favouritesActive = false;
  homeActive = true;
  recentActive = false;

  constructor(private service: WeatherserviceService,
              private route: Router,
              private storageservice: StorageServiceService,
              private datePipe: DatePipe) {
              this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
              }

  ngOnInit(): void {
    const url = this.route.url.split('/').pop();
    console.log(url);

    if (url === 'favourite') {
      console.log('fav');
      this.homeActive = false;
      this.favouritesActive = true;
      this.recentActive = false;
    }
    if (url === 'recentSearch') {
      this.homeActive = false;
      this.favouritesActive = false;
      this.recentActive = true;
    }
  }

  onSearch() {
    this.cityNames.emit(this.searchCityWeather);
    console.log('weather');
    this.service.getWeatherInfo(this.searchCityWeather).subscribe(response => {
      console.log(response);
      this.APIResponse = {
       cityId: response.id, location: response.name,
       description: response.weather[0].description,
       temperature: Math.trunc(response.main.temp - 273.15),
       tempFahrenite: Math.floor(((response.main.temp - 273.15) * 9 / 5) + 32),
       tempMin: Math.trunc(response.main.temp_min - 273.15),
       tempMax: Math.trunc(response.main.temp_max - 273.15),
       icon: 'http://openweathermap.org/img/w/' + response.weather[0].icon + '.png',
       humidity: response.main.humidity,
       wind: response.wind.speed,
       visibility: response.visibility,
       country: response.sys.country,
       isFavourite: false,
      };
      // this.storageservice.saveImage(icon, environment.images);
      this.storageservice.searchResponse.push(this.APIResponse);
      console.log(this.storageservice.searchResponse);
      this.storageservice.saveResponse(this.APIResponse);
      localStorage.setItem('APIRESPONSE', JSON.stringify(this.APIResponse));
    });
  }

  openSearch(): void {
    console.log('working');
    const search = document.getElementById('searchBar');
    search?.setAttribute('style', 'display: block');
  }

  closeSearchBar(): void {
    document.getElementById('searchBar')?.setAttribute('style', 'display: none');
  }

  closeAndRedirect(): void{
    document.getElementById('searchBar')?.setAttribute('style', 'display: none');
    // this.route.navigateByUrl('/home');
  }

  sideBarOpen(): void {
    const sideBar = document.getElementById('mySidebar');
    sideBar?.setAttribute('style', 'display: block');
  }

  sideBarClose(): void {
    document.getElementById('mySidebar')?.setAttribute('style', 'display: none');
  }
}
