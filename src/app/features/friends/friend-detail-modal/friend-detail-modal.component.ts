import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FriendsService } from 'src/app/core/services/friends.service';

@Component({
  selector: 'app-friend-detail-modal',
  templateUrl: './friend-detail-modal.component.html',
  styleUrls: ['./friend-detail-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FriendDetailModalComponent {
  @Output() close = new EventEmitter<void>();

  constructor(private friendsService: FriendsService) {}

  onClose() {
    this.close.emit();
  }
}
