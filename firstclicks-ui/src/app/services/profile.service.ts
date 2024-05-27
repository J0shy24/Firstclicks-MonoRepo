import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { TutorPrivateProfileDto } from '../../services/models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private http = inject(HttpClient);

  getProfileTutor() {
    return this.http.get<TutorPrivateProfileDto>(
      `${environment.apiBase}/tutor/profile`
    );
  }
}
