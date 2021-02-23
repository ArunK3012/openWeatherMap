import { Recent } from '../../interface/recent';
import { Weather } from '../../interface/weather';
import { StorageServiceService } from './../../service/storage-service.service';
import { WeatherserviceService } from './../../service/weatherservice.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-recent-search',
  templateUrl: './recent-search.component.html',
  styleUrls: ['./recent-search.component.scss']
})
export class RecentSearchComponent implements OnInit {

  location = '';
  searchWeather = '';
  recentSearchhistory = 'false';
  isFavourite = false;
  recentSearch: Recent[] = [];

  @Output() searchCityName = new EventEmitter<string>();

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

  constructor(private service: WeatherserviceService,
              private storageService: StorageServiceService) { }

  ngOnInit(): void {
    this.recentSearch = JSON.parse(localStorage.getItem('SearchHistory') || 'null');
    console.log(this.recentSearch);
    if (this.recentSearch !== null) {
      this.recentSearchhistory = 'true';
      console.log(this.recentSearch);
    }
    else {
      this.recentSearchhistory = 'false';
    }
  }

  displayCity(city: string) {
    this.location = city;
  }

  getIcon(type: string): string {
    let iconName = '';
    switch (type) {
      case 'Thunderstorm':
        iconName = 'thunderstorm_small';
        break;
      case 'Drizzle':
        iconName = 'mostly_cloudy_small';
        break;
      case 'Rain':
        iconName = 'rain_small';
        break;
      case 'Clear':
        iconName = 'clear_night_small';
        break;
      case 'few clouds':
        iconName = 'partly_cloudy_small';
        break;
      case 'Clouds':
        iconName = 'mostly_cloudy_small';
        break;
      case 'Haze':
        iconName = 'partly_cloudy_small';
        break;
      case 'fog':
        iconName = 'partly_cloudy_small';
        break;
      case 'mist':
        iconName = 'partly_cloudy_small';
        break;
      default:
        iconName = 'mostly_sunny_small';
        break;
    }
    const iconPath = `assets/${iconName}.png`;
    return iconPath;
  }

  clearAll(): void{
    localStorage.removeItem('SearchHistory');
    window.location.reload();
  }

  openSearch(): void {
    const search = document.getElementById('searchBar');
    search?.setAttribute('style', 'display: block');
  }

  closeSearchBar(): void {
    document.getElementById('searchBar')?.setAttribute('style', 'display: none');
  }

}
