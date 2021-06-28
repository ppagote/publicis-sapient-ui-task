import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './auth/user.model';
import { Credit } from './creditCard/credit.model';

export interface AuthResponseData {
  id?: string;
  token?: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AppService {
  creditCardDetailsChanged = new Subject<Credit[]>();
  /* private creditCards: Credit[] = []; */
  domain = environment.url;

  constructor(private http: HttpClient) {}

  addData(input: Credit) {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post<Credit>(this.domain + environment.add_api, input, {
      headers: headers,
    });
  }

  listData() {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get<Credit[]>(this.domain + environment.list_api, {
      headers: headers,
    });
  }

  loginUser(username: string, password: string) {
    const headers = new HttpHeaders().append(
      'Content-Type',
      'application/json'
    );
    return this.http.post<AuthResponseData>(
      this.domain + environment.login_Api,
      { username, password },
      { headers: headers }
    );
  }

  registerUser(input: User) {
    const headers = new HttpHeaders().append(
      'Content-Type',
      'application/json'
    );
    return this.http.post<AuthResponseData>(
      this.domain + environment.register_api,
      input,
      { headers: headers }
    );
  }
}
