import { Component, inject } from '@angular/core';
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
  route = inject(ActivatedRoute);
  imdbService = inject(ImdbService);
  favoritesService = inject(FavoritesService);

  constructor() {
    const movieId = this.route.snapshot.paramMap.get('id');
    if (movieId) {
      this.imdbService.fetchMovieDetail(movieId);
    }
  }

  addToFavorites(movie: Movie) {
    this.favoritesService.addToFavorites(movie);
  }
}