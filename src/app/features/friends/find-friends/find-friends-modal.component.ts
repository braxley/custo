import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserMoviesService } from 'src/app/core/services/user-movies.service';
import { CustoMovie } from 'src/app/shared/interfaces/custo-medium.interfaces';

@Component({
  selector: 'app-find-friends-modal',
  templateUrl: './find-friends-modal.component.html',
  styleUrls: ['./find-friends-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FindFriendsModalComponent {
  @Output() close = new EventEmitter<void>();

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

  onClose() {
    this.close.emit();
  }
}
