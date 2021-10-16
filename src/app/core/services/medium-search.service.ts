import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, from, Observable } from 'rxjs';
import {
  concatMap,
  filter,
  map,
  mergeMap,
  switchMap,
  tap,
  toArray,
} from 'rxjs/operators';
import { CustoMedium } from 'src/app/shared/interfaces/custo-medium.interfaces';
import {
  ImdbMovieDetails,
  ImdbRatings,
  ImdbResponse,
  ImdbMovieResult,
  Ratings,
} from 'src/app/shared/interfaces/imdb.interfaces';

import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class MediumSearchService {
  private custoMovies$$ = new BehaviorSubject<CustoMedium[]>([]);

  get custoMovies$() {
    return this.custoMovies$$.asObservable();
  }
  private isSearching$$ = new BehaviorSubject<boolean>(false);

  get isSearching$() {
    return this.isSearching$$.asObservable();
  }

  constructor(private httpClient: HttpClient) {}

  getImdbMovieDetails(movieId: string): Observable<ImdbMovieDetails> {
    return this.httpClient.get<ImdbMovieDetails>(
      `https://imdb-api.com/en/API/Title/${environment.API_KEY}/${movieId}`
    );
  }

  getRatingsFromImdb(movieId: string): Observable<ImdbRatings> {
    return this.httpClient.get<ImdbRatings>(
      `https://imdb-api.com/API/Ratings/${environment.API_KEY}/${movieId}`
    );
  }

  getImdbResults(searchQuery: string): void {
    this.isSearching$$.next(true);
    this.httpClient
      .get<ImdbResponse>(
        `https://imdb-api.com/en/API/SearchMovie/${environment.API_KEY}/${searchQuery}`
      )
      .pipe(
        filter((response) => Boolean(response)),
        switchMap((response: ImdbResponse) =>
          /*
           * we extract the movie id from the response data
           * and get for every found movie the full details
           * as well as an array with different ratings
           * @Output: [ImdbMovieDetails, ImdbRatings][]
           */
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
          /*
           * @Input: [ImdbMovieDetails, ImdbRatings][]
           * for every item in the array we create a new
           * object that has only the values needed
           */

          from(moviesDetailsWithRatings).pipe(
            map(
              ([movieDetails, movieRatings]) =>
                ({
                  imdbId: movieDetails.id,
                  fullTitle: movieDetails.fullTitle,
                  year: +movieDetails.year,
                  image: movieDetails.image,
                  ratings: {
                    imdb: +movieRatings.imDb,
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
        ),
        tap((custoMedia: CustoMedium[]) => {
          this.isSearching$$.next(false);
          this.custoMovies$$.next(custoMedia);
        })
      )
      .subscribe();
  }
}
