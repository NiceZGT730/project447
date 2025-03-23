import { Component, effect, inject, signal } from '@angular/core';
import { ImdbService } from '../../services/imdb.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-most-popular',
  imports: [CommonModule, RouterLink],
  templateUrl: './most-popular.component.html',
  styleUrl: './most-popular.component.scss'
})
export class MostPopularComponent {
  imdbService = inject(ImdbService);

  // Pagination signals
  currentPage = signal(1);
  itemsPerPage = 10; // แสดง 10 รายการต่อหน้า
  paginatedMovies = signal<Movie[]>([]);

  constructor() {
    this.imdbService.fetchMostPopularMovies();
    effect(() => {
      const movies = this.imdbService.mostPopularMovies();
      if (movies.length > 0) {
        this.updatePaginatedMovies();
      }
    });
  }

  totalPages = () => Math.ceil(this.imdbService.mostPopularMovies().length / this.itemsPerPage);

  updatePaginatedMovies() {
    const start = (this.currentPage() - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedMovies.set(this.imdbService.mostPopularMovies().slice(start, end));
  }

  changePage(delta: number) {
    this.currentPage.set(this.currentPage() + delta);
    this.updatePaginatedMovies();
  }

  onImageError(movieId: string) {
    console.log(`Image failed to load for movie ID: ${movieId}`);
    const movies = this.imdbService.mostPopularMovies();
    const updatedMovies = movies.map(movie =>
      movie.id === movieId
        ? { ...movie, primaryImage: 'https://placehold.co/300x300?text=Image+Not+Found' }
        : movie
    );
    this.imdbService.mostPopularMovies.set(updatedMovies);
    this.updatePaginatedMovies(); // อัปเดตหน้าเมื่อภาพเปลี่ยน
  }
}