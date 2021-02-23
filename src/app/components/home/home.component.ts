import { DatePipe } from '@angular/common';
import { StorageServiceService } from './../../service/storage-service.service';
import { Recent } from '../../interface/recent';
import { WeatherserviceService } from './../../service/weatherservice.service';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Weather } from 'src/app/interface/weather';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [DatePipe]
})
export class HomeComponent implements OnInit {

  location = '';
  searchCityWeather = '';
  search = '';
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
  description = '';
  country: any;
  recentList: Recent[] = [];
  favouriteList: Recent[] = [];
  myDate = new Date();
  thumbnail: any;
  response: any;
  APIResponse: Weather = {
    location: '',
    description: '',
    temperature: 0,
    tempMin: 0,
    tempMax: 0,
    humidity: '',
    wind: '',
    visibility: '',
    country: '',
    cityId: '',
    isFavourite: false,
  };
  weatherResponse: any;
  favourite = {
    location: '',
    temperature: 0,
    description: '',
    country: '',
    addFavoruite: false,
  };
  backgroundColor = '#ffffff';
  bgColor = 'rgba(255, 255, 255, 0)';

  @Output() cityNames = new EventEmitter<string>();

  constructor(private service: WeatherserviceService,
              private storageService: StorageServiceService,
              private datePipe: DatePipe) {
                this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
              }

  ngOnInit(): void {
    console.log(this.storageService.getCurrentCity());
    this.weatherResponse = (this.storageService.getCurrentCity());
    if (this.weatherResponse === undefined) {
      this.service.getWeatherInfo('mysuru').subscribe(response => {
        console.log(response);
        this.weatherResponse = response;
        this.cityId = this.weatherResponse.id;
        this.description = this.weatherResponse.weather[0].description;
        this.country = this.weatherResponse.sys.country;
        this.humidity = this.weatherResponse.main.humidity;
        this.location = this.weatherResponse.name;
        this.tempMax = Math.trunc(this.weatherResponse.main.temp_max - 273.15);
        this.tempMin = Math.trunc(this.weatherResponse.main.temp_min - 273.15);
        this.temperature = Math.trunc(this.weatherResponse.main.temp - 273.15);
        this.visibility = this.weatherResponse.visibility;
        this.wind = this.weatherResponse.wind.speed;
        this.APIResponse = {
          cityId: response.id, location: response.name,
          description: response.weather[0].description,
          temperature: Math.trunc(response.main.temp - 273.15),
          tempMin: Math.trunc(response.main.temp_min - 273.15),
          tempMax: Math.trunc(response.main.temp_max - 273.15),
          humidity: response.main.humidity,
          wind: response.wind.speed,
          visibility: response.visibility,
          country: response.sys.country,
          isFavourite: false,
         };
         // console.log(this.APIResponse);
        this.storageService.apiResponse.push(this.APIResponse);
        // this.storageService.saveResponse(this.APIResponse);
        // this.storageService.saveResponse(this.weatherResponse);
      });
    }
    if (this.weatherResponse !== undefined) {
      const resp = this.storageService.getFavourites();
      console.log(resp);
      console.log(this.weatherResponse.location);
      for (let i=0; i<resp.length; i++) {
      if (this.weatherResponse.location === resp[i].location) {
          console.log(resp[i].location);
          console.log('added to fav');
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

  displayCity(city: string): void{
    this.location = city;
    this.service.getWeatherInfo(city).subscribe(response => {
      const resp = this.storageService.getFavourites();
      for (let i=0; i<resp.length; i++) {
      if (response.name === resp[i].location) {
          console.log(resp[i].location);
          console.log('added to fav');
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
      this.temperatureFahrenite = Math.trunc((this.temperature * 9 / 5) + 32);
      this.tempMin = Math.floor(response.main.temp_min - 273.15);
      this.tempMax = Math.floor(response.main.temp_max - 273.15);
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
        country: this.country, addFavoruite: true,
      };
      this.favouriteList.push(this.favourite);
      this.storageService.saveFavourites(this.favourite);
      console.log(this.favourite);
      console.log(this.favouriteList);
    }
  }

  removeFavourite(): void {
    if (this.isFavourite === true) {
      this.isFavourite = false;
      this.color = '#ffffff';
      console.log(this.favourite.location);
      this.storageService.removeCurrentFavourite(this.favourite.location);
      // const index = this.favouriteList.findIndex(item => item.location === this.favourite.location);
      // this.favouriteList.splice(index, 1);
      // const index = this.favourite(item => item.location === data.location);
      // this.favourites.splice(index, 1);
      // this.storageService.removeFavourite(findLocation);
      console.log(this.favouriteList);
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
  }

  convertTofahrenite(): void {
    this.temperature = Math.floor((this.temperature * 9 / 5) + 32);
    this.tempMin = Math.trunc((this.tempMin * 9 / 5) + 32);
    this.tempMax = Math.trunc((this.tempMax * 9 / 5) + 32);
    this.bgColor = '#ffffff';
    document.getElementById('fahrenite')?.setAttribute('style', 'color: #E32843');
    this.backgroundColor = 'rgba(255, 255, 255, 0)';
    document.getElementById('degree')?.setAttribute('style', 'color: white');
  }

  toCelsius(data: number): number {
    return (data - 32) * 5 / 9;
  }

  toFahreneit(data: number): number {
    return (data * 9 / 5) + 32;
  }

  getIcon(type: string): string {
    let iconName = '';
    switch (type) {
      case 'Thunderstorm':
        iconName = 'thunderstorm_big';
        break;
      case 'Drizzle':
        iconName = 'mostly_cloudy_big';
        break;
      case 'Rain':
        iconName = 'rain_big';
        break;
      case 'Clear':
        iconName = 'clear_night';
        break;
      case 'few clouds':
        iconName = 'partially_cloudy_big';
        break;
      case 'Clouds':
        iconName = 'mostly_cloudy_big';
        break;
      case 'Haze':
        iconName = 'partially_cloudy_big';
        break;
      case 'fog':
        iconName = 'partially_cloudy_big';
        break;
      case 'mist':
        iconName = 'partially_cloudy_big';
        break;
      default:
        iconName = 'mostly_sunny';
        break;
    }
    const iconPath = `assets/${iconName}.png`;
    return iconPath;
  }

  sideBarOpen(): void {
    const sideBar = document.getElementById('mySidebar');
    sideBar?.setAttribute('style', 'display: block');
  }

  sideBarClose(): void {
    document.getElementById('mySidebar')?.setAttribute('style', 'display: none');
  }

  openSearch(): void {
    console.log('working');
    const search = document.getElementById('searchBar');
    search?.setAttribute('style', 'display: block');
  }

  closeSearchBar(): void {
    document.getElementById('searchBar')?.setAttribute('style', 'display: none');
  }
}
