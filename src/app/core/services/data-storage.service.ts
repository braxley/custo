import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { take, filter, switchMap, tap } from 'rxjs/operators';
import { FIREBASE_DB_URL } from 'src/app/shared/constants';
import { CustoMovie } from 'src/app/shared/interfaces/custo-medium.interfaces';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  private currentUser$ = this.authService.user$;
  private myMovies$$ = new BehaviorSubject<CustoMovie[]>([]);
  get myMovies$() {
    return this.myMovies$$.asObservable();
  }
  get myMovies(): CustoMovie[] {
    return this.myMovies$$.getValue();
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

  fetchCurrentUserMovies(): Observable<CustoMovie[]> {
    return this.currentUser$.pipe(
      take(1),
      filter((user) => Boolean(user)),
      switchMap((user) =>
        this.httpClient.get<CustoMovie[]>(`${FIREBASE_DB_URL}/${user!.id}.json`)
      ),
      tap((movieArray: CustoMovie[]) => {
        this.myMovies$$.next(movieArray);
      })
    );
  }

  updateMovies(userMovies: CustoMovie[]): void {
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
