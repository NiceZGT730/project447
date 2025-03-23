import { Component, signal } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorites',
  imports: [CommonModule,RouterLink],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent {
  favorites = signal<Movie[]>(this.loadFavoritesFromStorage());

  private loadFavoritesFromStorage(): Movie[] {
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  }

  private saveFavoritesToStorage(favorites: Movie[]) {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }

  removeFromFavorites(movieId: string) {
    const updatedFavorites = this.favorites().filter(movie => movie.id !== movieId);
    this.favorites.set(updatedFavorites);
    this.saveFavoritesToStorage(updatedFavorites);
  }

  addToFavorites(movie: Movie) {
    const currentFavorites = this.favorites();
    if (!currentFavorites.some(m => m.id === movie.id)) {
      const updatedFavorites = [...currentFavorites, movie];
      this.favorites.set(updatedFavorites);
      this.saveFavoritesToStorage(updatedFavorites);
    }
  }
}