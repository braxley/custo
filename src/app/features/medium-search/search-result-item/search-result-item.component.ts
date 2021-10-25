import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { UserMoviesService } from 'src/app/core/services/user-movies.service';
import { CustoMedium } from 'src/app/shared/interfaces/custo-medium.interfaces';

@Component({
  selector: 'app-search-result-item',
  templateUrl: './search-result-item.component.html',
  styleUrls: ['./search-result-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResultItemComponent implements OnInit {
  @Input() movieResult!: CustoMedium;
  @Input() minRating!: number;

  isGoodMovie: boolean = false;

  constructor(private userMoviesService: UserMoviesService) {}

  ngOnInit(): void {
    this.isGoodMovie = this.movieResult.ratings.imdb >= this.minRating;
  }

  addMovieToUser() {
    this.userMoviesService.addMovieToUser(this.movieResult);
  }
}
