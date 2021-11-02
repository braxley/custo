import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { FIREBASE_DB_URL } from 'src/app/shared/constants';
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
  private currentUser$ = this.authService.user$;
  private myMovies$$ = new BehaviorSubject<CustoMovie[]>([]);
  private user: User | null = null;
  get myMovies$() {
    return this.myMovies$$.asObservable();
  }
  get myMovies(): CustoMovie[] {
    return this.myMovies$$.value;
  }

  constructor(
    private authService: AuthService,
    private httpClient: HttpClient
  ) {}

  fetchMoviesByUserId(userId: string): Observable<CustoMovie[]> {
    return this.httpClient.get<CustoMovie[]>(
      `${FIREBASE_DB_URL}/${userId}.json`
    );
  }

  initFetchCurrentUserMovies() {
    this.user = this.authService.user;
    if (Boolean(this.user)) {
      this.fetchCurrentUserMovies().subscribe();
    }
  }

  fetchCurrentUserMovies(): Observable<CustoMovie[]> {
    return this.httpClient
      .get<CustoMovie[]>(`${FIREBASE_DB_URL}/${this.user?.id}.json`)
      .pipe(
        tap((movieArray: CustoMovie[]) => {
          this.myMovies$$.next(movieArray);
        })
      );
  }

  addMovieToUser(movieToAdd: CustoMovie) {
    if (this.myMovies?.includes(movieToAdd)) {
      return;
    }
    if (this.myMovies) {
      this.updateMovies([...this.myMovies, movieToAdd]);
    } else {
      this.fetchCurrentUserMovies().subscribe(() => {
        if (this.myMovies) {
          this.updateMovies([...this.myMovies, movieToAdd]);
        } else {
          this.updateMovies([movieToAdd]);
        }
      });
    }
  }

  removeEntryFromMyMovies(movieToRemove: CustoMovie) {
    // this is faster than filtering as it stops when it found the entry
    const movieArray = this.myMovies;
    const index = movieArray.findIndex(
      (movie) => movie.imdbId === movieToRemove.imdbId
    );
    movieArray.splice(index, 1);
    this.updateMovies(movieArray);
  }

  findCommonMovies(userIdOfFriend: string) {
    this.isLoading$$.next(true);
    return this.fetchMoviesByUserId(userIdOfFriend).pipe(
      map((moviesOfFriend: CustoMovie[]) => {
        let commonMovies: CustoMovie[];
        // using the shorter array to minimize calculations
        if (this.myMovies.length < moviesOfFriend.length) {
          commonMovies = this.myMovies.filter((movieOfUser) =>
            moviesOfFriend.find(
              (movieOfFriend: CustoMovie) =>
                movieOfFriend.imdbId === movieOfUser.imdbId
            )
          );
        } else {
          commonMovies = moviesOfFriend.filter((movieOfFriend) =>
            this.myMovies.find(
              (movieOfUser: CustoMovie) =>
                movieOfUser.imdbId === movieOfFriend.imdbId
            )
          );
        }
        this.isLoading$$.next(false);
        return commonMovies;
      })
    );
  }

  private updateMovies(userMovies: CustoMovie[]): void {
    this.myMovies$$.next(userMovies);
    this.currentUser$
      .pipe(
        take(1),
        filter((user) => Boolean(user)),
        switchMap((user) =>
          this.httpClient.put<CustoMovie>(
            `${FIREBASE_DB_URL}/${user!.id}.json`,
            JSON.stringify(userMovies)
          )
        )
      )
      .subscribe();
  }
}
