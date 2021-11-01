import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { take, filter, switchMap, tap } from 'rxjs/operators';
import { FIREBASE_DB_URL } from 'src/app/shared/constants';
import { CustoMovie } from 'src/app/shared/interfaces/custo-medium.interfaces';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService implements OnDestroy {
  private currentUser$ = this.authService.user$;
  private myMovies$$ = new BehaviorSubject<CustoMovie[]>([]);
  private userSubscription: Subscription;
  private user: User | null = null;
  get myMovies$() {
    return this.myMovies$$.asObservable();
  }
  get myMovies(): CustoMovie[] {
    return this.myMovies$$.getValue();
  }

  constructor(
    private authService: AuthService,
    private httpClient: HttpClient
  ) {
    this.userSubscription = this.authService.user$
      .pipe(
        tap((user: User | null) => {
          if (!user) {
            this.myMovies$$.next([]);
          }
          this.user = user;
        })
      )
      .subscribe();
  }

  fetchMoviesByUserId(userId: string): Observable<CustoMovie[]> {
    return this.httpClient.get<CustoMovie[]>(
      `${FIREBASE_DB_URL}/${userId}.json`
    );
  }

  fetchCurrentUserMovies(): Observable<CustoMovie[]> {
    return this.httpClient
      .get<CustoMovie[]>(`${FIREBASE_DB_URL}/${this.user?.id}.json`)
      .pipe(
        tap((movieArray: CustoMovie[]) => {
          console.log(movieArray);
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

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
