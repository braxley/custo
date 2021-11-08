import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { FIREBASE_DB_USERS_URL } from 'src/app/shared/constants';
import { CustoMovie } from 'src/app/shared/interfaces/custo-medium.interfaces';
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
  private currentUser$ = this.authService.user$;
  private myMovies$$ = new BehaviorSubject<CustoMovie[]>([]);
  private user: User | null = null;
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

  fetchMoviesByUserId(userId: string): Observable<CustoMovie[]> {
    this.isLoading$$.next(true);
    return this.httpClient
      .get<CustoMovie[]>(`${FIREBASE_DB_USERS_URL}/${userId}/my_movies.json`)
      .pipe(
        tap(() => {
          this.isLoading$$.next(false);
        })
      );
  }

  fetchCurrentUserMovies(): Observable<CustoMovie[]> {
    this.user = this.authService.user;
    this.isLoading$$.next(true);
    return this.httpClient
      .get<CustoMovie[]>(
        `${FIREBASE_DB_USERS_URL}/${this.user?.id}/my_movies.json`
      )
      .pipe(
        tap((movieArray: CustoMovie[]) => {
          if (movieArray) {
            this.myMovies$$.next(movieArray);
            this.areMyMoviesEmpty$$.next(false);
          } else {
            this.areMyMoviesEmpty$$.next(true);
          }
          this.isLoading$$.next(false);
        })
      );
  }

  addMovieToUser(movieToAdd: CustoMovie): void {
    if (this.myMovies.includes(movieToAdd)) {
      return;
    }
    this.updateMovies([...this.myMovies, movieToAdd]);
    this.areMyMoviesEmpty$$.next(false);
  }

  removeEntryFromMyMovies(movieToRemove: CustoMovie): void {
    const movieArray = this.myMovies;
    const index = movieArray.findIndex(
      (movie) => movie.imdbId === movieToRemove.imdbId
    );
    movieArray.splice(index, 1);
    this.updateMovies(movieArray);
  }

  onLogout() {
    this.myMovies$$.next([]);
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
            `${FIREBASE_DB_USERS_URL}/${user!.id}/my_movies.json`,
            JSON.stringify(userMovies)
          )
        )
      )
      .subscribe();
  }
}
