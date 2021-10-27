import { Component, ChangeDetectionStrategy } from '@angular/core';
import { tap } from 'rxjs/operators';
import { AuthService } from '../core/services/auth.service';

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
    })
  );

  constructor(private authService: AuthService) {}

  onLogout() {
    this.authService.logout();
  }
}
