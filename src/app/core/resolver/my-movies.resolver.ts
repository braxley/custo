import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { CustoMovie } from 'src/app/shared/interfaces/custo-medium.interfaces';
import { DataStorageService } from '../services/data-storage.service';
import { UserMoviesService } from '../services/user-movies.service';

@Injectable({
  providedIn: 'root',
})
export class MyMoviesResolver implements Resolve<CustoMovie[]> {
  constructor(
    private userMoviesService: UserMoviesService,
    private dataStorageService: DataStorageService
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<CustoMovie[]> {
    const myMovies = this.userMoviesService.myMovies;

    if (myMovies.length > 0) {
      return of(myMovies);
    } else {
      return this.dataStorageService.fetchCurrentUserMovies();
    }
  }
}
