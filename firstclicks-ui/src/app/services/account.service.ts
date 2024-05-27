import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { SignupRequest } from '../interfaces/account.interface';
import { environment } from '../../environments/environment.development';
import { Profile } from '../interfaces/auth.interface';
import { RequestUserClientDto, UserProfileDto } from '../../services/models';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private http = inject(HttpClient);

  constructor() {}

  signup(signupRequest: RequestUserClientDto) {
    return this.http.post<UserProfileDto>(
      `${environment.apiBase}/auth/register`,
      signupRequest
    );
  }
}
