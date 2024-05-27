/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { TutorProfilePublic } from '../../models/tutor-profile-public';

export interface GetRandomTutors$Params {
  tutorId: number;
}

export function getRandomTutors(http: HttpClient, rootUrl: string, params: GetRandomTutors$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<TutorProfilePublic>>> {
  const rb = new RequestBuilder(rootUrl, getRandomTutors.PATH, 'get');
  if (params) {
    rb.path('tutorId', params.tutorId, {});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<TutorProfilePublic>>;
    })
  );
}

getRandomTutors.PATH = '/courses/tutor/rand/{tutorId}';
