import { Component, effect, inject, signal } from '@angular/core';
import { ImdbService } from '../../services/imdb.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-search',
  imports: [CommonModule,RouterLink],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  imdbService = inject(ImdbService);

  // Pagination signals
  currentPage = signal(1);
  itemsPerPage = 12;
  paginatedResults = signal<Movie[]>([]);

  constructor() {
    effect(() => {
      const results = this.imdbService.searchResults();
      if (results.length > 0) {
        this.updatePaginatedResults();
      } else if (!this.imdbService.isLoadingSearch()) {
        this.paginatedResults.set([]);
      }
    });
  }

  totalPages = () => Math.ceil(this.imdbService.searchResults().length / this.itemsPerPage);

  updatePaginatedResults() {
    const start = (this.currentPage() - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedResults.set(this.imdbService.searchResults().slice(start, end));
  }

  changePage(delta: number) {
    this.currentPage.set(this.currentPage() + delta);
    this.updatePaginatedResults();
  }
}