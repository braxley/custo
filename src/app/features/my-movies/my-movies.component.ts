import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserMoviesService } from 'src/app/core/services/user-movies.service';
import { CustoMedium } from 'src/app/shared/interfaces/custo-medium.interfaces';

@Component({
  templateUrl: './my-movies.component.html',
  styleUrls: ['./my-movies.component.scss'],
})
export class MyMoviesComponent implements OnInit {
  genres: string[] = [];
  userMovies$: Observable<CustoMedium[]>;
  isLoading = this.userMoviesService.isLoading$$;

  constructor(private userMoviesService: UserMoviesService) {
    this.userMovies$ = this.userMoviesService.userMovies$.pipe(
      tap((movieArray: CustoMedium[]) => {
        this.genres = [];
        movieArray.forEach((movie: CustoMedium) => {
          console.log(movie.genreList);
          const genresOfMovie = movie.genreList;
          genresOfMovie.filter((genre: string) => !this.genres.includes(genre));
          console.log(genresOfMovie);
          this.genres.push(...genresOfMovie);
        });
        console.log(this.genres);
      })
    );
  }

  ngOnInit() {
    this.userMoviesService.fetchUserMovies();
  }

  log() {
    console.log(this.genres);
  }
}
