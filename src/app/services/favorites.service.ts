import { Injectable, signal } from '@angular/core';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  favorites = signal<Movie[]>(this.loadFavoritesFromStorage());

  private loadFavoritesFromStorage(): Movie[] {
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  }

  private saveFavoritesToStorage(favorites: Movie[]) {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }

  addToFavorites(movie: Movie) {
    const currentFavorites = this.favorites();
    if (!currentFavorites.some(m => m.id === movie.id)) {
      const updatedFavorites = [...currentFavorites, movie];
      this.favorites.set(updatedFavorites);
      this.saveFavoritesToStorage(updatedFavorites);
    }
  }

  removeFromFavorites(movieId: string) {
    const updatedFavorites = this.favorites().filter(movie => movie.id !== movieId);
    this.favorites.set(updatedFavorites);
    this.saveFavoritesToStorage(updatedFavorites);
  }
}