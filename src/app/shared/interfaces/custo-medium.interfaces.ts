import { Ratings } from './imdb.interfaces';

export interface CustoMovie {
  custoId: string;
  fullTitle: string;
  year: number;
  image: string;
  ratings: Ratings;
  runtimeMins: number;
  directors: string;
  directorList: string[];
  stars: string;
  genres: string;
  genreList: string[];
}

export interface UserIdWithMovies {
  userId: string;
  movies: CustoMovie[] | null;
  isAlreadyInComparison: boolean;
}
