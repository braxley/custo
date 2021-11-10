import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { FindFriendsModalComponent as FindFriendsModalComponent } from './find-friends/find-friends-modal.component';
import { FriendsComponent } from './friends.component';

@NgModule({
  declarations: [FriendsComponent, FindFriendsModalComponent],
  imports: [CommonModule, SharedModule, FormsModule],
})
export class WatchWithFriendsModule {}
