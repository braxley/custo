import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { BackendFriendData } from 'src/app/shared/interfaces/firebase-backend.interface';
import { FriendsService } from '../services/friends.service';

@Injectable({
  providedIn: 'root',
})
export class FriendsResolver implements Resolve<BackendFriendData | null> {
  constructor(private friendsService: FriendsService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<BackendFriendData | null> {
    const myFriends = this.friendsService.friendsOfUser;

    if (Boolean(myFriends)) {
      return of(myFriends);
    }
    return this.friendsService.loadFriends$();
  }
}
