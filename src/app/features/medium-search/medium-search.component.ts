import { Component, OnInit } from '@angular/core';
import { from, forkJoin, Subject, Observable } from 'rxjs';
import {
  concatMap,
  filter,
  map,
  mergeMap,
  switchMap,
  tap,
  toArray,
} from 'rxjs/operators';
import { MediumSearchService } from 'src/app/core/services/medium-search.service';
import { CustoMedium } from 'src/app/shared/interfaces/custo-medium.interfaces';
import {
  ImdbResponse,
  ImdbMovieResult,
  ImdbMovieDetails,
  ImdbRatings,
  Ratings,
} from 'src/app/shared/interfaces/imdb.interfaces';

@Component({
  templateUrl: './medium-search.component.html',
  styleUrls: ['./medium-search.component.scss'],
})
export class MediumSearchComponent {
  minRating: number = 6.5;
  isSearching = false;

  custoMovieResults$: Observable<CustoMedium[]>;

  private startSearchAction$$ = new Subject<string>();

  constructor(private mediumSearchService: MediumSearchService) {
    this.custoMovieResults$ = this.startSearchAction$$.pipe(
      filter((searchQuery) => Boolean(searchQuery)),
      tap(() => {
        this.isSearching = true;
      }),
      switchMap((searchQuery: string) => {
        return this.mediumSearchService.getImdbResults(searchQuery).pipe(
          filter((response) => Boolean(response)),
          switchMap((response: ImdbResponse) =>
            /*
             * we extract the movie id from the response data
             * and get for every found movie the full details
             * as well as an array with different ratings
             */
            from(response.results).pipe(
              concatMap((result: ImdbMovieResult) =>
                forkJoin([
                  this.mediumSearchService.getImdbMovieDetails(result.id),
                  this.mediumSearchService.getRatingsFromImdb(result.id),
                ])
              ),
              toArray()
            )
          ),
          mergeMap(
            (moviesDetailsWithRatings: [ImdbMovieDetails, ImdbRatings][]) =>
              /*
               * for every item in the array we create a new
               * object that has only the values needed
               */

              from(moviesDetailsWithRatings).pipe(
                // We filter trailer, shorts and elements with unknown length
                filter(
                  ([movieDetails, movieRatings]) =>
                    +movieDetails.runtimeMins > 7
                ),
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
          tap(() => {
            this.isSearching = false;
          })
        );
      })
    );
  }

  searchMovie(searchQuery: string) {
    this.startSearchAction$$.next(searchQuery);
  }
}
