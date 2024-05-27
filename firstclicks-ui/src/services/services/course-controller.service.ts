/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { CoursePublicDto } from '../models/course-public-dto';
import { getCourse } from '../fn/course-controller/get-course';
import { GetCourse$Params } from '../fn/course-controller/get-course';
import { getCoursesById } from '../fn/course-controller/get-courses-by-id';
import { GetCoursesById$Params } from '../fn/course-controller/get-courses-by-id';
import { getCoursesByTutorId } from '../fn/course-controller/get-courses-by-tutor-id';
import { GetCoursesByTutorId$Params } from '../fn/course-controller/get-courses-by-tutor-id';
import { getLast } from '../fn/course-controller/get-last';
import { GetLast$Params } from '../fn/course-controller/get-last';
import { getRandomTutors } from '../fn/course-controller/get-random-tutors';
import { GetRandomTutors$Params } from '../fn/course-controller/get-random-tutors';
import { PageCoursePublicDto } from '../models/page-course-public-dto';
import { paginate1 } from '../fn/course-controller/paginate-1';
import { Paginate1$Params } from '../fn/course-controller/paginate-1';
import { TutorProfilePublic } from '../models/tutor-profile-public';

@Injectable({ providedIn: 'root' })
export class CourseControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `paginate1()` */
  static readonly Paginate1Path = '/courses';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `paginate1()` instead.
   *
   * This method doesn't expect any request body.
   */
  paginate1$Response(params: Paginate1$Params, context?: HttpContext): Observable<StrictHttpResponse<PageCoursePublicDto>> {
    return paginate1(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `paginate1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  paginate1(params: Paginate1$Params, context?: HttpContext): Observable<PageCoursePublicDto> {
    return this.paginate1$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageCoursePublicDto>): PageCoursePublicDto => r.body)
    );
  }

  /** Path part for operation `getCourse()` */
  static readonly GetCoursePath = '/courses/{courseId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCourse()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCourse$Response(params: GetCourse$Params, context?: HttpContext): Observable<StrictHttpResponse<CoursePublicDto>> {
    return getCourse(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCourse$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCourse(params: GetCourse$Params, context?: HttpContext): Observable<CoursePublicDto> {
    return this.getCourse$Response(params, context).pipe(
      map((r: StrictHttpResponse<CoursePublicDto>): CoursePublicDto => r.body)
    );
  }

  /** Path part for operation `getCoursesByTutorId()` */
  static readonly GetCoursesByTutorIdPath = '/courses/tutor/{tutorId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCoursesByTutorId()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCoursesByTutorId$Response(params: GetCoursesByTutorId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CoursePublicDto>>> {
    return getCoursesByTutorId(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCoursesByTutorId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCoursesByTutorId(params: GetCoursesByTutorId$Params, context?: HttpContext): Observable<Array<CoursePublicDto>> {
    return this.getCoursesByTutorId$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<CoursePublicDto>>): Array<CoursePublicDto> => r.body)
    );
  }

  /** Path part for operation `getRandomTutors()` */
  static readonly GetRandomTutorsPath = '/courses/tutor/rand/{tutorId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getRandomTutors()` instead.
   *
   * This method doesn't expect any request body.
   */
  getRandomTutors$Response(params: GetRandomTutors$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<TutorProfilePublic>>> {
    return getRandomTutors(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getRandomTutors$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getRandomTutors(params: GetRandomTutors$Params, context?: HttpContext): Observable<Array<TutorProfilePublic>> {
    return this.getRandomTutors$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<TutorProfilePublic>>): Array<TutorProfilePublic> => r.body)
    );
  }

  /** Path part for operation `getCoursesById()` */
  static readonly GetCoursesByIdPath = '/courses/search';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCoursesById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCoursesById$Response(params: GetCoursesById$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CoursePublicDto>>> {
    return getCoursesById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCoursesById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCoursesById(params: GetCoursesById$Params, context?: HttpContext): Observable<Array<CoursePublicDto>> {
    return this.getCoursesById$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<CoursePublicDto>>): Array<CoursePublicDto> => r.body)
    );
  }

  /** Path part for operation `getLast()` */
  static readonly GetLastPath = '/courses/last';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getLast()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLast$Response(params?: GetLast$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CoursePublicDto>>> {
    return getLast(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getLast$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLast(params?: GetLast$Params, context?: HttpContext): Observable<Array<CoursePublicDto>> {
    return this.getLast$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<CoursePublicDto>>): Array<CoursePublicDto> => r.body)
    );
  }

}
