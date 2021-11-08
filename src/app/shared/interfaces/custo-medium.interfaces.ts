import { Ratings } from './imdb.interfaces';

export interface CustoMovie {
  imdbId: string;
  fullTitle: string;
  year: number;
  image: string;
  ratings: Ratings;
  runtimeMins: number;
  directors: string;
  stars: string;
  genres: string;
  genreList: string[];
}

export interface UserIdWithMovies {
  userId: string;
  movies: CustoMovie[];
}
