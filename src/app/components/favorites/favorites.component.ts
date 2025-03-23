import { Component, effect, inject, signal } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-favorites',
  imports: [CommonModule,RouterLink],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent {
  favoritesService = inject(FavoritesService);

  // Pagination signals
  currentPage = signal(1);
  itemsPerPage = 12;
  paginatedFavorites = signal<Movie[]>([]);

  // Notification signals
  notification = signal<string | null>(null);
  notificationVisible = signal(false);

  constructor() {
    effect(() => {
      const favorites = this.favoritesService.favorites();
      if (favorites.length > 0) {
        this.updatePaginatedFavorites();
      } else {
        this.paginatedFavorites.set([]);
      }
    });
  }

  totalPages = () => Math.ceil(this.favoritesService.favorites().length / this.itemsPerPage);

  updatePaginatedFavorites() {
    const start = (this.currentPage() - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedFavorites.set(this.favoritesService.favorites().slice(start, end));
  }

  changePage(delta: number) {
    this.currentPage.set(this.currentPage() + delta);
    this.updatePaginatedFavorites();
  }

  removeFromFavorites(movieId: string) {
    this.favoritesService.removeFromFavorites(movieId);
    this.updatePaginatedFavorites();
    this.showNotification('Removed from Favorites!');
  }

  showNotification(message: string) {
    this.notification.set(message);
    this.notificationVisible.set(true);

    // ซ่อนแจ้งเตือนหลัง 3 วินาที
    setTimeout(() => {
      this.notificationVisible.set(false);
      setTimeout(() => this.notification.set(null), 300); // รอ animation จบ
    }, 3000);
  }

  onImageError(movieId: string) {
    console.log(`Image failed to load for movie ID: ${movieId}`);
    const favorites = this.paginatedFavorites();
    const updatedFavorites = favorites.map(movie =>
      movie.id === movieId
        ? { ...movie, primaryImage: 'https://via.placeholder.com/300?text=Image+Not+Found' }
        : movie
    );
    this.paginatedFavorites.set(updatedFavorites);
  }
}