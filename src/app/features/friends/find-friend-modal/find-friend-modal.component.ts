import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { FriendsService } from 'src/app/core/services/friends.service';

@Component({
  selector: 'app-find-friend-modal',
  templateUrl: './find-friend-modal.component.html',
  styleUrls: ['./find-friend-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FindFriendsModalComponent {
  error$ = this.friendsService.error$;

  @Output() close = new EventEmitter<void>();

  constructor(private friendsService: FriendsService) {}

  onSubmit(form: NgForm) {
    this.friendsService.addFriendInDb(form.value.findUser).subscribe(() => {
      this.close.emit();
    });
  }

  onClose() {
    this.close.emit();
  }
}
