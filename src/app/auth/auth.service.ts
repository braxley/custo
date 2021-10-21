import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  FIREBASE_AUTH_LOGIN_URL,
  FIREBASE_AUTH_SIGNUP_URL,
} from '../shared/constants';
import { AuthResponseData } from '../shared/interfaces/auth-response-interface';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$$ = new BehaviorSubject<User | null>(null);

  constructor(private httpClient: HttpClient) {}

  signUp(email: string, password: string): Observable<any> {
    return this.httpClient.post<AuthResponseData>(
      FIREBASE_AUTH_SIGNUP_URL + environment.API_KEY_FIREBASE,
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    );
  }

  login(email: string, password: string): Observable<AuthResponseData> {
    return this.httpClient.post<AuthResponseData>(
      FIREBASE_AUTH_LOGIN_URL + environment.API_KEY_FIREBASE,
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    );
  }
}
