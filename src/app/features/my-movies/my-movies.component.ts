import { Component, OnInit } from '@angular/core';
import { UserMoviesService } from 'src/app/core/services/user-movies.service';
import { CustoMedium } from 'src/app/shared/interfaces/custo-medium.interfaces';
import { getMockCustoMovie } from 'src/app/shared/test/test-data';

@Component({
  templateUrl: './my-movies.component.html',
  styleUrls: ['./my-movies.component.scss'],
})
export class MyMoviesComponent implements OnInit {
  userMovies$ = this.userMoviesService.userMovies$;

  constructor(private userMoviesService: UserMoviesService) {}

  ngOnInit() {
    this.userMoviesService.fetchUserMovies();
  }
}
