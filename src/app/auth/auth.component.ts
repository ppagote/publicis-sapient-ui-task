import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService, AuthResponseData } from '../app.service';
import { User } from './user.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error = '';
  successResp = '';
  constructor(private _service: AppService, private router: Router) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    this.error = '';
    if (!form.valid) {
      return;
    }
    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    if (this.isLoginMode) {
      authObs = this._service.loginUser(
        form.value.username,
        form.value.password
      );
    } else {
      const temp: User = {
        username: form.value.username,
        password: form.value.password,
        firstName: form.value.firstName,
        lastName: form.value.lastName,
        email: form.value.email,
      };
      authObs = this._service.registerUser(temp);
    }

    authObs.subscribe(
      (resData: AuthResponseData) => {
        console.log(resData);
        if (!this.isLoginMode) {
          this.successResp = 'User registered successfully';
        } else {
          this.router.navigate(['/credit-card']);
          if (resData.token != undefined)
            localStorage.setItem('token', resData.token);
        }
        this.isLoading = false;
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.error = 'Error while logging.';
        this.isLoading = false;
      }
    );

    form.reset();
  }
}
