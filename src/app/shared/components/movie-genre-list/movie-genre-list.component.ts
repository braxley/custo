import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { UserMoviesService } from 'src/app/core/services/user-movies.service';
import { CustoMovie } from '../../interfaces/custo-medium.interfaces';

@Component({
  selector: 'app-movie-genre-list',
  templateUrl: './movie-genre-list.component.html',
  styleUrls: ['./movie-genre-list.component.scss'],
})
export class MovieGenreListComponent {
  isLoading$ = this.userMoviesService.isLoading$;
  genres: string[] = [];

  private _movies: CustoMovie[] = [];
  @Input() set movies(movieArray: CustoMovie[]) {
    if (movieArray) {
      this._movies = movieArray;
      this.genres = [];
      movieArray.forEach((movie: CustoMovie) => {
        const genresOfMovie = movie.genreList;
        const uniqueGenres = genresOfMovie.filter(
          (genre: string) => !this.genres.includes(genre)
        );
        this.genres.push(...uniqueGenres);
      });
    }
  }
  get movies() {
    return this._movies;
  }

  constructor(private userMoviesService: UserMoviesService) {}

  removeMovie(movie: CustoMovie) {
    this.userMoviesService.removeEntryFromMyMovies(movie);
  }

  filterGenre(genre: string): CustoMovie[] {
    return this.movies.filter((movie: CustoMovie) =>
      movie.genreList.find((movieGenre: string) => movieGenre === genre)
    );
  }
}
