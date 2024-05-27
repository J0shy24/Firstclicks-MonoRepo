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

}
