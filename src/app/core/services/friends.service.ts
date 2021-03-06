import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  EMPTY,
  forkJoin,
  Observable,
  of,
  throwError,
} from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import {
  FIREBASE_DB_URL,
  FIREBASE_DB_USER_DATA_URL,
} from 'src/app/shared/constants';
import {
  CustoMovie,
  FriendDataWithCommonMoviesVM,
  UserIdWithMovies,
} from 'src/app/shared/interfaces/custo-movie.interfaces';
import {
  BackendFriendData,
  BackendUserData,
  FriendData,
} from 'src/app/shared/interfaces/firebase-backend.interface';
import { AuthService } from './auth.service';
import { UserMoviesService } from './user-movies.service';

@Injectable({
  providedIn: 'root',
})
export class FriendsService {
  private friendsOfUser$$ = new BehaviorSubject<BackendFriendData | null>(null);
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
    this.loadFriends$().subscribe();
  }

  loadFriends$(): Observable<BackendFriendData | null> {
    if (!this.authService.user) {
      return of(null);
    }

    this.isLoading$$.next(true);

    return this.httpClient
      .get<BackendFriendData | null>(
        `${FIREBASE_DB_USER_DATA_URL}/${this.authService.user?.id}/friends.json`
      )
      .pipe(
        tap((friendData) => {
          this.isLoading$$.next(false);
          this.friendsOfUser$$.next(friendData);
        })
      );
  }

  addFriendInDb(email: string): Observable<BackendFriendData> {
    this.isLoading$$.next(true);
    return this.getFriendDataFromEmail(email).pipe(
      switchMap(([friendId, friendName]) => {
        return this.addFriendIdToFriends(friendId, friendName);
      }),
      tap((backendFriendData: BackendFriendData) => {
        this.isLoading$$.next(false);
        const friendsOfUser = this.friendsOfUser || {};
        const friendId = Object.keys(backendFriendData)[0];
        friendsOfUser[`${friendId}`] = {
          hasAccepted: true,
          displayName: backendFriendData[friendId].displayName,
        };
        this.friendsOfUser$$.next(friendsOfUser);
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
          this.findCommonMoviesWithSelectedFriends();
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
      this.findCommonMoviesWithSelectedFriends();
    }
  }

  removeFriend(friendId: string) {
    const userId = this.authService.user?.id;
    forkJoin([
      this.httpClient.delete<BackendFriendData>(
        `${FIREBASE_DB_USER_DATA_URL}/${userId}/friends/${friendId}.json`
      ),
      this.httpClient.delete<BackendFriendData>(
        `${FIREBASE_DB_USER_DATA_URL}/${friendId}/friends/${userId}.json`
      ),
    ]).subscribe(() => {
      delete this.friendsOfUser![friendId];
    });
  }

  onLogout() {
    this.friendsOfUser$$.next(null);
  }

  findCommonMoviesWithFriend(
    friendId: string
  ): Observable<FriendDataWithCommonMoviesVM> {
    return this.userMoviesService.fetchMoviesByUserId(friendId).pipe(
      map((moviesOfFriend: CustoMovie[]) => {
        const commonMovies: CustoMovie[] = [];
        const myMovies = this.userMoviesService.myMovies;
        myMovies!.forEach((myMovie: CustoMovie) => {
          const isMovieInBothArrays = moviesOfFriend?.some(
            (movieOfFriend: CustoMovie) =>
              movieOfFriend.custoId === myMovie.custoId
          );
          if (isMovieInBothArrays) {
            commonMovies.push(myMovie);
          }
        });
        const friendData: FriendData = this.friendsOfUser$$.value![friendId];
        return {
          friendData,
          friendId,
          commonMovies,
        } as FriendDataWithCommonMoviesVM;
      })
    );
  }

  private findCommonMoviesWithSelectedFriends(): void {
    this.isLoading$$.next(true);
    let moviesToCompareWith = this.filteredCommonMovies;
    if (!Boolean(moviesToCompareWith)) {
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
      const moviesOfFriend = userIdWithMovies.movies;
      moviesToCompareWith!.forEach((movieToCompareWith: CustoMovie) => {
        const isMovieInBothArrays = moviesOfFriend?.some(
          (movieOfFriend: CustoMovie) =>
            movieOfFriend.custoId === movieToCompareWith.custoId
        );
        if (isMovieInBothArrays) {
          commonMovies.push(movieToCompareWith);
        }
      });
      userIdWithMovies.isAlreadyInComparison = true;
    }

    this.isLoading$$.next(false);
    this.filteredCommonMovies$$.next(commonMovies);
  }

  private getFriendDataFromEmail(email: string): Observable<string[]> {
    this.error$$.next(null);
    return this.httpClient
      .get<BackendUserData>(FIREBASE_DB_URL + '/user_data.json')
      .pipe(
        switchMap((backendUserData: BackendUserData) => {
          let friendId = '';
          let friendName = '';
          for (const [key, value] of Object.entries(backendUserData)) {
            if (value.email === email) {
              friendId = key;
              friendName = value.displayName;
            }
          }
          switch (friendId) {
            case '': {
              return this.handleError('No user with that email was found');
            }
            case this.authService.user?.id: {
              return this.handleError('You cannot add yourself');
            }
          }
          return of([friendId, friendName]);
        })
      );
  }

  private addFriendIdToFriends(
    userIdOfFriend: string,
    displayNameOfFriend: string
  ): Observable<BackendFriendData> {
    const friendsEntryInDb: BackendFriendData = {};
    friendsEntryInDb[`${userIdOfFriend}`] = {
      hasAccepted: true,
      displayName: displayNameOfFriend,
    };

    if (!Boolean(this.friendsOfUser)) {
      return this.httpClient.patch<BackendFriendData>(
        `${FIREBASE_DB_USER_DATA_URL}/${this.authService.user?.id}/friends.json`,
        friendsEntryInDb
      );
    }

    let isAlreadyInFriendList = false;
    for (const [key, value] of Object.entries(this.friendsOfUser!)) {
      if (key === userIdOfFriend) {
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
      `${FIREBASE_DB_USER_DATA_URL}/${this.authService.user?.id}/friends.json`,
      friendsEntryInDb
    );
  }

  private addUserAlsoToFriendsFriends(
    friendsId: string
  ): Observable<BackendFriendData> {
    const userEntryInDb: BackendFriendData = {};

    userEntryInDb[`${this.authService.user?.id}`] = {
      hasAccepted: true,
      displayName: this.authService.user?.displayName!,
    };

    return this.httpClient
      .get<BackendFriendData | null>(
        `${FIREBASE_DB_USER_DATA_URL}/${friendsId}/friends.json`
      )
      .pipe(
        switchMap((friendsObject: BackendFriendData | null) => {
          if (Boolean(friendsObject)) {
            return this.httpClient.put<BackendFriendData>(
              `${FIREBASE_DB_USER_DATA_URL}/${friendsId}/friends.json`,
              userEntryInDb
            );
          } else {
            return this.httpClient.patch<BackendFriendData>(
              `${FIREBASE_DB_USER_DATA_URL}/${friendsId}/friends.json`,
              userEntryInDb
            );
          }
        })
      );
  }

  private handleError(errorMsg: string): Observable<never> {
    this.error$$.next(errorMsg);
    this.isLoading$$.next(false);
    return throwError(errorMsg);
  }
}
