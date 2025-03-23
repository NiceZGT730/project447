import { Component, effect, inject, signal } from '@angular/core';
import { ImdbService } from '../../services/imdb.service';
import { Movie } from '../../models/movie.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-box-office',
  imports: [RouterLink],
  templateUrl: './box-office.component.html',
  styleUrl: './box-office.component.scss'
})
export class BoxOfficeComponent {
  imdbService = inject(ImdbService);

  // Pagination signals
  currentPage = signal(1);
  itemsPerPage = 12;
  paginatedMovies = signal<Movie[]>([]);

  constructor() {
    this.imdbService.fetchTopBoxOffice(); // เรียกโหลดข้อมูลทันที

    effect(() => {
      const movies = this.imdbService.topBoxOffice();
      if (movies.length > 0) {
        this.updatePaginatedMovies();
      }
    });
  }

  totalPages = () => Math.ceil(this.imdbService.topBoxOffice().length / this.itemsPerPage);

  updatePaginatedMovies() {
    const start = (this.currentPage() - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedMovies.set(this.imdbService.topBoxOffice().slice(start, end));
  }

  changePage(delta: number) {
    this.currentPage.set(this.currentPage() + delta);
    this.updatePaginatedMovies();
  }
}