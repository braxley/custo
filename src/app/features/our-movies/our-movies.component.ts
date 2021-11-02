import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserMoviesService } from 'src/app/core/services/user-movies.service';
import { CustoMovie } from 'src/app/shared/interfaces/custo-medium.interfaces';

@Component({
  templateUrl: './our-movies.component.html',
  styleUrls: ['./our-movies.component.scss'],
})
export class OurMoviesComponent {
  commonMovies$ = new Subject<CustoMovie[]>();
  hasNoCommonMovies = new Subject<boolean>();
  constructor(private userMoviesService: UserMoviesService) {}

  onSubmit(form: NgForm) {
    const userId = form.value.findUserMovies;
    this.userMoviesService
      .findCommonMovies(userId)
      .pipe(
        tap((commonMovies: CustoMovie[]) => {
          if (commonMovies.length === 0) {
            this.hasNoCommonMovies.next(true);
          }
          this.commonMovies$.next(commonMovies);
        })
      )
      .subscribe();
  }
}
