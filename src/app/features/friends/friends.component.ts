import { Component } from '@angular/core';
import { toArray } from 'rxjs/operators';
import { FriendsService } from 'src/app/core/services/friends.service';
import { UserMoviesService } from 'src/app/core/services/user-movies.service';

@Component({
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
})
export class FriendsComponent {
  friends$ = this.friendsService.friendsOfUser$;
  selectedFriendsForComparison: string[] = [];

  filteredCommonMovies$ = this.friendsService.filteredCommonMovies$;

  isFindFriendsModalOpen = false;
  isLoading$ = this.friendsService.isLoading$;

  constructor(private friendsService: FriendsService) {}

  addFriendToComparison(friendId: string): void {
    this.selectedFriendsForComparison.push(friendId);
    this.friendsService.addFriendToComparison(friendId);
  }
  removeFriendFromComparison(friendId: string): void {
    const indexOfFriend = this.selectedFriendsForComparison.indexOf(friendId);
    this.selectedFriendsForComparison.splice(indexOfFriend, 1);
    this.friendsService.removeFriendFromComparison(friendId);
  }

  isFriendCompared(friendId: string): boolean {
    const indexOfFriend = this.selectedFriendsForComparison.indexOf(friendId);
    return indexOfFriend > -1;
  }

  openFindFriendsModal(): void {
    this.isFindFriendsModalOpen = true;
  }

  closeFindFriendsModal(): void {
    this.isFindFriendsModalOpen = false;
  }
}
