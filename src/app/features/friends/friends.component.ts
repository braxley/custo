import { Component } from '@angular/core';

@Component({
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
})
export class FriendsComponent {
  isFindFriendsModalOpen = false;
  constructor() {}

  openFindFriendsModal() {
    this.isFindFriendsModalOpen = true;
  }

  closeFindFriendsModal() {
    this.isFindFriendsModalOpen = false;
  }
}
