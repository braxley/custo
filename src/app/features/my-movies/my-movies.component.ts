import { Component, OnInit } from '@angular/core';
import { UserMoviesService } from 'src/app/core/services/user-movies.service';

@Component({
  templateUrl: './my-movies.component.html',
  styleUrls: ['./my-movies.component.scss'],
})
export class MyMoviesComponent implements OnInit {
  userMovies$ = this.userMoviesService.userMovies$;
  isLoading = this.userMoviesService.isLoading$$;

  constructor(private userMoviesService: UserMoviesService) {}

  ngOnInit() {
    this.userMoviesService.fetchUserMovies();
  }
}
