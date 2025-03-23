export interface Movie {
    id: string;
    url: string;
    primaryTitle: string;
    originalTitle: string;
    type: string;
    description: string;
    primaryImage: string;
    contentRating: string;
    startYear: number;
    endYear?: number | null;
    releaseDate: string;
    interests: string[];
    countriesOfOrigin: string[];
    externalLinks: string[];
    spokenLanguages: string[];
    filmingLocations: string[];
    productionCompanies: string[];
    budget: number;
    grossWorldwide: number;
    genres: string[];
    isAdult: boolean;
    runtimeMinutes: number;
    averageRating: number;
    numVotes: number;
    directors: string[];
    writers: string[];
    cast: string[];
  }