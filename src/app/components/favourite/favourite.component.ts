import { Weather } from './../../interface/weather';
import { StorageServiceService } from './../../service/storage-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss']
})
export class FavouriteComponent implements OnInit {

  location = '';
  degree = true;
  data: Weather[] = [];

  constructor(private storageService: StorageServiceService) { }

  ngOnInit(): void {
    this.data = this.storageService.getFavourites();
  }

  displayCity(city: string) {
    this.location = city;
  }

  clearAll(): void{
    this.storageService.removeFavourites();
    this.data.length = 0;
  }
}
