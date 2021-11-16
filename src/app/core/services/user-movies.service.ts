import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { FIREBASE_DB_USER_MOVIES_URL } from 'src/app/shared/constants';
import { CustoMovie } from 'src/app/shared/interfaces/custo-movie.interfaces';
import { CustoBackendMoviesObject } from 'src/app/shared/interfaces/firebase-backend.interface';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserMoviesService {
  private isLoading$$ = new BehaviorSubject<boolean>(false);
  get isLoading$() {
    return this.isLoading$$.asObservable();
  }

  private currentUser$ = this.authService.user$.pipe(
    tap((user) => {
      if (!Boolean(user)) {
        this.onLogout();
      }
    })
  );
  private user: User | null = null;
  private myMovies$$ = new BehaviorSubject<CustoMovie[]>([]);
  get myMovies$() {
    return this.myMovies$$.asObservable();
  }
  get myMovies(): CustoMovie[] {
    return this.myMovies$$.value.slice();
  }

  constructor(
    private authService: AuthService,
    private httpClient: HttpClient
  ) {
    this.initFetchCurrentUserMovies();
  }

  fetchCurrentUserMovies(): Observable<CustoMovie[]> {
    this.user = this.authService.user;
    if (Boolean(this.user)) {
      this.isLoading$$.next(true);
      return this.httpClient
        .get<CustoBackendMoviesObject>(
          `${FIREBASE_DB_USER_MOVIES_URL}/${this.user?.id}.json`
        )
        .pipe(
          map((moviesOfUser: CustoBackendMoviesObject) => {
            const movieArray = this.transformMovieObjectToArray(moviesOfUser);
            this.isLoading$$.next(false);
            this.myMovies$$.next(movieArray);
            return movieArray;
          })
        );
    } else {
      this.isLoading$$.next(false);
      return of([]);
    }
  }

  fetchMoviesByUserId(userId: string): Observable<CustoMovie[]> {
    this.isLoading$$.next(true);
    return this.httpClient
      .get<CustoBackendMoviesObject>(
        `${FIREBASE_DB_USER_MOVIES_URL}/${userId}.json`
      )
      .pipe(
        map(this.transformMovieObjectToArray.bind(this)),
        tap(() => {
          this.isLoading$$.next(false);
        })
      );
  }

  addMovieToUser(movieToAdd: CustoMovie): void {
    const myMovies = this.myMovies;
    if (!Boolean(myMovies)) {
      this.fetchCurrentUserMovies().subscribe(() => {
        this.addMovieToUser(movieToAdd);
      });
      return;
    }
    if (myMovies.includes(movieToAdd)) {
      return;
    }
    myMovies.push(movieToAdd);
    this.myMovies$$.next(myMovies);

    this.currentUser$
      .pipe(
        take(1),
        filter((user) => Boolean(user)),
        switchMap((user) =>
          this.httpClient.patch<CustoMovie>(
            `${FIREBASE_DB_USER_MOVIES_URL}/${user!.id}/${
              movieToAdd.custoId
            }.json`,
            JSON.stringify(movieToAdd)
          )
        )
      )
      .subscribe();
  }

  removeEntryFromMyMovies(movieToRemove: CustoMovie): void {
    const movieArray = this.myMovies;
    const index = movieArray.findIndex(
      (movie) => movie.custoId === movieToRemove.custoId
    );
    movieArray.splice(index, 1);
    this.myMovies$$.next(movieArray);

    this.currentUser$
      .pipe(
        take(1),
        filter((user) => Boolean(user)),
        switchMap((user) =>
          this.httpClient.delete<CustoMovie>(
            `${FIREBASE_DB_USER_MOVIES_URL}/${user!.id}/${
              movieToRemove.custoId
            }.json`
          )
        )
      )
      .subscribe();
  }

  onLogout() {
    this.myMovies$$.next([]);
  }

  private transformMovieObjectToArray(
    movieObject: CustoBackendMoviesObject | null
  ): CustoMovie[] {
    const movieArray: CustoMovie[] = [];
    if (Boolean(movieObject)) {
      for (const value of Object.entries(movieObject!)) {
        movieArray.push(value[1]);
      }
    }
    return movieArray;
  }

  private initFetchCurrentUserMovies(): void {
    this.fetchCurrentUserMovies().subscribe();
  }
}
