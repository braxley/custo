import { AfterViewInit, Component } from '@angular/core';
import { from, forkJoin, Subject, Observable, EMPTY } from 'rxjs';
import { filter, map, mergeMap, switchMap, tap, toArray } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { MediumSearchService } from 'src/app/core/services/medium-search.service';
import { UserMoviesService } from 'src/app/core/services/user-movies.service';
import { CustoMovie } from 'src/app/shared/interfaces/custo-medium.interfaces';
import {
  ImdbResponse,
  ImdbMovieResult,
  ImdbMovieDetails,
  ImdbRatings,
  Ratings,
  ImdbGenre,
} from 'src/app/shared/interfaces/imdb.interfaces';

@Component({
  templateUrl: './medium-search.component.html',
  styleUrls: ['./medium-search.component.scss'],
})
export class MediumSearchComponent {
  minRating: number = 6.5;
  isSearching = false;
  isAuthenticated = Boolean(this.authService.user);

  custoMovieResults$: Observable<CustoMovie[]>;

  private startSearchAction$$ = new Subject<string>();

  constructor(
    private authService: AuthService,
    private mediumSearchService: MediumSearchService,
    private userMoviesService: UserMoviesService
  ) {
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
              mergeMap((result: ImdbMovieResult) =>
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
                // we filter media under 55 minutes, including trailer and elements with unknown length
                filter(
                  ([movieDetails, movieRatings]) =>
                    +movieDetails.runtimeMins > 55
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
                        tV_com: +movieRatings.tV_com,
                        filmAffinity: +movieRatings.filmAffinity,
                      } as Ratings,
                      directors: movieDetails.directors,
                      genres: movieDetails.genres,
                      genreList: movieDetails.genreList.map(
                        (genre: ImdbGenre) => genre.key
                      ),
                      runtimeMins: +movieDetails.runtimeMins,
                      stars: movieDetails.stars,
                    } as CustoMovie)
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
