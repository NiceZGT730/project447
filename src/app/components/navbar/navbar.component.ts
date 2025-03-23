import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ImdbService } from '../../services/imdb.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule,ReactiveFormsModule,RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  fb = inject(FormBuilder);
  imdbService = inject(ImdbService);
  router = inject(Router);

  searchForm = this.fb.group({
    query: [''],
  });

  onSearch() {
    const query = this.searchForm.get('query')?.value;
    if (query) {
      this.imdbService.searchMovies(query);
      this.router.navigate(['/search']);
      this.searchForm.reset();
    }
  }
}