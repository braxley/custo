import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { exhaustMap, take } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return this.authService.user$.pipe(
      take(1),
      exhaustMap((user: User | null) => {
        if (user) {
          const modifiedRequest = request.clone({
            params: new HttpParams().set('auth', user.idToken!),
          });
          return next.handle(modifiedRequest);
        }
        return next.handle(request);
      })
    );
  }
}
