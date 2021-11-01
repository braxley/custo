import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserMoviesService } from 'src/app/core/services/user-movies.service';

@Component({
  templateUrl: './our-movies.component.html',
  styleUrls: ['./our-movies.component.scss'],
})
export class OurMoviesComponent implements OnInit {
  constructor(private userMoviesService: UserMoviesService) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    const userId = form.value.findUserMovies;
    this.userMoviesService.fetchFriendsMovies(userId);
  }
}
