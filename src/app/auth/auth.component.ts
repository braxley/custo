import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../core/services/auth.service';
import { AuthResponseData } from '../shared/interfaces/firebase-backend.interface';

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
  nameError: string | undefined;
  emailError: string | undefined;
  passwordError: string | undefined;

  constructor(private authService: AuthService, private router: Router) {}

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
    const displayName = form.value.displayName;

    let auth$: Observable<AuthResponseData>;
    auth$ = this.isLoginMode
      ? this.authService.login(email, password)
      : this.authService.signUp(displayName, email, password);

    auth$.subscribe(
      () => {
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
    this.nameError = undefined;
    this.emailError = undefined;
    this.passwordError = undefined;
    this.hasError = true;
    const displayNameForm = form.controls.displayName;
    const emailForm = form.controls.email;
    const passwordForm = form.controls.password;
    if (emailForm.status === 'INVALID') {
      if (emailForm.value.length === 0) {
        this.emailError = 'Please enter your email address.';
      } else {
        this.emailError = 'Please enter a valid email address.';
      }
    }
    if (passwordForm.status === 'INVALID') {
      this.passwordError = 'The password must be at least 6 characters long.';
    }
    if (displayNameForm.status === 'INVALID') {
      this.nameError =
        'Please enter a name to register. This name is used for your friends to recognize you.';
    }
  }
}
