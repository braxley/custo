import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { filter, switchMap, take, tap } from 'rxjs/operators';
import { FIREBASE_DB_URL } from 'src/app/shared/constants';
import { CustoMovie } from 'src/app/shared/interfaces/custo-medium.interfaces';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserMoviesService {
  isLoading$$ = new BehaviorSubject<boolean>(false);
  friendsMovies: CustoMovie[] = [];

  private user$$ = this.authService.user$$;
  private userMovies: CustoMovie[] = [];
  private userMovies$$ = new BehaviorSubject<CustoMovie[]>([]);

  get userMovies$(): Observable<CustoMovie[]> {
    return this.userMovies$$.asObservable();
  }

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  getMovies(): CustoMovie[] {
    return this.userMovies.slice();
  }

  addMovieToUser(movieToAdd: CustoMovie): void {
    if (this.userMovies.includes(movieToAdd)) {
      return;
    }
    this.userMovies.push(movieToAdd);
    this.userMovies$$.next(this.userMovies);
    this.updateMoviesInBackend();
  }

  removeMovie(movieToRemove: CustoMovie) {
    // this is faster than filtering as it stops when it found the entry
    const index = this.userMovies.findIndex(
      (movie) => movie.imdbId === movieToRemove.imdbId
    );
    this.userMovies.splice(index, 1);
    this.userMovies$$.next(this.userMovies);
    this.updateMoviesInBackend();
  }

  fetchUserMovies() {
    this.isLoading$$.next(true);
    this.user$$
      .pipe(
        take(1),
        filter((user) => Boolean(user)),
        switchMap((user) =>
          this.httpClient.get<CustoMovie[]>(
            `${FIREBASE_DB_URL}/${user!.id}.json`
          )
        ),
        tap((movieArray) => {
          this.isLoading$$.next(false);
          if (movieArray) {
            this.userMovies = movieArray;
            this.userMovies$$.next(this.userMovies);
          }
        })
      )
      .subscribe();
  }

  fetchFriendsMovies(friendId: string) {
    this.isLoading$$.next(true);

    return this.httpClient
      .get<CustoMovie[]>(`${FIREBASE_DB_URL}/${friendId}.json`)
      .pipe(
        filter((movieArray) => Boolean(movieArray)),
        switchMap((movieArray) => {
          this.isLoading$$.next(false);
          return of(this.findCommonMovies(this.getMovies(), movieArray));
        }),
        tap(console.dir)
      )
      .subscribe();
  }

  findCommonMovies(moviesOfUser: CustoMovie[], moviesOfFriend: CustoMovie[]) {
    let commonMovies: CustoMovie[];
    console.log(moviesOfUser);
    console.log(moviesOfFriend);
    if (moviesOfUser.length < moviesOfFriend.length) {
      commonMovies = moviesOfUser.filter((movieOfUser) =>
        moviesOfFriend.find(
          (movieOfFriend: CustoMovie) =>
            movieOfFriend.imdbId === movieOfUser.imdbId
        )
      );
    } else {
      commonMovies = moviesOfFriend.filter((movieOfFriend) =>
        moviesOfUser.find(
          (movieOfUser: CustoMovie) =>
            movieOfUser.imdbId === movieOfFriend.imdbId
        )
      );
    }
    return commonMovies;
  }

  private updateMoviesInBackend() {
    this.user$$
      .pipe(
        take(1),
        filter((user) => Boolean(user)),
        switchMap((user) =>
          this.httpClient.put<CustoMovie>(
            `${FIREBASE_DB_URL}/${user!.id}.json`,
            JSON.stringify(this.getMovies())
          )
        )
      )
      .subscribe();
  }
}
