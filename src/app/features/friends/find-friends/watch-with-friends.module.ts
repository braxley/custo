import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FindFriendsModalComponent as FindFriendsModalComponent } from './find-friends-modal.component';
import { FormsModule } from '@angular/forms';
import { FriendsComponent } from '../friends.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [FriendsComponent, FindFriendsModalComponent],
  imports: [CommonModule, SharedModule, FormsModule],
})
export class WatchWithFriendsModule {}
