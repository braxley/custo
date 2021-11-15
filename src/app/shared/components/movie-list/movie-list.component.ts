import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UserMoviesService } from 'src/app/core/services/user-movies.service';
import { CustoMovie } from '../../interfaces/custo-medium.interfaces';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieListComponent {
  @Input() movies: CustoMovie[] = [];
  @Input() isMovieRemovable = false;

  constructor(private userMoviesService: UserMoviesService) {}

  removeMovie(movie: CustoMovie) {
    this.userMoviesService.removeEntryFromMyMovies(movie);
  }
}
