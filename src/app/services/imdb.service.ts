import { inject, Injectable, signal } from '@angular/core';
import { Movie } from '../models/movie.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';

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
  isLoadingDetail = signal<boolean>(false); // เพิ่ม Signal สำหรับสถานะการโหลด

  private headers = {
    'x-rapidapi-key': this.apiKey,
    'x-rapidapi-host': this.apiHost,
  };

  fetchTop250Movies() {
    this.http
      .get<any>(`${this.baseUrl}/top250-movies`, { headers: this.headers })
      .pipe(
        map(data => {
          return data.map((item: any) => ({
            id: item.id || '',
            url: item.url || '',
            primaryTitle: item.primaryTitle || 'Unknown Title',
            originalTitle: item.originalTitle || item.primaryTitle || 'Unknown Title',
            type: item.type || 'movie',
            description: item.description || 'No description available',
            primaryImage: item.primaryImage || 'https://via.placeholder.com/300',
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
          return throwError(() => error);
        })
      )
      .subscribe(movies => this.top250Movies.set(movies));
  }

  searchMovies(query: string) {
    this.http
      .get<any>(`${this.baseUrl}/autocomplete?query=${encodeURIComponent(query)}`, { headers: this.headers })
      .pipe(
        map(data => {
          console.log('Search API response:', data); // ดูโครงสร้างข้อมูล
          // สมมติว่า response เป็น array ของผลการค้นหาโดยตรง (ตาม autocomplete)
          return (data || []).map((item: any) => ({
            id: item.id || '',
            url: item.url || '',
            primaryTitle: item.title || item.primaryTitle || 'Unknown Title', // ปรับตามโครงสร้างจริง
            originalTitle: item.originalTitle || item.title || 'Unknown Title',
            type: item.type || 'movie',
            description: item.description || 'No description available',
            primaryImage: item.image || item.primaryImage || 'https://via.placeholder.com/300', // ปรับตามโครงสร้าง
            contentRating: item.contentRating || 'N/A',
            startYear: item.year || item.startYear || 0, // ปรับตามโครงสร้าง
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
          this.searchResults.set([]); // รีเซ็ตผลลัพธ์ถ้ามี error
          return throwError(() => error);
        })
      )
      .subscribe(movies => this.searchResults.set(movies));
  }
  fetchMovieDetail(id: string) {
    this.isLoadingDetail.set(true); // เริ่มโหลด รีเซ็ตข้อมูลเก่า
    this.movieDetail.set(null); // รีเซ็ต movieDetail ทันที
    this.http
      .get<any>(`${this.baseUrl}/${id}`, { headers: this.headers })
      .pipe(
        map(data => {
          console.log('API response:', data);
          return {
            id: data.id || id,
            url: data.url || '',
            primaryTitle: data.primaryTitle || 'Unknown Title',
            originalTitle: data.originalTitle || data.primaryTitle || 'Unknown Title',
            type: data.type || 'movie',
            description: data.description || 'No description available',
            primaryImage: data.primaryImage || 'https://via.placeholder.com/300',
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
            primaryImage: 'https://via.placeholder.com/300',
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
          return throwError(() => error);
        })
      )
      .subscribe(movie => {
        this.movieDetail.set(movie);
        this.isLoadingDetail.set(false); // โหลดเสร็จ
      });
  }
}