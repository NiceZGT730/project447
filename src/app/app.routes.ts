import { Routes } from '@angular/router';
import { MealSearchComponent } from './component/meal-search/meal-search.component';
import { MealDetailComponent } from './component/meal-detail/meal-detail.component';
import { Top250Component } from './components/top-250/top-250.component';
import { SearchComponent } from './components/search/search.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { AboutComponent } from './components/about/about.component';

export const routes: Routes = [
  // { path: '', component: MealSearchComponent },
  // { path: 'meal/:id', component: MealDetailComponent },
  { path: 'top-250', component: Top250Component },
  { path: 'search', component: SearchComponent },
  { path: 'movie/:id', component: MovieDetailComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'about', component: AboutComponent },
  { path: '', redirectTo: '/top-250', pathMatch: 'full' },
];