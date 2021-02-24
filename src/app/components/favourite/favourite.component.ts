import { StorageServiceService } from './../../service/storage-service.service';
import { Recent } from '../../interface/recent';
import { WeatherserviceService } from './../../service/weatherservice.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss']
})
export class FavouriteComponent implements OnInit {

  location = '';
  favourites = 'false';
  favouriteList: Recent[] = [];
  favouriteLength = 0;
  degree = true;

  constructor(private service: WeatherserviceService,
              private storageService: StorageServiceService) { }

  ngOnInit(): void {
    this.favouriteLength = this.storageService.favourites.length;
    this.favouriteList = this.storageService.getFavourites();
    if (this.storageService.convertTofahrenite === true) {
      this.degree = false;
    }
  }

  displayCity(city: string) {
    this.location = city;
  }

  removeFavourite(cityName: string): void{
  this.storageService.removeCurrentFavourite(cityName);
  this.favouriteLength = this.favouriteLength - 1;
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
    this.storageService.removeFavourites();
    this.favouriteLength = 0;
  }

  openSearch(): void {
    const search = document.getElementById('searchBar');
    search?.setAttribute('style', 'display: block');
  }

  closeSearchBar(): void {
    document.getElementById('searchBar')?.setAttribute('style', 'display: none');
  }
}
