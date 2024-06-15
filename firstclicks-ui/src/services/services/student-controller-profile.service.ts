/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { getStudentProfile } from '../fn/student-controller-profile/get-student-profile';
import { GetStudentProfile$Params } from '../fn/student-controller-profile/get-student-profile';
import { idsEnrolledCourses } from '../fn/student-controller-profile/ids-enrolled-courses';
import { IdsEnrolledCourses$Params } from '../fn/student-controller-profile/ids-enrolled-courses';
import { StudentPrivateProfileDto } from '../models/student-private-profile-dto';

@Injectable({ providedIn: 'root' })
export class StudentControllerProfileService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getStudentProfile()` */
  static readonly GetStudentProfilePath = '/student/profile';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getStudentProfile()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStudentProfile$Response(params?: GetStudentProfile$Params, context?: HttpContext): Observable<StrictHttpResponse<StudentPrivateProfileDto>> {
    return getStudentProfile(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getStudentProfile$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStudentProfile(params?: GetStudentProfile$Params, context?: HttpContext): Observable<StudentPrivateProfileDto> {
    return this.getStudentProfile$Response(params, context).pipe(
      map((r: StrictHttpResponse<StudentPrivateProfileDto>): StudentPrivateProfileDto => r.body)
    );
  }

  /** Path part for operation `idsEnrolledCourses()` */
  static readonly IdsEnrolledCoursesPath = '/student/profile/idCourses';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `idsEnrolledCourses()` instead.
   *
   * This method doesn't expect any request body.
   */
  idsEnrolledCourses$Response(params?: IdsEnrolledCourses$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<number>>> {
    return idsEnrolledCourses(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `idsEnrolledCourses$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  idsEnrolledCourses(params?: IdsEnrolledCourses$Params, context?: HttpContext): Observable<Array<number>> {
    return this.idsEnrolledCourses$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<number>>): Array<number> => r.body)
    );
  }

}
