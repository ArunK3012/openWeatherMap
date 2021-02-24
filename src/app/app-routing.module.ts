import { FavouriteComponent } from './components/favourite/favourite.component';
import { RecentSearchComponent } from './components/recent-search/recent-search.component';
import { HomeComponent } from './components/home/home.component';
import { WeatherReportComponent } from './components/weather-report/weather-report.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/weather', pathMatch: 'full' },
  { path: 'weather', component: WeatherReportComponent},
    {path: 'recentSearch', component: RecentSearchComponent},
    {path: 'favourite', component: FavouriteComponent},
    { path: 'home', component: HomeComponent },
    { path: 'home/:id', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
