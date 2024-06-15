import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CoursePublicDto, StudentCourseDto } from '../../services/models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private http = inject(HttpClient);

  getListCourses() {
    return this.http.get<StudentCourseDto[]>(
      `${environment.apiBase}/student/courses/list`
    );
  }

  getIdsCourse() {
    return this.http.get<number[]>(
      `${environment.apiBase}/student/profile/idCourses`
    );
  }

  getStudentCourseById(id: number) {
    return this.http.get<StudentCourseDto>(
      `${environment.apiBase}/student/courses/${id}`
    );
  }
}
