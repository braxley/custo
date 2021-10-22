import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../core/services/auth.service';
import { AuthResponseData } from '../shared/interfaces/auth-response-interface';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  wasSubmitted = false;
  hasError = false;
  errorMsg = 'CustoErrorAuth002';

  constructor(private authService: AuthService, private router: Router) {}

  switchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    this.wasSubmitted = true;
    const email = form.value.email;
    const password = form.value.password;

    let auth$: Observable<AuthResponseData>;
    auth$ = this.isLoginMode
      ? this.authService.login(email, password)
      : this.authService.signUp(email, password);

    auth$.subscribe(
      () => {
        this.isLoading = false;
        this.hasError = false;
        this.router.navigate(['/my-movies']);
      },
      (errorResponse) => {
        this.isLoading = false;
        this.hasError = true;
        this.errorMsg = errorResponse;
      }
    );
  }
}
