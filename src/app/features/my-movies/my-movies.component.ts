import { Component } from '@angular/core';
import { UserMoviesService } from 'src/app/core/services/user-movies.service';

@Component({
  templateUrl: './my-movies.component.html',
  styleUrls: ['./my-movies.component.scss'],
})
export class MyMoviesComponent {
  myMovies$ = this.userMoviesService.myMovies$;
  areMyMoviesEmpty$ = this.userMoviesService.areMyMoviesEmpty$;

  constructor(private userMoviesService: UserMoviesService) {}
}
