import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MealdbService } from '../../services/mealdb.service';
import { Meal } from '../../models/meal.model';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-meal-detail',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './meal-detail.component.html',
  styleUrl: './meal-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MealDetailComponent {
  meals = signal<Meal[] | null>(null);

  isLoading = signal<boolean>(true); // Signal สำหรับสถานะโหลด
  error = signal<string>(''); // Signal สำหรับข้อความ error

  private route = inject(ActivatedRoute);
  private mealService = inject(MealdbService);
  private readonly fb = inject(FormBuilder).nonNullable;

  protected readonly formGroup = this.fb.group({
    q: this.fb.control('', { updateOn: 'submit' })
  });



  protected onSubmit(): void {
    // trigger re-compute
    this.formGroup.markAllAsTouched();
  }

  protected clear(): void {
    this.formGroup.patchValue({ q: '' });
  }

  protected readonly filteredMeals = computed(() => {
    const query = this.formGroup.get('q')?.value?.toLowerCase() || '';
    const allMeals = this.meals();

    if (!allMeals) return [];

    return allMeals.filter(meal =>
      meal.strMeal.toLowerCase().includes(query)
    );
  });

}
