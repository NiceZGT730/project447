import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute,  } from '@angular/router';
import { ImdbService } from '../../services/imdb.service';


import { CommonModule } from '@angular/common';
import { Movie } from '../../models/movie.model';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-movie-detail',
  imports: [CommonModule],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.scss'
})
export class MovieDetailComponent {
  imdbService = inject(ImdbService);
  favoritesService = inject(FavoritesService);
  route = inject(ActivatedRoute);

  isFavorite = signal(false);
  notification = signal<string | null>(null); // ข้อความแจ้งเตือน
  notificationVisible = signal(false); // ควบคุมการแสดงผล

  constructor() {
    const movieId = this.route.snapshot.paramMap.get('id');
    if (movieId) {
      this.imdbService.fetchMovieDetail(movieId);
    }

    effect(() => {
      const movie = this.imdbService.movieDetail();
      if (movie) {
        this.isFavorite.set(this.favoritesService.favorites().some(fav => fav.id === movie.id));
      }
    });
  }

  toggleFavorite() {
    const movie = this.imdbService.movieDetail();
    if (!movie) return;

    const currentFavorites = this.favoritesService.favorites();
    const isCurrentlyFavorite = currentFavorites.some(fav => fav.id === movie.id);

    if (isCurrentlyFavorite) {
      this.favoritesService.removeFromFavorites(movie.id);
      this.isFavorite.set(false);
      this.showNotification('Removed from Favorites!');
    } else {
      this.favoritesService.addToFavorites(movie);
      this.isFavorite.set(true);
      this.showNotification('Added to Favorites!');
    }
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

  onImageError() {
    const movie = this.imdbService.movieDetail();
    if (movie) {
      this.imdbService.movieDetail.set({
        ...movie,
        primaryImage: 'https://via.placeholder.com/300?text=Image+Not+Found'
      });
    }
  }
}