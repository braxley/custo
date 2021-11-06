import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  EMPTY,
  Observable,
  of,
  Subject,
  throwError,
} from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import {
  FIREBASE_DB_URL,
  FIREBASE_DB_USERS_URL,
} from 'src/app/shared/constants';
import {
  BackendFriendData,
  BackendUserData,
} from 'src/app/shared/interfaces/friends-backend.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class FriendsService {
  private friends$$ = new BehaviorSubject<BackendFriendData>({});
  get friends$(): Observable<any> {
    return this.friends$$.asObservable();
  }
  get friends() {
    return this.friends$$.value;
  }

  private error$$ = new Subject<string>();
  get error$(): Observable<string> {
    return this.error$$.asObservable();
  }

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {
    this.loadFriends();
  }

  loadFriends() {
    this.httpClient
      .get<BackendFriendData>(
        `${FIREBASE_DB_URL}users/${this.authService.user?.id}/friends.json`
      )
      .pipe(
        tap((friendData) => {
          this.friends$$.next(friendData);
        })
      )
      .subscribe();
  }

  addFriendInDb(email: string) {
    this.getFriendsIdFromEmail(email)
      .pipe(switchMap(this.addIdToFriends.bind(this)))
      .subscribe();
  }

  private getFriendsIdFromEmail(email: string): Observable<string> {
    return this.httpClient
      .get<BackendUserData>(FIREBASE_DB_URL + 'users.json')
      .pipe(
        switchMap((backendUserData: BackendUserData) => {
          let friendId = '';
          for (const [key, value] of Object.entries(backendUserData)) {
            if (value.user_data.email === email) {
              friendId = key;
            }
          }
          return of(friendId);
        })
      );
  }

  private addIdToFriends(userId: string): Observable<BackendFriendData> {
    if (userId === '') {
      return throwError('No UserId Found');
    }

    let isAlreadyInFriendList = false;
    for (const [key, value] of Object.entries(this.friends)) {
      if (key === userId) {
        isAlreadyInFriendList = true;
        if (value) {
          this.error$$.next('Already your friend');
        } else {
          this.error$$.next('Friend request pending');
        }
      }
    }
    if (isAlreadyInFriendList) {
      return EMPTY;
    }

    const friendsEntryInDb: BackendFriendData = {};
    friendsEntryInDb[`${userId}`] = true;

    return this.httpClient.patch<BackendFriendData>(
      `${FIREBASE_DB_USERS_URL}${this.authService.user?.id}/friends.json`,
      friendsEntryInDb
    );
  }
}
