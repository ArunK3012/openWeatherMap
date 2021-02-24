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
  recentSearchhistory = 'false';
  recentSearch: Weather[] = [];

  @Output() searchCityName = new EventEmitter<string>();

  temperatureFahrenite = 0;
  degree = true;
  color = '#FAD05B';
  data: Weather[] = [];

  constructor(private storageService: StorageServiceService) { }

  ngOnInit(): void {
    this.recentSearch = JSON.parse(localStorage.getItem('SearchHistory') || 'null');
    if (this.recentSearch !== null) {
      this.recentSearchhistory = 'true';
    }
    else {
      this.recentSearchhistory = 'false';
    }
    if (this.storageService.convertTofahrenite === true) {
      this.degree = false;
    }
  }

  displayCity(city: string) {
    this.location = city;
  }

  favouriteAdded(index: number): any{
    const item = this.recentSearch[index];
    return this.storageService.checkFavourites(item);
  }

  onFavouriteAdd(data: Weather): void {
    this.location.toUpperCase();
    this.color = '#FAD05B';
    this.storageService.saveFavourites(data);
  }

  removeFavourite(data: Weather): void {
      this.color = '#ffffff';
      this.storageService.removeCurrentFavourite(data.location);
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
