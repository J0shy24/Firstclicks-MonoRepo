import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  CoursePublicDto,
  PageCoursePublicDto,
  TutorProfilePublic,
} from '../../services/models';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private http = inject(HttpClient);

  private tech = new BehaviorSubject('');
  getTech = this.tech.asObservable();

  setTech(tech: string) {
    this.tech.next(tech);
  }

  getLastCourses() {
    return this.http.get<CoursePublicDto[]>(
      `${environment.apiBase}/courses/last`
    );
  }

  paginate(size: number = 6, page: number = 0, order: string = 'updatedDate') {
    let params = new HttpParams();
    params = params.append('size', size);
    params = params.append('page', page);
    if (order == 'updatedDate') {
      params = params.append('sort', `${order},DESC`);
    } else {
      params = params.append('sort', `${order},ASC`);
    }

    return this.http.get<PageCoursePublicDto>(
      `${environment.apiBase}/courses`,
      {
        params: params,
      }
    );
  }

  paginateByFilter(
    size: number = 6,
    page: number = 0,
    filter: string,
    search: string,
    order: string
  ) {
    let params = new HttpParams();
    params = params.append(filter, search);
    params = params.append('size', size);
    params = params.append('page', page);
    if (order == 'updatedDate') {
      params = params.append('sort', `${order},DESC`);
    } else {
      params = params.append('sort', `${order},ASC`);
    }

    return this.http.get<PageCoursePublicDto>(
      `${environment.apiBase}/courses/search`,
      {
        params: params,
      }
    );
  }

  getById(id: number) {
    return this.http.get<CoursePublicDto>(
      `${environment.apiBase}/courses/${id}`
    );
  }

  getRandomTutor(tutorId: number) {
    return this.http.get<TutorProfilePublic[]>(
      `${environment.apiBase}/courses/tutor/rand/${tutorId}`
    );
  }

  getCoursesByTutorId(tutorId: number) {
    return this.http.get<CoursePublicDto[]>(
      `${environment.apiBase}/courses/tutor/${tutorId}`
    );
  }

  getTutorPublicProfile(tutorId: number) {
    return this.http.get<TutorProfilePublic>(
      `${environment.apiBase}/profile/${tutorId}`
    );
  }
}
