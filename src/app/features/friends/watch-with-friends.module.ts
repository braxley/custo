import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { FindFriendsModalComponent as FindFriendsModalComponent } from './find-friends/find-friends-modal.component';
import { FriendsRoutingModule } from './find-friends/watch-with-friends-routing.module';
import { FriendsComponent } from './friends.component';

@NgModule({
  declarations: [FriendsComponent, FindFriendsModalComponent],
  imports: [SharedModule, FormsModule, FriendsRoutingModule],
})
export class WatchWithFriendsModule {}
