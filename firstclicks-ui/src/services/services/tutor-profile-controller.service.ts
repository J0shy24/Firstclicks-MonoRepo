/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { getTutorProfile } from '../fn/tutor-profile-controller/get-tutor-profile';
import { GetTutorProfile$Params } from '../fn/tutor-profile-controller/get-tutor-profile';
import { TutorPrivateProfileDto } from '../models/tutor-private-profile-dto';

@Injectable({ providedIn: 'root' })
export class TutorProfileControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getTutorProfile()` */
  static readonly GetTutorProfilePath = '/tutor/profile';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTutorProfile()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTutorProfile$Response(params?: GetTutorProfile$Params, context?: HttpContext): Observable<StrictHttpResponse<TutorPrivateProfileDto>> {
    return getTutorProfile(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getTutorProfile$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTutorProfile(params?: GetTutorProfile$Params, context?: HttpContext): Observable<TutorPrivateProfileDto> {
    return this.getTutorProfile$Response(params, context).pipe(
      map((r: StrictHttpResponse<TutorPrivateProfileDto>): TutorPrivateProfileDto => r.body)
    );
  }

}
