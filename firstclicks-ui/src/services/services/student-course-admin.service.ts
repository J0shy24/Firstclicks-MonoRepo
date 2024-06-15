/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { enroll } from '../fn/student-course-admin/enroll';
import { Enroll$Params } from '../fn/student-course-admin/enroll';
import { getStudentCourseById } from '../fn/student-course-admin/get-student-course-by-id';
import { GetStudentCourseById$Params } from '../fn/student-course-admin/get-student-course-by-id';
import { leave } from '../fn/student-course-admin/leave';
import { Leave$Params } from '../fn/student-course-admin/leave';
import { list1 } from '../fn/student-course-admin/list-1';
import { List1$Params } from '../fn/student-course-admin/list-1';
import { review } from '../fn/student-course-admin/review';
import { Review$Params } from '../fn/student-course-admin/review';
import { StudentCourseDto } from '../models/student-course-dto';

@Injectable({ providedIn: 'root' })
export class StudentCourseAdminService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getStudentCourseById()` */
  static readonly GetStudentCourseByIdPath = '/student/courses/{studentCourseId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getStudentCourseById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStudentCourseById$Response(params: GetStudentCourseById$Params, context?: HttpContext): Observable<StrictHttpResponse<StudentCourseDto>> {
    return getStudentCourseById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getStudentCourseById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStudentCourseById(params: GetStudentCourseById$Params, context?: HttpContext): Observable<StudentCourseDto> {
    return this.getStudentCourseById$Response(params, context).pipe(
      map((r: StrictHttpResponse<StudentCourseDto>): StudentCourseDto => r.body)
    );
  }

  /** Path part for operation `review()` */
  static readonly ReviewPath = '/student/courses/{studentCourseId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `review()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  review$Response(params: Review$Params, context?: HttpContext): Observable<StrictHttpResponse<StudentCourseDto>> {
    return review(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `review$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  review(params: Review$Params, context?: HttpContext): Observable<StudentCourseDto> {
    return this.review$Response(params, context).pipe(
      map((r: StrictHttpResponse<StudentCourseDto>): StudentCourseDto => r.body)
    );
  }

  /** Path part for operation `enroll()` */
  static readonly EnrollPath = '/student/courses/enroll/{courseId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `enroll()` instead.
   *
   * This method doesn't expect any request body.
   */
  enroll$Response(params: Enroll$Params, context?: HttpContext): Observable<StrictHttpResponse<StudentCourseDto>> {
    return enroll(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `enroll$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  enroll(params: Enroll$Params, context?: HttpContext): Observable<StudentCourseDto> {
    return this.enroll$Response(params, context).pipe(
      map((r: StrictHttpResponse<StudentCourseDto>): StudentCourseDto => r.body)
    );
  }

  /** Path part for operation `list1()` */
  static readonly List1Path = '/student/courses/list';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `list1()` instead.
   *
   * This method doesn't expect any request body.
   */
  list1$Response(params?: List1$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<StudentCourseDto>>> {
    return list1(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `list1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  list1(params?: List1$Params, context?: HttpContext): Observable<Array<StudentCourseDto>> {
    return this.list1$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<StudentCourseDto>>): Array<StudentCourseDto> => r.body)
    );
  }

  /** Path part for operation `leave()` */
  static readonly LeavePath = '/student/courses/leave/{courseId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `leave()` instead.
   *
   * This method doesn't expect any request body.
   */
  leave$Response(params: Leave$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return leave(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `leave$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  leave(params: Leave$Params, context?: HttpContext): Observable<void> {
    return this.leave$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
