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
    // TODO stf this is a hotfix, in a future user story this will be removed
    this.userMoviesService.fetchCurrentUserMovies().subscribe();
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
          });
          this.findCommonMovies();
        })
      )
      .subscribe();
  }

  removeFriendFromComparison(friendId: string): void {}

  findCommonMovies() {
    // TODO stf I compare the friends movies with themselves. change that
    this.isLoading$$.next(true);
    let moviesToCompareWith = this.filteredCommonMovies;
    if (!Boolean(moviesToCompareWith)) {
      moviesToCompareWith = this.userMoviesService.myMovies;
    }
    if (moviesToCompareWith?.length === 0 || !Boolean(moviesToCompareWith)) {
      this.filteredCommonMovies$$.next([]);
      this.isLoading$$.next(false);
      return;
    }

    let commonMovies: CustoMovie[] = [];
    for (let userIdWithMovies of this.allMoviesOfSelectedFriends) {
      const moviesOfFriend: CustoMovie[] = userIdWithMovies.movies;

      // TODO stf try with "includes"
      for (let movieOfFriend of moviesOfFriend) {
        for (let movieToCompareWith of moviesToCompareWith!) {
          if (movieOfFriend.imdbId === movieToCompareWith.imdbId) {
            // TODO stf add index to iteration of moviesToCompareWith
            // to remove that movie from the array
            commonMovies.push(movieOfFriend);
            break;
          }
        }
      }
    }

    this.isLoading$$.next(false);

    this.filteredCommonMovies$$.next(commonMovies);
  }

  oldFindCommonMovies(
    userIdOfFriend: string,
    moviesToCompare?: CustoMovie[]
  ): Observable<CustoMovie[]> {
    // if (!Boolean(moviesToCompare)) {
    //   moviesToCompare = this.userMoviesService.myMovies;
    // }
    if (!Boolean(moviesToCompare) || moviesToCompare?.length === 0) {
      return of([]);
    }
    this.isLoading$$.next(true);
    return this.userMoviesService.fetchMoviesByUserId(userIdOfFriend).pipe(
      map((moviesOfFriend: CustoMovie[]) => {
        let commonMovies: CustoMovie[];
        if (!Boolean(moviesOfFriend) || moviesOfFriend?.length === 0) {
          return [];
        }
        // using the shorter array to minimize calculations
        if (moviesToCompare!.length < moviesOfFriend.length) {
          commonMovies = moviesToCompare!.filter((movieOfUser) =>
            moviesOfFriend.find(
              (movieOfFriend: CustoMovie) =>
                movieOfFriend.imdbId === movieOfUser.imdbId
            )
          );
        } else {
          commonMovies = moviesOfFriend.filter((movieOfFriend) =>
            moviesToCompare!.find(
              (movieOfUser: CustoMovie) =>
                movieOfUser.imdbId === movieOfFriend.imdbId
            )
          );
        }
        this.isLoading$$.next(false);
        return commonMovies;
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
