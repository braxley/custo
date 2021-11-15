import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FriendsService } from 'src/app/core/services/friends.service';
import {
  CustoMovie,
  FriendDataWithCommonMoviesVM,
} from 'src/app/shared/interfaces/custo-medium.interfaces';
import { FriendData } from 'src/app/shared/interfaces/firebase-backend.interface';

@Component({
  selector: 'app-friend-detail-modal',
  templateUrl: './friend-detail-modal.component.html',
  styleUrls: ['./friend-detail-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FriendDetailModalComponent {
  friendData: FriendData = {} as FriendData;
  friendId: string = '';
  commonMovies: CustoMovie[] = [] as CustoMovie[];

  isRemoveFriendConfirmationVisible = false;

  @Input() set friendDataWithCommonMoviesVM(
    friendDataWithCommonMoviesVM: FriendDataWithCommonMoviesVM
  ) {
    const { friendData, friendId, commonMovies } = friendDataWithCommonMoviesVM;
    this.friendData = friendData;
    this.friendId = friendId;
    this.commonMovies = commonMovies;
  }

  @Output() close = new EventEmitter<void>();

  constructor(private friendsService: FriendsService) {}

  openRemoveFriendConfirmModal() {
    this.isRemoveFriendConfirmationVisible = true;
  }
  closeRemoveFriendModal() {
    this.isRemoveFriendConfirmationVisible = false;
  }
  removeFriend() {
    this.friendsService.removeFriend(this.friendId);
  }

  onClose() {
    this.close.emit();
  }
}
