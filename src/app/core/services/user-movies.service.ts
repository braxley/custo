import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, switchMap, take, tap } from 'rxjs/operators';
import { FIREBASE_DB_URL } from 'src/app/shared/constants';
import { CustoMedium } from 'src/app/shared/interfaces/custo-medium.interfaces';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserMoviesService {
  isLoading$$ = new BehaviorSubject<boolean>(false);

  private user$$ = this.authService.user$$;
  private userMovies: CustoMedium[] = [];
  private userMovies$$ = new BehaviorSubject<CustoMedium[]>([]);

  get userMovies$(): Observable<CustoMedium[]> {
    return this.userMovies$$.asObservable();
  }

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  getMovies(): CustoMedium[] {
    return this.userMovies.slice();
  }

  removeMovie(movieToRemove: CustoMedium) {
    const index = this.userMovies.findIndex(
      (movie) => movie.imdbId === movieToRemove.imdbId
    );
    this.userMovies.splice(index, 1);
    this.userMovies$$.next(this.userMovies);
  }

  fetchUserMovies() {
    this.isLoading$$.next(true);
    this.user$$
      .pipe(
        take(1),
        filter((user) => Boolean(user)),
        switchMap((user) =>
          this.httpClient.get<CustoMedium[]>(
            `${FIREBASE_DB_URL}/${user!.id}.json`
          )
        ),
        tap((movieArray) => {
          this.isLoading$$.next(false);
          this.userMovies = movieArray;
          this.userMovies$$.next(this.userMovies);
        })
      )
      .subscribe();
  }

  addMovieToUser(movieToAdd: CustoMedium): void {
    if (this.userMovies.includes(movieToAdd)) {
      return;
    }
    console.log(this.userMovies);
    this.userMovies.push(movieToAdd);
    this.userMovies$$.next(this.userMovies);
    this.user$$
      .pipe(
        take(1),
        filter((user) => Boolean(user)),
        switchMap((user) =>
          this.httpClient.put<CustoMedium>(
            `${FIREBASE_DB_URL}/${user!.id}.json`,
            JSON.stringify(this.getMovies())
          )
        )
      )
      .subscribe();
  }
}
