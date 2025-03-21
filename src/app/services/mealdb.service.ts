import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LookupResponse, SearchResponse } from '../models/meal.model';

@Injectable({
  providedIn: 'root'
})
export class MealdbService {
  private readonly apiUrl = 'https://www.themealdb.com/api/json/v1/1';
  private readonly http = inject(HttpClient);

  searchMeals(query: string): Observable<SearchResponse> {
    return this.http.get<SearchResponse>(`${this.apiUrl}/search.php`, {
      params: { s: query.trim() },
    });
  }

  getMealById(mealId: string): Observable<LookupResponse> {
    return this.http.get<LookupResponse>(`${this.apiUrl}/lookup.php`, {
      params: { i: mealId },
    });
  }
}

