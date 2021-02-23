import { Recent } from '../interface/recent';
import { WeatherserviceService } from './weatherservice.service';
import { Weather } from '../interface/weather';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageServiceService {

  apiResponse: Weather[] = [];
  displayResponse: Weather[] = [];
  favourites: Recent[] = [];

  constructor(private service: WeatherserviceService) { }

  ngOnInIt(): void {
  }

  saveResponse(data: Weather): any {
    this.apiResponse.unshift(data);
    const len = this.apiResponse.length;
    console.log(this.apiResponse);
    this.apiResponse.filter((value: any, index: any) => this.apiResponse.indexOf(value) === index);
    console.log(this.apiResponse);
    this.displayResponse.push(data);
    console.log('displayResponse', this.displayResponse);
    localStorage.setItem('SearchHistory', JSON.stringify(this.apiResponse));
  }

  removeDup(data: any): void {
    console.log('funcito');
    return data.filter((value: any, index: any) => data.indexOf(value) === index);
  }

  getSearchHistory(): any {
    return this.apiResponse;
  }

  getRecentCity(): any {
    const currentCity = JSON.parse(localStorage.getItem('SearchHistory') || '');
    console.log(currentCity);
  }

  getCurrentCity(): any {
    // console.log(this.displayResponse.pop());
    return this.displayResponse.pop();
  }

  saveFavourites(data: any): void {
    this.favourites.push(data);
  }

  removeCurrentFavourite(data: any): void {
    const index = this.favourites.findIndex(item => item.location === data);
    this.favourites.splice(index, 1);
  }

  getFavourites(): any {
    return this.favourites;
  }

  removeFavourites(): any {
    while (this.favourites.length !== 0) {
      this.favourites.pop();
    }
  }

}
