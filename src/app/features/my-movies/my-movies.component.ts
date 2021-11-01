import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DataStorageService } from 'src/app/core/services/data-storage.service';
import { UserMoviesService } from 'src/app/core/services/user-movies.service';
import { CustoMovie } from 'src/app/shared/interfaces/custo-medium.interfaces';

@Component({
  templateUrl: './my-movies.component.html',
  styleUrls: ['./my-movies.component.scss'],
})
export class MyMoviesComponent implements OnInit {
  genres: string[] = [];
  userMovies$: Observable<CustoMovie[]>;
  isLoading = this.userMoviesService.isLoading$$;

  constructor(
    private userMoviesService: UserMoviesService,
    private dataStorageService: DataStorageService
  ) {
    this.userMovies$ = this.dataStorageService.userMovies$.pipe(
      tap((movieArray: CustoMovie[]) => {
        this.genres = [];
        movieArray.forEach((movie: CustoMovie) => {
          const genresOfMovie = movie.genreList;
          const uniqueGenres = genresOfMovie.filter(
            (genre: string) => !this.genres.includes(genre)
          );
          this.genres.push(...uniqueGenres);
        });
      })
    );
  }

  ngOnInit() {
    this.dataStorageService.ngOnInit();
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
