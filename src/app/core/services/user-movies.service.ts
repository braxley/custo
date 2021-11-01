import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { CustoMovie } from 'src/app/shared/interfaces/custo-medium.interfaces';
import { DataStorageService } from './data-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserMoviesService implements OnDestroy {
  isLoading$$ = new BehaviorSubject<boolean>(true);
  userMovies: CustoMovie[] = [];
  private userMoviesSub: Subscription;

  constructor(private dataStorageService: DataStorageService) {
    this.userMoviesSub = this.dataStorageService.userMovies$.subscribe(
      (moviesArray: CustoMovie[]) => {
        this.isLoading$$.next(false);
        this.userMovies = moviesArray;
      }
    );
  }

  getMovies(): CustoMovie[] {
    return this.userMovies.slice();
  }

  addMovieToUser(movieToAdd: CustoMovie): void {
    if (this.userMovies.includes(movieToAdd)) {
      return;
    }
    this.userMovies.push(movieToAdd);
    this.dataStorageService.updateMovies(this.userMovies);
  }

  removeMovie(movieToRemove: CustoMovie) {
    // this is faster than filtering as it stops when it found the entry
    const index = this.userMovies.findIndex(
      (movie) => movie.imdbId === movieToRemove.imdbId
    );
    this.userMovies.splice(index, 1);
    this.dataStorageService.updateMovies(this.userMovies);
  }

  findCommonMovies(userIdOfFriend: string) {
    this.isLoading$$.next(true);
    this.dataStorageService
      .fetchMoviesByUserId(userIdOfFriend)
      .subscribe((moviesOfFriend: CustoMovie[]) => {
        let commonMovies: CustoMovie[];
        // using the shorter array to minimize calculations
        if (this.userMovies.length < moviesOfFriend.length) {
          commonMovies = this.userMovies.filter((movieOfUser) =>
            moviesOfFriend.find(
              (movieOfFriend: CustoMovie) =>
                movieOfFriend.imdbId === movieOfUser.imdbId
            )
          );
        } else {
          commonMovies = moviesOfFriend.filter((movieOfFriend) =>
            this.userMovies.find(
              (movieOfUser: CustoMovie) =>
                movieOfUser.imdbId === movieOfFriend.imdbId
            )
          );
        }
        this.isLoading$$.next(false);
        return commonMovies;
      });
  }

  ngOnDestroy() {
    this.userMoviesSub.unsubscribe();
  }
}
