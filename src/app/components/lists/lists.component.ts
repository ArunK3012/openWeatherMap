import { Weather } from './../../interface/weather';
import { StorageServiceService } from './../../service/storage-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {

  degree = true;
  data: Weather[] = [];

  constructor(private storageService: StorageServiceService) { }

  ngOnInit(): void {
    if (this.storageService.convertTofahrenite === true) {
      this.degree = false;
    }
  }

  favouriteAdded(item: Weather): any{
    // const item = this.recentSearch[index];
    return this.storageService.checkFavourites(item);
  }

  onFavouriteAdd(data: Weather): void {
    // this.location.toUpperCase();
    // this.color = '#FAD05B';
    this.storageService.saveFavourites(data);
  }

  removeFavourite(data: Weather): void {
      // this.color = '#ffffff';
      this.storageService.removeCurrentFavourite(data.location);
  }
}
