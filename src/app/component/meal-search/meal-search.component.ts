import { Component, inject, signal } from '@angular/core';
import { Meal } from '../../models/meal.model';
import { MealdbService } from '../../services/mealdb.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-meal-search',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './meal-search.component.html',
  styleUrl: './meal-search.component.scss',
})
export class MealSearchComponent {
  searchQuery = signal<string>(''); // Signal สำหรับคำค้น
  meals = signal<Meal[]>([]); // Signal สำหรับผลลัพธ์ทั้งหมด
  displayedMeals = signal<Meal[]>([]); // Signal สำหรับผลลัพธ์ที่แสดง
  currentPage = signal<number>(1); // Signal สำหรับหน้าปัจจุบัน
  pageSize = signal<number>(5); // Signal สำหรับขนาดหน้า
  totalPages = signal<number>(0); // Signal สำหรับจำนวนหน้าทั้งหมด
  isLoading = signal<boolean>(false); // Signal สำหรับสถานะโหลด

  private mealService = inject(MealdbService);
  private router = inject(Router);

  updateQuery(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value); // อัปเดต Signal
    this.searchMeals();
  }

  searchMeals() {
    if (!this.searchQuery().trim()) {
      this.meals.set([]);
      this.updateDisplayedMeals();
      this.isLoading.set(false);
      return;
    }
    this.isLoading.set(true);
    this.mealService.searchMeals(this.searchQuery()).subscribe({
      next: (response) => {
        const mealList = response.meals || [];
        this.meals.set(mealList);
        this.totalPages.set(Math.ceil(mealList.length / this.pageSize()));
        this.currentPage.set(1);
        this.updateDisplayedMeals();
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Search error:', err);
        this.meals.set([]);
        this.updateDisplayedMeals();
        this.isLoading.set(false);
      },
    });
  }

  updateDisplayedMeals() {
    const start = (this.currentPage() - 1) * this.pageSize();
    const end = start + this.pageSize();
    this.displayedMeals.set(this.meals().slice(start, end));
  }

  changePage(newPage: number) {
    if (newPage >= 1 && newPage <= this.totalPages()) {
      this.currentPage.set(newPage);
      this.updateDisplayedMeals();
    }
  }
}
