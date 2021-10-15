import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  forkJoin,
  from,
  Observable,
  of,
} from 'rxjs';
import {
  concatMap,
  filter,
  map,
  mergeMap,
  switchMap,
  tap,
  toArray,
} from 'rxjs/operators';
import { CustoMedium } from 'src/app/interfaces/custo-medium.interfaces';
import {
  ImdbMovieDetails,
  ImdbMovieResult,
  ImdbRatings,
  ImdbResponse,
  Ratings,
} from 'src/app/interfaces/imdb.interfaces';
import { environment } from 'src/environments/environment';
import { MediumSearchModule } from './medium-search.module';

@Injectable()
// TODO stf where dependency?
export class MediumSearchService {
  private imdbMovieResults$$ = new BehaviorSubject<ImdbMovieDetails[]>([]);

  get result$() {
    return this.imdbMovieResults$$.asObservable();
  }

  constructor(private httpClient: HttpClient) {}

  testGetImdbResponse() {
    this.httpClient.get<ImdbResponse>(
      `https://imdb-api.com/en/API/SearchMovie/${environment.API_KEY}/Inception`
    );
  }

  getImdbMovieDetails(movieId: string) {
    return this.httpClient.get<ImdbMovieDetails>(
      `https://imdb-api.com/en/API/Title/${environment.API_KEY}/${movieId}`
    );
  }

  getRatingsFromImdb(movieId: string) {
    return this.httpClient.get<ImdbRatings>(
      `https://imdb-api.com/API/Ratings/${environment.API_KEY}/${movieId}`
    );
  }

  testGetDetails() {
    return this.getImdbMovieDetails('tt1375666');
  }
  testGetRatings() {
    return this.getRatingsFromImdb('tt1375666');
  }

  tryForking(): Observable<[ImdbMovieDetails, ImdbRatings]> {
    return forkJoin([
      this.getImdbMovieDetails('tt1375666'),
      this.getRatingsFromImdb('tt1375666'),
    ]);
  }

  getImdbResults(searchQuery: string): void {
    this.httpClient
      .get<ImdbResponse>(
        `https://imdb-api.com/en/API/SearchMovie/${environment.API_KEY}/${searchQuery}`
      )
      .pipe(
        filter((response) => Boolean(response)),
        switchMap((response: ImdbResponse) =>
          from(response.results).pipe(
            concatMap((result: ImdbMovieResult) =>
              forkJoin([
                this.getImdbMovieDetails(result.id),
                this.getRatingsFromImdb(result.id),
              ])
            ),
            toArray()
          )
        ),
        mergeMap((moviesDetailsWithRatings) =>
          from(moviesDetailsWithRatings).pipe(
            map(
              ([movieDetails, movieRatings]) =>
                ({
                  imdbId: movieDetails.id,
                  fullTitle: movieDetails.fullTitle,
                  year: +movieDetails.year,
                  image: movieDetails.image,
                  ratings: {
                    imDb: +movieRatings.imDb,
                    metacritic: +movieRatings.metacritic,
                    rottenTomatoes: +movieRatings.rottenTomatoes,
                    theMovieDb: +movieRatings.theMovieDb,
                    tv_com: +movieRatings.tV_com,
                  } as Ratings,
                  directors: movieDetails.directors,
                  genres: movieDetails.genres,
                  runtimeMins: +movieDetails.runtimeMins,
                  stars: movieDetails.stars,
                } as CustoMedium)
            ),
            toArray()
          )
        )
      );
  }
}
