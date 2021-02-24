import { Weather } from './../interface/weather';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherserviceService {

  baseUrl = 'https://api.openweathermap.org/data/2.5/weather?';
  APIKey = 'c64e2817d93e9326a2870c489c0d1018';
  dataChanged = new Subject<Weather>();

  public responseCache = new Map();

  constructor(private http: HttpClient) { }

  ngOnInIt(): void {
  }

  getWeatherInfo(cityName = 'Mysuru'): Observable<any>{
    const url = `${this.baseUrl}q=${cityName}&appid=${this.APIKey}`;
    const fromCache = this.responseCache.get(url);
    if (fromCache) {
      return of(fromCache);
    }
    const resp = this.http.get(url);
    resp.subscribe(city => this.responseCache.set(url, city));
    return resp;
   }

}
