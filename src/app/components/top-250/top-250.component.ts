import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ImdbService } from '../../services/imdb.service';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-top-250',
  imports: [CommonModule,RouterLink],
  templateUrl: './top-250.component.html',
  styleUrl: './top-250.component.scss'
})
export class Top250Component {
  imdbService = inject(ImdbService);

  // Pagination signals
  currentPage = signal(1);
  itemsPerPage = 12;
  paginatedMovies = signal<Movie[]>([]);
  isLoading = signal(true); // เพิ่ม loading state

  constructor() {
    this.imdbService.fetchTop250Movies();

    // ใช้ effect เพื่ออัปเดต paginatedMovies เมื่อ top250Movies เปลี่ยน
    effect(() => {
      const movies = this.imdbService.top250Movies();
      if (movies.length > 0) {
        this.updatePaginatedMovies();
        this.isLoading.set(false);
      }
    });
  }

  totalPages = () => Math.ceil(this.imdbService.top250Movies().length / this.itemsPerPage);

  updatePaginatedMovies() {
    const start = (this.currentPage() - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedMovies.set(this.imdbService.top250Movies().slice(start, end));
  }

  changePage(delta: number) {
    this.currentPage.set(this.currentPage() + delta);
    this.updatePaginatedMovies();
  }
}