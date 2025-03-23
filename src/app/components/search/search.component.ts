import { Component, inject } from '@angular/core';
import { ImdbService } from '../../services/imdb.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [CommonModule,RouterLink],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  imdbService = inject(ImdbService);
}
