import { ImdbGenre, Ratings } from './imdb.interfaces';

export interface CustoMedium {
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
