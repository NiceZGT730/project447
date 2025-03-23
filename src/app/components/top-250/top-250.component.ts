import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ImdbService } from '../../services/imdb.service';

@Component({
  selector: 'app-top-250',
  imports: [CommonModule,RouterLink],
  templateUrl: './top-250.component.html',
  styleUrl: './top-250.component.scss'
})
export class Top250Component {
  imdbService = inject(ImdbService);

  constructor() {
    this.imdbService.fetchTop250Movies();
  }
  
}