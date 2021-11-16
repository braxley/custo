import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../core/services/auth.service';
import { FriendsService } from '../core/services/friends.service';
import { UserMoviesService } from '../core/services/user-movies.service';
import { User } from '../shared/models/user.model';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnDestroy {
  isAuthenticated = false;
  user$ = this.authService.user$;
  userSub: Subscription;

  isSideMenuOpen = false;

  constructor(
    private authService: AuthService,
    private friendsService: FriendsService,
    private userMoviesService: UserMoviesService
  ) {
    this.userSub = this.authService.user$.subscribe((user: User | null) => {
      if (!Boolean(user)) {
        this.isAuthenticated = false;
        this.friendsService.onLogout();
        this.userMoviesService.onLogout();
      } else {
        this.isAuthenticated = true;
      }
    });
  }

  toggleSideMenu() {
    this.isSideMenuOpen = !this.isSideMenuOpen;
  }

  onLogout(): void {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
