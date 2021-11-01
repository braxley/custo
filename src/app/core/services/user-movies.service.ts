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
  myMovies = this.dataStorageService.myMovies;

  constructor(private dataStorageService: DataStorageService) {}

  addMovieToUser(movieToAdd: CustoMovie): void {
    if (this.myMovies && this.myMovies.includes(movieToAdd)) {
      return;
    }
    this.dataStorageService.updateMovies([...this.myMovies, movieToAdd]);
  }

  removeMovie(movieToRemove: CustoMovie) {
    // this is faster than filtering as it stops when it found the entry
    const index = this.myMovies.findIndex(
      (movie) => movie.imdbId === movieToRemove.imdbId
    );
    this.dataStorageService.updateMovies(this.myMovies.splice(index, 1));
  }

  findCommonMovies(userIdOfFriend: string) {
    this.isLoading$$.next(true);
    return this.dataStorageService.fetchMoviesByUserId(userIdOfFriend).pipe(
      map((moviesOfFriend: CustoMovie[]) => {
        let commonMovies: CustoMovie[];
        // using the shorter array to minimize calculations
        if (this.myMovies.length < moviesOfFriend.length) {
          commonMovies = this.myMovies.filter((movieOfUser) =>
            moviesOfFriend.find(
              (movieOfFriend: CustoMovie) =>
                movieOfFriend.imdbId === movieOfUser.imdbId
            )
          );
        } else {
          commonMovies = moviesOfFriend.filter((movieOfFriend) =>
            this.myMovies.find(
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
