/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { TutorPrivateProfileDto } from '../../models/tutor-private-profile-dto';

export interface GetTutorProfile$Params {
}

export function getTutorProfile(http: HttpClient, rootUrl: string, params?: GetTutorProfile$Params, context?: HttpContext): Observable<StrictHttpResponse<TutorPrivateProfileDto>> {
  const rb = new RequestBuilder(rootUrl, getTutorProfile.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<TutorPrivateProfileDto>;
    })
  );
}

getTutorProfile.PATH = '/tutor/profile';
