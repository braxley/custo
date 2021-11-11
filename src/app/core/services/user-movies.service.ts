import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { FIREBASE_DB_USER_MOVIES_URL } from 'src/app/shared/constants';
import { CustoMovie } from 'src/app/shared/interfaces/custo-medium.interfaces';
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
  private areMyMoviesEmpty$$ = new BehaviorSubject<boolean>(false);
  get areMyMoviesEmpty$() {
    return this.areMyMoviesEmpty$$.asObservable();
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
            this.myMovies$$.next(movieArray);
            movieArray.length === 0
              ? this.areMyMoviesEmpty$$.next(false)
              : this.areMyMoviesEmpty$$.next(true);
            this.isLoading$$.next(false);
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
    if (!Boolean(this.myMovies)) {
      this.fetchCurrentUserMovies().subscribe(() => {
        this.addMovieToUser(movieToAdd);
      });
      return;
    }
    if (this.myMovies.includes(movieToAdd)) {
      return;
    }

    const movieToAddObject = {} as CustoBackendMoviesObject;
    movieToAddObject[movieToAdd.custoId] = movieToAdd;

    this.currentUser$
      .pipe(
        take(1),
        filter((user) => Boolean(user)),
        switchMap((user) =>
          this.httpClient.patch<CustoBackendMoviesObject>(
            `${FIREBASE_DB_USER_MOVIES_URL}/${user!.id}.json`,
            JSON.stringify(movieToAddObject)
          )
        ),
        tap(() => {
          if (this.areMyMoviesEmpty$$.value) {
            this.areMyMoviesEmpty$$.next(false);
          }
        })
      )
      .subscribe();
  }

  removeEntryFromMyMovies(movieToRemove: CustoMovie): void {
    const movieArray = this.myMovies;
    const index = movieArray.findIndex(
      (movie) => movie.custoId === movieToRemove.custoId
    );
    movieArray.splice(index, 1);
    this.updateMovies(movieArray);
  }

  onLogout() {
    this.myMovies$$.next([]);
    this.areMyMoviesEmpty$$.next(true);
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

  private updateMovies(userMovies: CustoMovie[]): void {
    this.areMyMoviesEmpty$$.next(!Boolean(userMovies));
    this.myMovies$$.next(userMovies);
    this.currentUser$
      .pipe(
        take(1),
        filter((user) => Boolean(user)),
        switchMap((user) =>
          this.httpClient.put<CustoMovie>(
            `${FIREBASE_DB_USER_MOVIES_URL}/${user!.id}.json`,
            JSON.stringify(userMovies)
          )
        )
      )
      .subscribe();
  }
}
