import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, of, throwError } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import {
  FIREBASE_DB_URL,
  FIREBASE_DB_USERS_URL,
} from 'src/app/shared/constants';
import {
  CustoMovie,
  UserIdWithMovies,
} from 'src/app/shared/interfaces/custo-medium.interfaces';
import {
  BackendFriendData,
  BackendUserData,
} from 'src/app/shared/interfaces/firebase-backend.interface';
import { AuthService } from './auth.service';
import { UserMoviesService } from './user-movies.service';

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

  private allMoviesOfSelectedFriends: UserIdWithMovies[] = [];

  private filteredCommonMovies$$ = new BehaviorSubject<CustoMovie[] | null>(
    null
  );
  get filteredCommonMovies$() {
    return this.filteredCommonMovies$$.asObservable();
  }
  get filteredCommonMovies() {
    return this.filteredCommonMovies$$.value;
  }

  private isLoading$$ = new BehaviorSubject<boolean>(false);
  get isLoading$() {
    return this.isLoading$$.asObservable();
  }

  private error$$ = new BehaviorSubject<string | null>(null);
  get error$(): Observable<string | null> {
    return this.error$$.asObservable();
  }

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private userMoviesService: UserMoviesService
  ) {
    this.loadFriends();
  }

  loadFriends(): void {
    this.isLoading$$.next(true);

    this.httpClient
      .get<BackendFriendData>(
        `${FIREBASE_DB_URL}users/${this.authService.user?.id}/friends.json`
      )
      .pipe(
        tap((friendData) => {
          this.isLoading$$.next(false);
          this.friendsOfUser$$.next(friendData);
        })
      )
      .subscribe();
  }

  addFriendInDb(email: string): Observable<BackendFriendData> {
    this.isLoading$$.next(true);
    return this.getFriendsIdFromEmail(email).pipe(
      switchMap(this.addUserIdToFriends.bind(this)),
      tap((friendData: BackendFriendData) => {
        this.isLoading$$.next(false);
        const friends = this.friendsOfUser || {};
        const friendId = Object.keys(friendData)[0];
        friends[`${friendId}`] = true;
        this.friendsOfUser$$.next(friends);
      }),
      switchMap((backendFriendData: BackendFriendData) => {
        let friendId = Object.keys(backendFriendData)[0];
        return this.addUserAlsoToFriendsFriends(friendId);
      })
    );
  }

  addFriendToComparison(friendId: string): void {
    this.userMoviesService
      .fetchMoviesByUserId(friendId)
      .pipe(
        tap((moviesOfFriend: CustoMovie[]) => {
          this.allMoviesOfSelectedFriends.push({
            userId: friendId,
            movies: moviesOfFriend,
            isAlreadyInComparison: false,
          });
          this.findCommonMovies();
        })
      )
      .subscribe();
  }

  removeFriendFromComparison(friendIdToRemove: string): void {
    this.allMoviesOfSelectedFriends.forEach(
      (userIdWithMovies: UserIdWithMovies, index: number) => {
        if (userIdWithMovies.userId === friendIdToRemove) {
          this.allMoviesOfSelectedFriends.splice(index, 1);
        } else {
          userIdWithMovies.isAlreadyInComparison = false;
        }
      }
    );
    this.filteredCommonMovies$$.next(null);
    if (this.allMoviesOfSelectedFriends.length !== 0) {
      this.findCommonMovies();
    }
  }

  private findCommonMovies() {
    this.isLoading$$.next(true);
    let moviesToCompareWith = this.filteredCommonMovies;
    if (!Boolean(moviesToCompareWith) || moviesToCompareWith?.length === 0) {
      moviesToCompareWith = this.userMoviesService.myMovies;
    }
    if (!Boolean(moviesToCompareWith) || moviesToCompareWith?.length === 0) {
      this.filteredCommonMovies$$.next([]);
      this.isLoading$$.next(false);
      return;
    }

    let commonMovies: CustoMovie[] = [];
    for (let userIdWithMovies of this.allMoviesOfSelectedFriends) {
      if (userIdWithMovies.isAlreadyInComparison) {
        continue;
      }
      const moviesOfFriend: CustoMovie[] = userIdWithMovies.movies;
      moviesToCompareWith!.forEach(
        (movieToCompareWith: CustoMovie, index: number) => {
          const isMovieInArray = moviesOfFriend.some(
            (movieOfFriend: CustoMovie) =>
              movieOfFriend.imdbId === movieToCompareWith.imdbId
          );
          if (isMovieInArray) {
            commonMovies.push(movieToCompareWith);
            moviesToCompareWith!.splice(index, 1);
          }
        }
      );
      userIdWithMovies.isAlreadyInComparison = true;
    }

    this.isLoading$$.next(false);
    this.filteredCommonMovies$$.next(commonMovies);
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

    return this.httpClient.patch<BackendFriendData>(
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
