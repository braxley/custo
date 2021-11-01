import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { CustoMovie } from 'src/app/shared/interfaces/custo-medium.interfaces';
import { AuthService } from '../services/auth.service';
import { DataStorageService } from '../services/data-storage.service';
import { UserMoviesService } from '../services/user-movies.service';

@Injectable({
  providedIn: 'root',
})
export class MyMoviesResolver implements Resolve<CustoMovie[]> {
  constructor(
    private userMoviesService: UserMoviesService,
    private dataStorageService: DataStorageService,
    private authService: AuthService
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<CustoMovie[]> {
    if (this.authService.user) {
      const myMovies = this.dataStorageService.myMovies;

      if (myMovies.length > 0) {
        return of(myMovies);
      }
      return this.dataStorageService.fetchCurrentUserMovies();
    }
    return EMPTY;
  }
}
