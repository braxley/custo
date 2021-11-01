import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { take, filter, switchMap, tap } from 'rxjs/operators';
import { FIREBASE_DB_URL } from 'src/app/shared/constants';
import { CustoMovie } from 'src/app/shared/interfaces/custo-medium.interfaces';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService implements OnInit {
  private currentUser$ = this.authService.user$;
  private userMovies$$ = new BehaviorSubject<CustoMovie[]>([]);

  get userMovies$() {
    return this.userMovies$$.asObservable();
  }

  constructor(
    private authService: AuthService,
    private httpClient: HttpClient
  ) {}

  ngOnInit() {
    this.fetchCurrentUserMovies();
  }

  fetchMoviesByUserId(userId: string): Observable<CustoMovie[]> {
    return this.httpClient.get<CustoMovie[]>(
      `${FIREBASE_DB_URL}/${userId}.json`
    );
  }

  updateMovies(userMovies: CustoMovie[]) {
    this.userMovies$$.next(userMovies);
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

  private fetchCurrentUserMovies() {
    this.currentUser$
      .pipe(
        take(1),
        filter((user) => Boolean(user)),
        switchMap((user) =>
          this.httpClient.get<CustoMovie[]>(
            `${FIREBASE_DB_URL}/${user!.id}.json`
          )
        ),
        tap((movieArray: CustoMovie[]) => {
          this.userMovies$$.next(movieArray);
        })
      )
      .subscribe();
  }
}
