import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from "../../environments/environment";

@Injectable({providedIn: 'root'})
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private userId: string;
  private tokenTimer: any;
  private role: string;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }
  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getRole() {
    return this.role;
  }

  getUserId() {
    return this.userId;
  }

  createUser(email: string, password: string, mobile:string, name:string,) {
    // tslint:disable-next-line: object-literal-shorthand
    const authData: AuthData = { email: email, password: password, mobile: mobile, name: name };
    this.http.post(environment.apiUrl + '/signup', authData).
    subscribe(() => {
      this.router.navigate(['/login']);
    }, error => {
      this.authStatusListener.next(false);
    });
  }

  login(email: string, password: string) {
    
    this.http.post<{token: string, expiresIn: number, userId: string, role:string}>(environment.apiUrl + '/login', {email: email, password: password})
    .subscribe(response => {
      this.token = response.token;
      console.log('loged in');
      if (this.token) {
        const expioresInDuration = response.expiresIn;
        this.getAuthTimer(expioresInDuration);
        this.authStatusListener.next(true);
        this.isAuthenticated = true;
        this.userId = response.userId;
        const now = new Date();
        this.role = response.role;
        const expirationDate = new Date(now.getTime() + expioresInDuration * 1000);
        console.log(expirationDate);
        this.saveAuthData(this.token, expirationDate, this.userId);
        this.router.navigate(['/']);
      }
    }, error => {
      this.authStatusListener.next(false);
    });
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now =  new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.getAuthTimer(expiresIn / 1000);
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.authStatusListener.next(true);
    }
  }

  getAuthTimer(duration: number) {
    console.log('Setting Timer' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }


  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.cleatAuthData();
    this.userId = null;
    this.router.navigate(['/']);
  }
  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }

  private cleatAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    if (!token || !expirationDate) {
      return;
    }
    return {
      // tslint:disable-next-line: object-literal-shorthand
      token: token,
      expirationDate: new Date(expirationDate),
      // tslint:disable-next-line: object-literal-shorthand
      userId: userId
    };
  }
}