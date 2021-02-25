import { Weather } from '../../interface/weather';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-recent-search',
  templateUrl: './recent-search.component.html',
  styleUrls: ['./recent-search.component.scss']
})
export class RecentSearchComponent implements OnInit {

  location = '';
  recentSearchhistory = false;

  @Output() searchCityName = new EventEmitter<string>();

  data: Weather[] = [];

  constructor() { }

  ngOnInit(): void {
    this.data = JSON.parse(localStorage.getItem('SearchHistory') || 'null');
    if (this.data !== null) {
      this.recentSearchhistory = true;
    }
    else {
      this.recentSearchhistory = false;
    }
  }

  displayCity(city: string) {
    this.location = city;
  }

  clearAll(): void{
    localStorage.removeItem('SearchHistory');
    window.location.reload();
  }
}
