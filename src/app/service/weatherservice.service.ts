import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherserviceService {

  baseUrl = 'https://api.openweathermap.org/data/2.5/weather?';
  APIKey = 'c64e2817d93e9326a2870c489c0d1018';

  constructor(private http: HttpClient) { }

  ngOnInIt(): void {
  }

  getWeatherInfo(cityName = 'Mysuru'): Observable<any>{
    const url = `${this.baseUrl}q=${cityName}&appid=${this.APIKey}`;
    return this.http.get(url);
   }

}
