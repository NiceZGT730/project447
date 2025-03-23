import { inject, Injectable, signal } from '@angular/core';
import { Movie } from '../models/movie.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map, throwError, timeout } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImdbService {
  private http = inject(HttpClient);
  private apiKey = '1e4a9e6b27msha2f53ed18bd3a4cp117086jsnfdaa15e2c7d9';
  private apiHost = 'imdb236.p.rapidapi.com';
  private baseUrl = 'https://imdb236.p.rapidapi.com/imdb';

  top250Movies = signal<Movie[]>([]);
  searchResults = signal<Movie[]>([]);
  movieDetail = signal<Movie | null>(null);
  topBoxOffice = signal<Movie[]>([]);
  mostPopularMovies = signal<Movie[]>([]); // เพิ่มสำหรับ Most Popular
  isLoadingDetail = signal<boolean>(false);
  isLoadingSearch = signal<boolean>(false);
  isLoadingTopBoxOffice = signal<boolean>(false);
  isLoadingMostPopular = signal<boolean>(false); // เพิ่มสำหรับ Most Popular

  private headers = {
    'x-rapidapi-key': this.apiKey,
    'x-rapidapi-host': this.apiHost,
  };

  fetchTop250Movies() {
    console.log('Fetching Top 250 movies...');
    this.http
      .get<any>(`${this.baseUrl}/top250-movies`, { headers: this.headers })
      .pipe(
        map(data => {
          console.log('Top 250 API response:', data);
          return data.map((item: any) => ({
            id: item.id || '',
            url: item.url || '',
            primaryTitle: item.primaryTitle || 'Unknown Title',
            originalTitle: item.originalTitle || item.primaryTitle || 'Unknown Title',
            type: item.type || 'movie',
            description: item.description || 'No description available',
            primaryImage: item.primaryImage || 'https://placehold.co/300x300?text=Image+Not+Found',
            contentRating: item.contentRating || 'N/A',
            startYear: item.startYear || 0,
            endYear: item.endYear || null,
            releaseDate: item.releaseDate || 'N/A',
            interests: item.interests || [],
            countriesOfOrigin: item.countriesOfOrigin || [],
            externalLinks: item.externalLinks || [],
            spokenLanguages: item.spokenLanguages || [],
            filmingLocations: item.filmingLocations || [],
            productionCompanies: item.productionCompanies || [],
            budget: item.budget || 0,
            grossWorldwide: item.grossWorldwide || 0,
            genres: item.genres || [],
            isAdult: item.isAdult || false,
            runtimeMinutes: item.runtimeMinutes || 0,
            averageRating: item.averageRating || 0,
            numVotes: item.numVotes || 0,
            directors: item.directors || [],
            writers: item.writers || [],
            cast: item.cast || [],
          }));
        }),
        catchError(error => {
          console.error('Error fetching Top 250:', error);
          this.top250Movies.set([]);
          return throwError(() => error);
        })
      )
      .subscribe(movies => {
        console.log('Top 250 movies loaded:', movies.length);
        this.top250Movies.set(movies);
      });
  }

  searchMovies(query: string) {
    console.log('Searching movies with query:', query);
    this.isLoadingSearch.set(true);
    this.searchResults.set([]);
    this.http
      .get<any>(`${this.baseUrl}/autocomplete?query=${encodeURIComponent(query)}`, { headers: this.headers })
      .pipe(
        map(data => {
          console.log('Search API response:', data);
          return (data || []).map((item: any) => ({
            id: item.id || '',
            url: item.url || '',
            primaryTitle: item.title || item.primaryTitle || 'Unknown Title',
            originalTitle: item.originalTitle || item.title || 'Unknown Title',
            type: item.type || 'movie',
            description: item.description || 'No description available',
            primaryImage: item.image || item.primaryImage || 'https://placehold.co/300x300?text=Image+Not+Found',
            contentRating: item.contentRating || 'N/A',
            startYear: item.year || item.startYear || 0,
            endYear: item.endYear || null,
            releaseDate: item.releaseDate || 'N/A',
            interests: item.interests || [],
            countriesOfOrigin: item.countriesOfOrigin || [],
            externalLinks: item.externalLinks || [],
            spokenLanguages: item.spokenLanguages || [],
            filmingLocations: item.filmingLocations || [],
            productionCompanies: item.productionCompanies || [],
            budget: item.budget || 0,
            grossWorldwide: item.grossWorldwide || 0,
            genres: item.genres || [],
            isAdult: item.isAdult || false,
            runtimeMinutes: item.runtimeMinutes || 0,
            averageRating: item.averageRating || 0,
            numVotes: item.numVotes || 0,
            directors: item.directors || [],
            writers: item.writers || [],
            cast: item.cast || [],
          }));
        }),
        catchError(error => {
          console.error('Error searching movies:', error);
          this.searchResults.set([]);
          this.isLoadingSearch.set(false);
          return throwError(() => error);
        })
      )
      .subscribe(movies => {
        console.log('Search results loaded:', movies.length);
        this.searchResults.set(movies);
        this.isLoadingSearch.set(false);
      });
  }

  fetchTopBoxOffice() {
    console.log('Fetching Top Box Office movies...');
    this.isLoadingTopBoxOffice.set(true); // เริ่มโหลด
    this.topBoxOffice.set([]); // รีเซ็ตข้อมูลเก่า
    this.http
      .get<any>(`${this.baseUrl}/top-box-office`, { headers: this.headers })
      .pipe(
        map(data => {
          console.log('Top Box Office API response:', data);
          // สมมติว่า response เป็น array ของหนัง (ปรับตามโครงสร้างจริงจาก API)
          return (data || []).map((item: any) => ({
            id: item.id || '',
            url: item.url || '',
            primaryTitle: item.title || item.primaryTitle || 'Unknown Title',
            originalTitle: item.originalTitle || item.title || 'Unknown Title',
            type: item.type || 'movie',
            description: item.description || 'No description available',
            primaryImage: item.image || item.primaryImage || 'https://placehold.co/300x300?text=Image+Not+Found',
            contentRating: item.contentRating || 'N/A',
            startYear: item.year || item.startYear || 0,
            endYear: item.endYear || null,
            releaseDate: item.releaseDate || 'N/A',
            interests: item.interests || [],
            countriesOfOrigin: item.countriesOfOrigin || [],
            externalLinks: item.externalLinks || [],
            spokenLanguages: item.spokenLanguages || [],
            filmingLocations: item.filmingLocations || [],
            productionCompanies: item.productionCompanies || [],
            budget: item.budget || 0,
            grossWorldwide: item.grossWorldwide || 0,
            genres: item.genres || [],
            isAdult: item.isAdult || false,
            runtimeMinutes: item.runtimeMinutes || 0,
            averageRating: item.averageRating || 0,
            numVotes: item.numVotes || 0,
            directors: item.directors || [],
            writers: item.writers || [],
            cast: item.cast || [],
          }));
        }),
        catchError(error => {
          console.error('Error fetching Top Box Office:', error);
          this.topBoxOffice.set([]);
          this.isLoadingTopBoxOffice.set(false);
          return throwError(() => error);
        })
      )
      .subscribe(movies => {
        console.log('Top Box Office movies loaded:', movies.length);
        this.topBoxOffice.set(movies);
        this.isLoadingTopBoxOffice.set(false); // หยุดโหลด
      });
  }

  fetchMovieDetail(id: string) {
    this.isLoadingDetail.set(true);
    this.movieDetail.set(null);
    this.http
      .get<any>(`${this.baseUrl}/${id}`, { headers: this.headers })
      .pipe(
        map(data => {
          console.log('Detail API response:', data);
          return {
            id: data.id || id,
            url: data.url || '',
            primaryTitle: data.primaryTitle || 'Unknown Title',
            originalTitle: data.originalTitle || data.primaryTitle || 'Unknown Title',
            type: data.type || 'movie',
            description: data.description || 'No description available',
            primaryImage: data.primaryImage || 'https://placehold.co/300x300?text=Image+Not+Found',
            contentRating: data.contentRating || 'N/A',
            startYear: data.startYear || 0,
            endYear: data.endYear || null,
            releaseDate: data.releaseDate || 'N/A',
            interests: data.interests || [],
            countriesOfOrigin: data.countriesOfOrigin || [],
            externalLinks: data.externalLinks || [],
            spokenLanguages: data.spokenLanguages || [],
            filmingLocations: data.filmingLocations || [],
            productionCompanies: data.productionCompanies || [],
            budget: data.budget || 0,
            grossWorldwide: data.grossWorldwide || 0,
            genres: data.genres || [],
            isAdult: data.isAdult || false,
            runtimeMinutes: data.runtimeMinutes || 0,
            averageRating: data.averageRating || 0,
            numVotes: data.numVotes || 0,
            directors: data.directors || [],
            writers: data.writers || [],
            cast: data.cast || [],
          };
        }),
        catchError(error => {
          console.error('Error fetching movie detail:', error);
          const mockMovie: Movie = {
            id: id,
            primaryTitle: 'Mock Movie',
            startYear: 2023,
            averageRating: 8.0,
            numVotes: 1000,
            genres: ['Mock'],
            description: 'This is a mock movie',
            primaryImage: 'https://placehold.co/300x300?text=Image+Not+Found',
            contentRating: 'PG-13',
            releaseDate: '2023-01-01',
            budget: 1000000,
            grossWorldwide: 5000000,
            countriesOfOrigin: ['US'],
            spokenLanguages: ['en'],
            filmingLocations: ['Mock Location'],
            productionCompanies: ['Mock Company'],
            runtimeMinutes: 120,
            isAdult: false,
            interests: [],
            url: '',
            originalTitle: 'Mock Movie',
            type: 'movie',
            externalLinks: [],
            directors: [],
            writers: [],
            cast: [],
          };
          this.movieDetail.set(mockMovie);
          this.isLoadingDetail.set(false);
          return throwError(() => error);
        })
      )
      .subscribe(movie => {
        this.movieDetail.set(movie);
        this.isLoadingDetail.set(false);
      });
  }
  fetchMostPopularMovies() {
    console.log('Fetching Most Popular movies...');
    this.isLoadingMostPopular.set(true);
    this.mostPopularMovies.set([]);
    this.http
      .get<any>(`${this.baseUrl}/most-popular-movies`, { headers: this.headers })
      .pipe(
        timeout(10000),
        map(data => {
          console.log('Most Popular API response:', data);
          return (data || []).map((item: any) => ({
            id: item.id || '',
            url: item.url || '',
            primaryTitle: item.primaryTitle || 'Unknown Title',
            originalTitle: item.originalTitle || item.primaryTitle || 'Unknown Title',
            type: item.type || 'movie',
            description: item.description || 'No description available',
            primaryImage: item.primaryImage || 'https://placehold.co/300x300?text=No+Image',
            contentRating: item.contentRating || 'N/A',
            startYear: item.startYear || 0,
            endYear: item.endYear || null,
            releaseDate: item.releaseDate || 'N/A',
            interests: item.interests || [],
            countriesOfOrigin: item.countriesOfOrigin || [],
            externalLinks: item.externalLinks || [],
            spokenLanguages: item.spokenLanguages || [],
            filmingLocations: item.filmingLocations || [],
            productionCompanies: item.productionCompanies || [],
            budget: item.budget || 0,
            grossWorldwide: item.grossWorldwide || 0,
            genres: item.genres || [],
            isAdult: item.isAdult || false,
            runtimeMinutes: item.runtimeMinutes || 0,
            averageRating: item.averageRating || 0,
            numVotes: item.numVotes || 0,
            directors: item.directors || [],
            writers: item.writers || [],
            cast: item.cast || [],
          }));
        }),
        catchError(error => {
          console.error('Error fetching Most Popular:', error);
          this.mostPopularMovies.set([]);
          this.isLoadingMostPopular.set(false);
          return throwError(() => error);
        })
      )
      .subscribe(movies => {
        console.log('Most Popular movies loaded:', movies.length);
        this.mostPopularMovies.set(movies);
        this.isLoadingMostPopular.set(false);
      });
  }
}