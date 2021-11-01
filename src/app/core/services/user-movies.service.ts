import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustoMovie } from 'src/app/shared/interfaces/custo-medium.interfaces';
import { DataStorageService } from './data-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserMoviesService {
  private isLoading$$ = new BehaviorSubject<boolean>(false);
  get isLoading$() {
    return this.isLoading$$.asObservable();
  }
  myMovies$ = this.dataStorageService.myMovies$;
  // TODO stf
  // this needs to be updated

  constructor(private dataStorageService: DataStorageService) {}

  addMovieToUser(movieToAdd: CustoMovie): void {
    if (this.dataStorageService.myMovies.includes(movieToAdd)) {
      return;
    }
    console.log(this.dataStorageService.myMovies);
    this.dataStorageService.updateMovies([
      ...this.dataStorageService.myMovies,
      movieToAdd,
    ]);
  }

  removeMovie(movieToRemove: CustoMovie) {
    // this is faster than filtering as it stops when it found the entry
    const index = this.dataStorageService.myMovies.findIndex(
      (movie) => movie.imdbId === movieToRemove.imdbId
    );
    this.dataStorageService.updateMovies(
      this.dataStorageService.myMovies.splice(index, 1)
    );
  }

  findCommonMovies(userIdOfFriend: string) {
    this.isLoading$$.next(true);
    return this.dataStorageService.fetchMoviesByUserId(userIdOfFriend).pipe(
      map((moviesOfFriend: CustoMovie[]) => {
        let commonMovies: CustoMovie[];
        // using the shorter array to minimize calculations
        if (this.dataStorageService.myMovies.length < moviesOfFriend.length) {
          commonMovies = this.dataStorageService.myMovies.filter(
            (movieOfUser) =>
              moviesOfFriend.find(
                (movieOfFriend: CustoMovie) =>
                  movieOfFriend.imdbId === movieOfUser.imdbId
              )
          );
        } else {
          commonMovies = moviesOfFriend.filter((movieOfFriend) =>
            this.dataStorageService.myMovies.find(
              (movieOfUser: CustoMovie) =>
                movieOfUser.imdbId === movieOfFriend.imdbId
            )
          );
        }
        this.isLoading$$.next(false);
        return commonMovies;
      })
    );
  }
}
