import { Routes } from '@angular/router';
import { MealSearchComponent } from './component/meal-search/meal-search.component';
import { MealDetailComponent } from './component/meal-detail/meal-detail.component';

export const routes: Routes = [
  { path: '', component: MealSearchComponent },
  { path: 'meal/:id', component: MealDetailComponent },
];
