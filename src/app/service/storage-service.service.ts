import { Recent } from '../interface/recent';
import { Weather } from '../interface/weather';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageServiceService {

  apiResponse: Weather[] = [];
  displayResponse: Weather[] = [];
  favourites: Recent[] = [];
  convertTofahrenite = false;
  isFavourite = false;
  searchResponse: Weather[] = [];

  constructor() { }

  ngOnInIt(): void {
  }

  saveResponse(data: Weather): any {
    this.apiResponse.unshift(data);
    this.displayResponse.push(data);
    localStorage.setItem('SearchHistory', JSON.stringify(this.apiResponse));
  }

  getCurrentCity(): any {
    return this.displayResponse.pop();
  }

  saveFavourites(data: any): void {
    this.favourites.push(data);
  }

  removeCurrentFavourite(data: any): void {
    const index = this.favourites.findIndex(item => item.location === data);
    this.favourites.splice(index, 1);
  }

  checkFavourites(data: Weather): boolean {
    if (this.favourites !== null) {
      return this.favourites.findIndex(item => item.cityId === data.cityId) >= 0;
    }
    return false;
  }

  getFavourites(): any {
    return this.favourites;
  }

  removeFavourites(): any {
    while (this.favourites.length !== 0) {
      this.favourites.pop();
    }
  }

  removeRecentSearch(): any {
    while (this.apiResponse.length !== 0) {
      this.apiResponse.pop();
    }
  }

}
