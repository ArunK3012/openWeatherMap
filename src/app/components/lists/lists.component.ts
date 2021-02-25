import { Weather } from './../../interface/weather';
import { StorageServiceService } from './../../service/storage-service.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {

  degree = true;
  recentSearch: Weather[] = [];
  @Input() data: any;

  constructor(private storageService: StorageServiceService) { }

  ngOnInit(): void {
    this.recentSearch = JSON.parse(localStorage.getItem('SearchHistory') || 'null');
    if (this.storageService.convertTofahrenite === true) {
      this.degree = false;
    }
  }

  favouriteAdded(index: number): any{
    const item = this.recentSearch[index];
    return this.storageService.checkFavourites(item);
  }

  onFavouriteAdd(data: Weather): void {
    this.storageService.saveFavourites(data);
  }

  removeFavourite(data: Weather): void {
      this.storageService.removeCurrentFavourite(data.location);
  }
}
