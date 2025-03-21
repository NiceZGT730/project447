import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MealdbService } from '../../services/mealdb.service';
import { Meal } from '../../models/meal.model';

@Component({
  selector: 'app-meal-detail',
  imports: [CommonModule],
  templateUrl: './meal-detail.component.html',
  styleUrl: './meal-detail.component.scss',
})
export class MealDetailComponent {
  meal = signal<Meal | null>(null); // Signal สำหรับข้อมูลอาหาร
  isLoading = signal<boolean>(true); // Signal สำหรับสถานะโหลด
  error = signal<string>(''); // Signal สำหรับข้อความ error

  private route = inject(ActivatedRoute);
  private mealService = inject(MealdbService);

  ngOnInit() {
    const mealId = this.route.snapshot.paramMap.get('id');
    if (mealId) {
      this.mealService.getMealById(mealId).subscribe({
        next: (response) => {
          this.meal.set(response.meals?.[0] || null);
          this.isLoading.set(false);
        },
        error: (err) => {
          this.error.set('Error fetching meal: ' + err.message);
          this.isLoading.set(false);
        },
      });
    }
  }
}
