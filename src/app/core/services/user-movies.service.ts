import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { FIREBASE_DB_URL } from 'src/app/shared/constants';
import { CustoMedium } from 'src/app/shared/interfaces/custo-medium.interfaces';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserMoviesService {
  user: User = this.authService.user$$.getValue()!;
  userMovies$$ = new BehaviorSubject<CustoMedium[]>([]);

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

  fetchUserMovies() {
    this.httpClient
      .get<CustoMedium[]>(`${FIREBASE_DB_URL}/${this.user.id}.json`)
      .pipe(
        take(1),
        tap((movieArray) => {
          this.userMovies$$.next(movieArray);
          console.log(movieArray);
        })
      )
      .subscribe();
  }

  addMovieToUser(movieToAdd: CustoMedium): void {
    this.addMovieToArray(movieToAdd);
    this.httpClient
      .put<CustoMedium>(
        `${FIREBASE_DB_URL}/${this.user.id}.json`,
        JSON.stringify(this.getMovies())
      )
      .subscribe();
  }

  private addMovieToArray(movieToAdd: CustoMedium) {
    this.userMovies.push(movieToAdd);
  }
}
