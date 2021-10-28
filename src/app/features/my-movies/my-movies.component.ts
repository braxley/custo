import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserMoviesService } from 'src/app/core/services/user-movies.service';
import { CustoMovie as CustoMovie } from 'src/app/shared/interfaces/custo-medium.interfaces';

@Component({
  templateUrl: './my-movies.component.html',
  styleUrls: ['./my-movies.component.scss'],
})
export class MyMoviesComponent implements OnInit {
  genres: string[] = [];
  userMovies$: Observable<CustoMovie[]>;
  isLoading = this.userMoviesService.isLoading$$;

  constructor(private userMoviesService: UserMoviesService) {
    this.userMovies$ = this.userMoviesService.userMovies$.pipe(
      tap((movieArray: CustoMovie[]) => {
        this.genres = [];
        movieArray.forEach((movie: CustoMovie) => {
          console.log(movie.genreList);
          const genresOfMovie = movie.genreList;
          const uniqueGenres = genresOfMovie.filter(
            (genre: string) => !this.genres.includes(genre)
          );
          console.log(genresOfMovie);
          this.genres.push(...uniqueGenres);
        });
      })
    );
  }

  ngOnInit() {
    this.userMoviesService.fetchUserMovies();
  }

  removeMovie(movie: CustoMovie) {
    this.userMoviesService.removeMovie(movie);
  }

  filterGenre(genre: string): CustoMovie[] {
    return this.userMoviesService
      .getMovies()
      .filter((movie: CustoMovie) =>
        movie.genreList.find((movieGenre: string) => movieGenre === genre)
      );
  }
}
