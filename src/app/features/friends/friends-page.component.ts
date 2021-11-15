import { Component } from '@angular/core';
import { FriendsService } from 'src/app/core/services/friends.service';
import { FriendDataWithCommonMoviesVM } from 'src/app/shared/interfaces/custo-medium.interfaces';

@Component({
  templateUrl: './friends-page.component.html',
  styleUrls: ['./friends-page.component.scss'],
})
export class FriendsPageComponent {
  friends$ = this.friendsService.friendsOfUser$;
  selectedFriendsForComparison: string[] = [];
  friendDataWithCommonMoviesVM: FriendDataWithCommonMoviesVM =
    {} as FriendDataWithCommonMoviesVM;

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

  openFriendDetails(friendId: string) {
    this.friendsService
      .findCommonMoviesWithFriend(friendId)
      .subscribe((friendDataWithCommonMoviesVM) => {
        this.friendDataWithCommonMoviesVM = friendDataWithCommonMoviesVM;
      });
    this.isFriendDetailModalOpen = true;
  }
  closeFriendDetailsModal() {
    this.isFriendDetailModalOpen = false;
    this.friendDataWithCommonMoviesVM = {} as FriendDataWithCommonMoviesVM;
  }

  openFindFriendsModal(): void {
    this.isFindFriendsModalOpen = true;
  }
  closeFindFriendsModal(): void {
    this.isFindFriendsModalOpen = false;
  }
}
