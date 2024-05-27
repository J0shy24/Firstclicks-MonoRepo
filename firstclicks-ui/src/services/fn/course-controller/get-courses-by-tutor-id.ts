/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CoursePublicDto } from '../../models/course-public-dto';

export interface GetCoursesByTutorId$Params {
  tutorId: number;
}

export function getCoursesByTutorId(http: HttpClient, rootUrl: string, params: GetCoursesByTutorId$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CoursePublicDto>>> {
  const rb = new RequestBuilder(rootUrl, getCoursesByTutorId.PATH, 'get');
  if (params) {
    rb.path('tutorId', params.tutorId, {});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<CoursePublicDto>>;
    })
  );
}

getCoursesByTutorId.PATH = '/courses/tutor/{tutorId}';
