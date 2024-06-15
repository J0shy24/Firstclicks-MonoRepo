/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { getPublicTutorProfile } from '../fn/public-controller-profile/get-public-tutor-profile';
import { GetPublicTutorProfile$Params } from '../fn/public-controller-profile/get-public-tutor-profile';
import { TutorProfilePublic } from '../models/tutor-profile-public';

@Injectable({ providedIn: 'root' })
export class PublicControllerProfileService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getPublicTutorProfile()` */
  static readonly GetPublicTutorProfilePath = '/profile/{tutorId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPublicTutorProfile()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPublicTutorProfile$Response(params: GetPublicTutorProfile$Params, context?: HttpContext): Observable<StrictHttpResponse<TutorProfilePublic>> {
    return getPublicTutorProfile(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getPublicTutorProfile$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPublicTutorProfile(params: GetPublicTutorProfile$Params, context?: HttpContext): Observable<TutorProfilePublic> {
    return this.getPublicTutorProfile$Response(params, context).pipe(
      map((r: StrictHttpResponse<TutorProfilePublic>): TutorProfilePublic => r.body)
    );
  }

}
