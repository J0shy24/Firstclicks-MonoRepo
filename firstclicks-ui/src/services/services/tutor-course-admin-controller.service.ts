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
import { create } from '../fn/tutor-course-admin-controller/create';
import { Create$Params } from '../fn/tutor-course-admin-controller/create';
import { delete$ } from '../fn/tutor-course-admin-controller/delete';
import { Delete$Params } from '../fn/tutor-course-admin-controller/delete';
import { get } from '../fn/tutor-course-admin-controller/get';
import { Get$Params } from '../fn/tutor-course-admin-controller/get';
import { list } from '../fn/tutor-course-admin-controller/list';
import { List$Params } from '../fn/tutor-course-admin-controller/list';
import { PageCoursePublicDto } from '../models/page-course-public-dto';
import { paginate } from '../fn/tutor-course-admin-controller/paginate';
import { Paginate$Params } from '../fn/tutor-course-admin-controller/paginate';
import { update } from '../fn/tutor-course-admin-controller/update';
import { Update$Params } from '../fn/tutor-course-admin-controller/update';

@Injectable({ providedIn: 'root' })
export class TutorCourseAdminControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `get()` */
  static readonly GetPath = '/tutor/courses/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `get()` instead.
   *
   * This method doesn't expect any request body.
   */
  get$Response(params: Get$Params, context?: HttpContext): Observable<StrictHttpResponse<CoursePublicDto>> {
    return get(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `get$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  get(params: Get$Params, context?: HttpContext): Observable<CoursePublicDto> {
    return this.get$Response(params, context).pipe(
      map((r: StrictHttpResponse<CoursePublicDto>): CoursePublicDto => r.body)
    );
  }

  /** Path part for operation `update()` */
  static readonly UpdatePath = '/tutor/courses/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update$Response(params: Update$Params, context?: HttpContext): Observable<StrictHttpResponse<CoursePublicDto>> {
    return update(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `update$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update(params: Update$Params, context?: HttpContext): Observable<CoursePublicDto> {
    return this.update$Response(params, context).pipe(
      map((r: StrictHttpResponse<CoursePublicDto>): CoursePublicDto => r.body)
    );
  }

  /** Path part for operation `delete()` */
  static readonly DeletePath = '/tutor/courses/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete$Response(params: Delete$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return delete$(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `delete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete(params: Delete$Params, context?: HttpContext): Observable<void> {
    return this.delete$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `paginate()` */
  static readonly PaginatePath = '/tutor/courses';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `paginate()` instead.
   *
   * This method doesn't expect any request body.
   */
  paginate$Response(params: Paginate$Params, context?: HttpContext): Observable<StrictHttpResponse<PageCoursePublicDto>> {
    return paginate(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `paginate$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  paginate(params: Paginate$Params, context?: HttpContext): Observable<PageCoursePublicDto> {
    return this.paginate$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageCoursePublicDto>): PageCoursePublicDto => r.body)
    );
  }

  /** Path part for operation `create()` */
  static readonly CreatePath = '/tutor/courses';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create$Response(params: Create$Params, context?: HttpContext): Observable<StrictHttpResponse<CoursePublicDto>> {
    return create(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `create$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create(params: Create$Params, context?: HttpContext): Observable<CoursePublicDto> {
    return this.create$Response(params, context).pipe(
      map((r: StrictHttpResponse<CoursePublicDto>): CoursePublicDto => r.body)
    );
  }

  /** Path part for operation `list()` */
  static readonly ListPath = '/tutor/courses/list';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `list()` instead.
   *
   * This method doesn't expect any request body.
   */
  list$Response(params?: List$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CoursePublicDto>>> {
    return list(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `list$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  list(params?: List$Params, context?: HttpContext): Observable<Array<CoursePublicDto>> {
    return this.list$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<CoursePublicDto>>): Array<CoursePublicDto> => r.body)
    );
  }

}
