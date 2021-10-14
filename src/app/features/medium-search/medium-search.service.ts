import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import {
  ImdbMovieDetails,
  ImdbMovieResult,
  ImdbResponse,
} from 'src/app/interfaces/imdb.interfaces';
import { MediumSearchModule } from './medium-search.module';

@Injectable()
// TODO stf where dependency?
export class MediumSearchService {
  private imdbMovieResults$$ = new BehaviorSubject<ImdbMovieDetails[]>([]);

  get result$() {
    return this.imdbMovieResults$$.asObservable();
  }

  constructor(private httpClient: HttpClient) {}

  getImdbMovieDetails(movieId: string): Observable<ImdbMovieDetails> {
    return this.httpClient.get<ImdbMovieDetails>(
      `https://imdb-api.com/en/API/Title/k_yigjtlx9/${movieId}`
    );
  }

  getImdbResults(searchQuery: string): void {
    this.httpClient
      .get<ImdbResponse>(
        `https://imdb-api.com/en/API/SearchMovie/k_yigjtlx9/${searchQuery}`
      )
      .pipe(
        switchMap((response: ImdbResponse) => {
          return forkJoin(
            response.results.map((result) =>
              this.getImdbMovieDetails(result.id)
            )
          );
        }),
        tap((modifiedResults: ImdbMovieDetails[]) => {
          this.imdbMovieResults$$.next(modifiedResults);
        })
      )
      .subscribe();
  }
}
