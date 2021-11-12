import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { FindFriendsModalComponent as FindFriendsModalComponent } from './find-friend-modal/find-friend-modal.component';
import { FriendsComponent } from './friends.component';
import { FriendsRoutingModule } from './watch-with-friends-routing.module';
import { FriendDetailModalComponent } from './friend-detail-modal/friend-detail-modal.component';

@NgModule({
  declarations: [FriendsComponent, FindFriendsModalComponent, FriendDetailModalComponent],
  imports: [SharedModule, FormsModule, FriendsRoutingModule],
})
export class WatchWithFriendsModule {}
