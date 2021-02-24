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
  recentSearch: Weather[] = [];

  @Output() searchCityName = new EventEmitter<string>();

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
  favourite = {
    location: '',
    temperature: 0,
    description: '',
    country: '',
    tempFahrenite: 0,
    addFavourite: false,
  };
  temperatureFahrenite = 0;
  degree = true;
  color = '#FAD05B';
  favouriteList: Recent[] = [];
  weatherResponse: any;
  searchHistory: any;
  data: Weather[] = [];

  constructor(private service: WeatherserviceService,
              private storageService: StorageServiceService) { }

  ngOnInit(): void {
    this.recentSearch = JSON.parse(localStorage.getItem('SearchHistory') || 'null');
    console.log(this.recentSearch);
    this.searchHistory = this.storageService.getSearchHistory();
    console.log(this.searchHistory);
    this.favourite = this.storageService.getFavourites();
    console.log(this.favourite);
    if (this.favourite !== null) {
    }
    if (this.recentSearch !== null) {
      this.recentSearchhistory = 'true';
      console.log(this.recentSearch);
    }
    else {
      this.recentSearchhistory = 'false';
    }
    if (this.storageService.convertTofahrenite === true) {
      this.degree = false;
    }
    this.weatherResponse = this.storageService.getFavourites();
    console.log(this.weatherResponse);
    // this.favouriteAdded(this.location);
  }

  displayCity(city: string) {
    console.log(city);
    this.location = city;
  }

  favouriteAdded(index: number): any{
    const item = this.data[index];
    if (this.storageService.checkFavourites(item)) {
      this.storageService.removeCurrentFavourite(item);
    }
    else {
      this.storageService.saveFavourites(item);
    }
  }

  onFavouriteAdd(city: number): void {
    this.isFavourite = false;
    this.location.toUpperCase();
    if (this.isFavourite === false) {
      this.isFavourite = true;
      this.color = '#FAD05B';
      this.favourite = {
        location: this.location, temperature: 10, description: 'this.description',
        country: 'this.country', addFavourite: true, tempFahrenite: this.temperatureFahrenite,
      };
      this.storageService.isFavourite = true;
      this.favouriteList.push(this.searchHistory);
      console.log(this.favouriteList);
      this.storageService.saveFavourites(this.favouriteList);
      // console.log(this.favourite);
      console.log(this.recentSearch);
    }
  }

  removeFavourite(city: number): void {
    if (this.isFavourite === true) {
      this.isFavourite = false;
      this.color = '#ffffff';
      console.log(this.favourite.location);
      this.storageService.isFavourite = false;
      this.storageService.removeCurrentFavourite(this.favourite.location);
      // const index = this.favouriteList.findIndex(item => item.location === this.favourite.location);
      // this.favouriteList.splice(index, 1);
      // const index = this.favourite(item => item.location === data.location);
      // this.favourites.splice(index, 1);
      // this.storageService.removeFavourite(findLocation);
      console.log(this.favouriteList);
    }
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
    // this.storageService.removeRecentSearch();
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
