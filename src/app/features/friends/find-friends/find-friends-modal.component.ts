import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { FriendsService } from 'src/app/core/services/friends.service';
import { CustoMovie } from 'src/app/shared/interfaces/custo-medium.interfaces';

@Component({
  selector: 'app-find-friends-modal',
  templateUrl: './find-friends-modal.component.html',
  styleUrls: ['./find-friends-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FindFriendsModalComponent {
  @Output() close = new EventEmitter<void>();
  error$ = this.friendsService.error$;

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
