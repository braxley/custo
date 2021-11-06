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
import { catchError, switchMap, tap } from 'rxjs/operators';
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
  private friendsOfUser$$ = new BehaviorSubject<BackendFriendData>({});
  get friendsOfUser$(): Observable<BackendFriendData | null> {
    return this.friendsOfUser$$.asObservable();
  }
  get friendsOfUser(): BackendFriendData | null {
    return this.friendsOfUser$$.value;
  }

  private error$$ = new BehaviorSubject<string | null>(null);
  get error$(): Observable<string | null> {
    return this.error$$.asObservable();
  }

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {
    this.loadFriends();
  }

  loadFriends(): void {
    this.httpClient
      .get<BackendFriendData>(
        `${FIREBASE_DB_URL}users/${this.authService.user?.id}/friends.json`
      )
      .pipe(
        tap((friendData) => {
          console.log(friendData);
          this.friendsOfUser$$.next(friendData);
        })
      )
      .subscribe();
  }

  addFriendInDb(email: string): Observable<BackendFriendData> {
    return this.getFriendsIdFromEmail(email).pipe(
      switchMap(this.addUserIdToFriends.bind(this)),
      switchMap((backendFriendData: BackendFriendData) => {
        let friendId = Object.keys(backendFriendData)[0];
        return this.addUserAlsoToFriendsFriends(friendId);
      })
    );
  }

  private getFriendsIdFromEmail(email: string): Observable<string> {
    this.error$$.next(null);
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
          switch (friendId) {
            case '': {
              return this.handleError('No User with that email was found');
            }
            case this.authService.user?.id: {
              return this.handleError('You cannot add yourself');
            }
          }
          return of(friendId);
        })
      );
  }

  private addUserIdToFriends(userId: string): Observable<BackendFriendData> {
    const friendsEntryInDb: BackendFriendData = {};
    friendsEntryInDb[`${userId}`] = true;

    if (!Boolean(this.friendsOfUser)) {
      return this.httpClient.patch<BackendFriendData>(
        `${FIREBASE_DB_USERS_URL}${this.authService.user?.id}/friends.json`,
        friendsEntryInDb
      );
    }

    let isAlreadyInFriendList = false;
    for (const [key, value] of Object.entries(this.friendsOfUser!)) {
      if (key === userId) {
        isAlreadyInFriendList = true;
        if (value) {
          return this.handleError('The user is already your friend');
        } else {
          return this.handleError(
            'Friend request is pending. The user can accept your friendship when they come online'
          );
        }
      }
    }
    if (isAlreadyInFriendList) {
      return EMPTY;
    }

    return this.httpClient.put<BackendFriendData>(
      `${FIREBASE_DB_USERS_URL}${this.authService.user?.id}/friends.json`,
      friendsEntryInDb
    );
  }

  private addUserAlsoToFriendsFriends(
    friendsId: string
  ): Observable<BackendFriendData> {
    const userEntryInDb: BackendFriendData = {};
    userEntryInDb[`${this.authService.user?.id}`] = true;

    return this.httpClient
      .get<BackendFriendData | null>(
        `${FIREBASE_DB_USERS_URL}/users/${friendsId}/friends.json`
      )
      .pipe(
        switchMap((friendsObject: BackendFriendData | null) => {
          if (Boolean(friendsObject)) {
            return this.httpClient.put<BackendFriendData>(
              `${FIREBASE_DB_USERS_URL}${friendsId}/friends.json`,
              userEntryInDb
            );
          } else {
            return this.httpClient.patch<BackendFriendData>(
              `${FIREBASE_DB_USERS_URL}${friendsId}/friends.json`,
              userEntryInDb
            );
          }
        })
      );
  }

  private handleError(errorMsg: string): Observable<never> {
    this.error$$.next(errorMsg);
    return throwError(errorMsg);
  }
}
