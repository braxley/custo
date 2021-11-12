import { Component } from '@angular/core';
import { FriendsService } from 'src/app/core/services/friends.service';

@Component({
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
})
export class FriendsComponent {
  friends$ = this.friendsService.friendsOfUser$;
  selectedFriendsForComparison: string[] = [];

  filteredCommonMovies$ = this.friendsService.filteredCommonMovies$;

  isFriendDetailModalOpen = false;
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

  openFriendDetails() {
    this.friendsService.findCommonMoviesWithOneFriend(
      'pBYWYqUsZDY1BAmBC24mJMjfZeS2'
    );
    this.isFriendDetailModalOpen = true;
  }
  closeFriendDetails() {
    this.isFriendDetailModalOpen = true;
  }

  openFindFriendsModal(): void {
    this.isFindFriendsModalOpen = true;
  }
  closeFindFriendsModal(): void {
    this.isFindFriendsModalOpen = false;
  }
}
