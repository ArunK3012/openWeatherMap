import { Router } from '@angular/router';
import { environment } from './../../../environments/environment.prod';
import { DatePipe } from '@angular/common';
import { StorageServiceService } from './../../service/storage-service.service';
import { Recent } from '../../interface/recent';
import { WeatherserviceService } from './../../service/weatherservice.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Weather } from 'src/app/interface/weather';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [DatePipe]
})
export class HomeComponent implements OnInit {

  location = '';
  temp = 'Add to favourite';
  color = '#ffffff';
  isFavourite = false;
  temperature = 25;
  temperatureFahrenite = 10;
  tempMin = 20;
  tempMax = 30;
  visibility: number | undefined;
  wind: number | undefined;
  precipitation = '0';
  humidity = '';
  cityId: any;
  cityName: any;
  icon: any;
  description = '';
  country: any;
  myDate = new Date();
  APIResponse: Weather = {
    location: '',
    description: '',
    temperature: 0,
    tempFahrenite: 0,
    tempMin: 0,
    tempMax: 0,
    icon: '',
    humidity: '',
    wind: '',
    visibility: '',
    country: '',
    cityId: 0,
    isFavourite: false,
  };
  weatherResponse: any;
  favourite = {
    location: '',
    temperature: 0,
    description: '',
    country: '',
    tempFahrenite: 0,
    addFavourite: false,
    icon: '',
    cityId: 0,
  };
  backgroundColor = '#ffffff';
  bgColor = 'rgba(255, 255, 255, 0)';
  recentCityName = '';

  @Output() cityNames = new EventEmitter<string>();

  constructor(private service: WeatherserviceService,
              private storageService: StorageServiceService,
              private datePipe: DatePipe,
              private router: Router) {
    this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
  }

  ngOnInit(): void {
    const url = this.router.url.split('/').pop();
    if (url !== 'home') {
      if (url !== undefined) {
        const name = JSON.parse(localStorage.getItem('SearchHistory') || 'null');
        this.recentCityName = url;
        for (let i = 0; i < name.length; i++) {
          if (this.recentCityName === name[i].location) {
            this.service.getWeatherInfo(this.recentCityName).subscribe(response => {
              this.cityId = response.id;
              this.description = response.weather[0].description;
              this.icon = 'http://openweathermap.org/img/w/' + response.weather[0].icon + '.png';
              this.country = response.sys.country;
              this.humidity = response.main.humidity;
              this.location = response.name;
              this.tempMax = Math.trunc(response.main.temp_max - 273.15);
              this.tempMin = Math.trunc(response.main.temp_min - 273.15);
              this.temperature = Math.trunc(response.main.temp - 273.15);
              this.visibility = response.visibility;
              this.wind = response.wind.speed;
            });
          }
        }
      }
    }
    if (url === 'home') {
      this.weatherResponse = (this.storageService.getCurrentCity());
      if (this.weatherResponse === undefined) {
        this.service.getWeatherInfo('Mysuru').subscribe(response => {
          this.cityId = response.id;
          this.description = response.weather[0].description;
          this.icon = 'http://openweathermap.org/img/w/' + response.weather[0].icon + '.png';
          this.country = response.sys.country;
          this.humidity = response.main.humidity;
          this.location = response.name;
          this.tempMax = Math.trunc(response.main.temp_max - 273.15);
          this.tempMin = Math.trunc(response.main.temp_min - 273.15);
          this.temperature = Math.trunc(response.main.temp - 273.15);
          this.visibility = response.visibility;
          this.wind = response.wind.speed;
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
        });
      }
      if (this.weatherResponse !== undefined) {
        const resp = this.storageService.getFavourites();
        for (let i = 0; i < resp.length; i++) {
          if (this.weatherResponse.location === resp[i].location) {
            this.isFavourite = true;
            this.color = '#FAD05B';
          }
          else {
            this.isFavourite = false;
            this.color = '#fff';
          }
        }
        this.cityId = this.weatherResponse.cityId;
        this.description = this.weatherResponse.description;
        this.icon =  this.weatherResponse.icon;
        this.country = this.weatherResponse.country;
        this.humidity = this.weatherResponse.humidity;
        this.location = this.weatherResponse.location;
        this.tempMax = this.weatherResponse.tempMax;
        this.tempMin = this.weatherResponse.tempMin;
        this.temperature = this.weatherResponse.temperature;
        this.visibility = this.weatherResponse.visibility;
        this.wind = this.weatherResponse.wind;
      }
    }
    if (this.storageService.convertTofahrenite === true) {
      this.convertTofahrenite();
    }
  }

  displayCity(city: string): void {
    this.location = city;
    this.service.getWeatherInfo(city).subscribe(response => {
      const resp = this.storageService.getFavourites();
      for (let i = 0; i < resp.length; i++) {
        if (response.name === resp[i].location) {
          this.isFavourite = true;
          this.color = '#FAD05B';
        }
        else {
          this.isFavourite = false;
          this.color = '#fff';
        }
      }
      this.cityId = response.id;
      this.location = response.name;
      this.description = response.weather[0].description;
      this.temperature = Math.floor(response.main.temp - 273.15);
      this.temperatureFahrenite = Math.trunc(((response.main.temp - 273.15) * 9 / 5) + 32);
      this.tempMin = Math.floor(response.main.temp_min - 273.15);
      this.tempMax = Math.floor(response.main.temp_max - 273.15);
      this.icon = 'http://openweathermap.org/img/w/' + response.weather[0].icon + '.png',
        this.humidity = response.main.humidity;
      this.wind = response.wind.speed;
      this.visibility = response.visibility;
      this.country = response.sys.country;
    });
  }

  onFavouriteAdd(): void {
    this.isFavourite = false;
    this.location.toUpperCase();
    if (this.isFavourite === false) {
      this.isFavourite = true;
      this.color = '#FAD05B';
      this.favourite = {
        location: this.location, temperature: this.temperature, description: this.description,
        country: this.country, addFavourite: true, tempFahrenite: this.temperatureFahrenite,
        icon: this.icon, cityId: this.cityId,
      };
      this.storageService.isFavourite = true;
      this.storageService.saveFavourites(this.favourite);
    }
  }

  removeFavourite(): void {
    if (this.isFavourite === true) {
      this.isFavourite = false;
      this.color = '#ffffff';
      this.storageService.isFavourite = false;
      this.storageService.removeCurrentFavourite(this.favourite.location);
    }
  }

  convertToDegree(): void {
    this.temperature = Math.floor((this.temperature - 32) * (5 / 9));
    this.tempMin = Math.trunc((this.tempMin - 32) * 5 / 9);
    this.tempMax = Math.trunc((this.tempMax - 32) * 5 / 9);
    this.backgroundColor = 'white';
    document.getElementById('degree')?.setAttribute('style', 'color: #E32843');
    this.bgColor = 'rgba(255, 255, 255, 0)';
    document.getElementById('fahrenite')?.setAttribute('style', 'color: white');
    this.storageService.convertTofahrenite = false;
  }

  convertTofahrenite(): void {
    this.temperature = Math.floor((this.temperature * 9 / 5) + 32);
    this.tempMin = Math.trunc((this.tempMin * 9 / 5) + 32);
    this.tempMax = Math.trunc((this.tempMax * 9 / 5) + 32);
    this.bgColor = '#ffffff';
    document.getElementById('fahrenite')?.setAttribute('style', 'color: #E32843');
    this.backgroundColor = 'rgba(255, 255, 255, 0)';
    document.getElementById('degree')?.setAttribute('style', 'color: white');
    this.storageService.convertTofahrenite = true;
  }
}
