import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
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

  constructor() {}

  ngOnInit(): void {
    this.isGoodMovie = this.movieResult.ratings.imdb >= this.minRating;
  }
}
