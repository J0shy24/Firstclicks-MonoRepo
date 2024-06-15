import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  StudentPrivateProfileDto,
  TutorPrivateProfileDto,
  TutorProfilePublic,
} from '../../services/models';
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

  getProfileStudent() {
    return this.http.get<StudentPrivateProfileDto>(
      `${environment.apiBase}/student/profile`
    );
  }

  getTutorPublicProfile(id: number) {
    return this.http.get<TutorProfilePublic>(
      `${environment.apiBase}/profile/${id}`
    );
  }

  putTutorPublicProfile(tutor: TutorProfilePublic) {
    return this.http.put<TutorProfilePublic>(
      `${environment.apiBase}/tutor/profile`,
      tutor
    );
  }
}
