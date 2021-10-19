import { CustoMedium } from '../interfaces/custo-medium.interfaces';

export function getCustoMovie(): CustoMedium {
  return {
    imdbId: 'tt1375666',
    fullTitle: 'Inception (2010)',
    year: 2010,
    image:
      'https://imdb-api.com/images/original/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_Ratio0.6762_AL_.jpg',
    ratings: {
      imdb: 8.8,
      metacritic: 74,
      rottenTomatoes: 87,
      theMovieDb: 8.3,
      tv_com: 8.8,
    },
    directors: 'Christopher Nolan',
    genres: 'Action, Adventure, Sci-Fi',
    runtimeMins: 148,
    stars: 'Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page',
  };
}
