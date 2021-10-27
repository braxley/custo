import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user.model';
import {
  FIREBASE_AUTH_SIGNUP_URL,
  FIREBASE_AUTH_LOGIN_URL,
} from 'src/app/shared/constants';
import { AuthResponseData } from 'src/app/shared/interfaces/auth-response-interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user$$ = new BehaviorSubject<User | null>(null);
  get user$() {
    return this.user$$.asObservable();
  }

  private tokenExpirationTimer: any;

  constructor(private httpClient: HttpClient, private router: Router) {}

  signUp(email: string, password: string): Observable<any> {
    return this.httpClient
      .post<AuthResponseData>(
        FIREBASE_AUTH_SIGNUP_URL + environment.API_KEY_FIREBASE,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        // we have to ".bind(this)" as we omit the es6 arrow function
        tap(this.handleAuthentication.bind(this))
      );
  }

  login(email: string, password: string): Observable<AuthResponseData> {
    return this.httpClient
      .post<AuthResponseData>(
        FIREBASE_AUTH_LOGIN_URL + environment.API_KEY_FIREBASE,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        // we have to ".bind(this)" as we omit the es6 arrow function
        tap(this.handleAuthentication.bind(this))
      );
  }

  autoLogin() {
    const userInStorage = localStorage.getItem('userData');
    if (!userInStorage) {
      return;
    }

    const userData: {
      email: string;
      id: string;
      _idToken: string;
      _tokenExpirationDate: string;
    } = JSON.parse(userInStorage);

    const tokenExpirationDate = new Date(userData._tokenExpirationDate);

    const user = new User(
      userData.email,
      userData.id,
      userData._idToken,
      tokenExpirationDate
    );

    user.idToken ? this.user$$.next(user) : this.user$$.next(null);

    const tokenExpirationDuration =
      tokenExpirationDate.getTime() - new Date().getTime();
    this.autoLogout(tokenExpirationDuration);
  }

  logout() {
    this.user$$.next(null);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = undefined;
    }
    this.router.navigate(['']);
  }

  autoLogout(tokenExpirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, tokenExpirationDuration);
  }

  private handleAuthentication(authResponseData: AuthResponseData) {
    const timeUntilTokenExpires = +authResponseData.expiresIn * 1000;
    const dateOfTokenExpiration = new Date(
      new Date().getTime() + timeUntilTokenExpires
    );

    const user = new User(
      authResponseData.email,
      authResponseData.localId,
      authResponseData.idToken,
      dateOfTokenExpiration
    );

    localStorage.setItem('userData', JSON.stringify(user));
    this.autoLogout(timeUntilTokenExpires);
    this.user$$.next(user);
  }

  private handleError(errorResponse: HttpErrorResponse): Observable<never> {
    console.dir(errorResponse.error.error.message);
    let errorMsg = 'CustoErrorAuth001';

    if (errorResponse.error?.error?.message) {
      switch (errorResponse.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMsg =
            'The email address you used is already registered with us. If you want to log in, please use the "Switch to Login" button.';
          break;
        case 'EMAIL_NOT_FOUND':
          errorMsg =
            'The provided email is not in our database. If you want to sign up, please use the "Switch to SignUp" button.';
          console.log(errorMsg);
          break;
        case 'INVALID_PASSWORD':
          errorMsg =
            'The password you have entered is not correct, please try again.';
          break;
      }
    }
    return throwError(errorMsg);
  }
}
