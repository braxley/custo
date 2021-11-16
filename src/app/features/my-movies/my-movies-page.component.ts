import { Component } from '@angular/core';
import { tap } from 'rxjs/operators';
import { UserMoviesService } from 'src/app/core/services/user-movies.service';
import { CustoMovie } from 'src/app/shared/interfaces/custo-movie.interfaces';

@Component({
  templateUrl: './my-movies-page.component.html',
  styleUrls: ['./my-movies-page.component.scss'],
})
export class MyMoviesPageComponent {
  areMyMoviesEmpty = false;
  isLoading = true;

  isLoading$ = this.userMoviesService.isLoading$;
  myMovies$ = this.userMoviesService.myMovies$.pipe(
    tap((myMovies: CustoMovie[]) => {
      // this is to prevent ExpressionChangedAfterItHasBeenCheckedError
      setTimeout(() => {
        this.adaptComponentVariablesToMovies(myMovies);
      }, 0);
    })
  );

  constructor(private userMoviesService: UserMoviesService) {}

  private adaptComponentVariablesToMovies(myMovies: CustoMovie[]) {
    this.isLoading = false;
    if (myMovies.length === 0) {
      this.areMyMoviesEmpty = true;
    }
  }
}
