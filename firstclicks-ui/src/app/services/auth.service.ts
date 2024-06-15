import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { AuthRequest, AuthResponse } from '../interfaces/auth.interface';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';
import {
  AuthenticationRequestDto,
  AuthenticationResponse,
} from '../../services/models';
import { routes } from '../app.routes';
import { Router } from '@angular/router';

const authKey = 'firstClicks_auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private _auth = signal<AuthenticationResponse | null>(null);
  private router = inject(Router);

  auth = computed(() => this._auth());

  constructor() {
    const authString = localStorage.getItem(authKey);

    if (authString) {
      this._auth.set(JSON.parse(authString));
    }
  }

  login(authRequest: AuthenticationRequestDto) {
    return this.http
      .post<AuthenticationResponse>(
        `${environment.apiBase}/auth/authenticate`,
        authRequest
      )
      .pipe(
        map((response) => {
          localStorage.setItem(authKey, JSON.stringify(response));
          this._auth.set(response);
          return response.user;
        })
      );
  }

  logout() {
    localStorage.removeItem(authKey);
    this._auth.set(null);
    this.router.navigate(['']);
  }
}
