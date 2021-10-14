import { ImdbRatings } from './imdb.interfaces';

export interface CustoMedium {
  imdbId: string; //from original query
  fullTitle: string; //from large query
  year: number; //from large query
  image: string; //from large query
  ratings?: ImdbRatings[];
  imdbRatingVotes: number; //from large query, to sort
  runtimeMins: number; //from large query
  directors: string; //from large query
  stars: string; //from large query
  genres: string; //from large query
}
