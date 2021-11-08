import { Component, ChangeDetectionStrategy } from '@angular/core';
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
  user$ = this.authService.user$;

  constructor(
    private authService: AuthService,
    private userMoviesService: UserMoviesService
  ) {}

  onLogout(): void {
    this.authService.logout();
    this.userMoviesService.onLogout();
  }
}
