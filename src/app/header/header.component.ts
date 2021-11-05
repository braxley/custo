import { Component, ChangeDetectionStrategy } from '@angular/core';
import { tap } from 'rxjs/operators';
import { AuthService } from '../core/services/auth.service';
import { UserMoviesService } from '../core/services/user-movies.service';
import { User } from '../shared/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  isAuthenticated = false;
  user$ = this.authService.user$.pipe(
    tap((user: User | null) => {
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

  onLogout(): void {
    this.authService.logout();
  }
}
