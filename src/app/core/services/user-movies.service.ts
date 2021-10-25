import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, switchMap, take, tap } from 'rxjs/operators';
import { FIREBASE_DB_URL } from 'src/app/shared/constants';
import { CustoMedium } from 'src/app/shared/interfaces/custo-medium.interfaces';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserMoviesService {
  user$$ = this.authService.user$$;

  private userMovies: CustoMedium[] = [];

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
  }

  fetchUserMovies(): Observable<CustoMedium[]> {
    return this.user$$.pipe(
      take(1),
      filter((user) => Boolean(user)),
      switchMap((user) =>
        this.httpClient.get<CustoMedium[]>(
          `${FIREBASE_DB_URL}/${user!.id}.json`
        )
      )
    );
  }

  addMovieToUser(movieToAdd: CustoMedium): void {
    this.addMovieToArray(movieToAdd);
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

  private addMovieToArray(movieToAdd: CustoMedium) {
    this.userMovies.push(movieToAdd);
  }
}
