import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AuthService } from '../core/services/auth.service';
import { UserMoviesService } from '../core/services/user-movies.service';
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
  errorMsg: string | undefined;
  emailError: string | undefined;
  passwordError: string | undefined;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userMoviesService: UserMoviesService
  ) {}

  switchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    this.wasSubmitted = true;
    this.hasError = false;

    if (form.status === 'INVALID') {
      this.handleInvalidForm(form);
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    let auth$: Observable<AuthResponseData>;
    auth$ = this.isLoginMode
      ? this.authService.login(email, password)
      : this.authService.signUp(email, password);

    auth$.subscribe(
      () => {
        this.userMoviesService.fetchUserMovies();
        this.isLoading = false;
        this.hasError = false;
        this.router.navigate(['/search']);
      },
      (errorResponse) => {
        this.isLoading = false;
        this.hasError = true;
        this.errorMsg = errorResponse;
      }
    );
  }

  private handleInvalidForm(form: NgForm) {
    this.errorMsg = undefined;
    this.emailError = undefined;
    this.passwordError = undefined;
    this.hasError = true;
    const emailForm = form.controls.email;
    const passwordForm = form.controls.password;
    if (emailForm.status === 'INVALID') {
      if (emailForm.value.length === 0) {
        this.emailError = 'The Email is required';
      } else {
        this.emailError = 'Please enter a valid Email address.';
      }
    }
    if (passwordForm.status === 'INVALID') {
      this.passwordError = 'The password must be at least 6 characters long.';
    }
  }
}
