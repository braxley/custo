import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { CustoMovie } from 'src/app/shared/interfaces/custo-movie.interfaces';
import { AuthService } from '../services/auth.service';
import { UserMoviesService } from '../services/user-movies.service';

@Injectable({
  providedIn: 'root',
})
export class MyMoviesResolver implements Resolve<CustoMovie[]> {
  constructor(
    private userMoviesService: UserMoviesService,
    private authService: AuthService
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<CustoMovie[]> {
    if (this.authService.user) {
      const myMovies = this.userMoviesService.myMovies;

      if (myMovies.length > 0) {
        return of(myMovies);
      }
      return this.userMoviesService.fetchCurrentUserMovies();
    }
    return of([]);
  }
}
