import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CoursePublicDto } from '../../services/models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TutorService {
  private http = inject(HttpClient);

  getListCourses() {
    return this.http.get<CoursePublicDto[]>(
      `${environment.apiBase}/tutor/courses/list`
    );
  }
}
