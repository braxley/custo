import { Component, ChangeDetectionStrategy } from '@angular/core';
import { tap } from 'rxjs/operators';
import { AuthService } from '../core/services/auth.service';
import { UserMoviesService } from '../core/services/user-movies.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  isAuthenticated = false;
  user$ = this.authService.user$.pipe(
    tap((user) => {
      this.isAuthenticated = Boolean(user);
      if (this.isAuthenticated) {
        this.userMoviesService.initFetchCurrentUserMovies();
      }
    })
  );

  constructor(
    private authService: AuthService,
    private userMoviesService: UserMoviesService
  ) {}

  onLogout() {
    this.authService.logout();
  }
}
