/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CoursePublicDto } from '../../models/course-public-dto';

export interface GetCourse$Params {
  courseId: number;
}

export function getCourse(http: HttpClient, rootUrl: string, params: GetCourse$Params, context?: HttpContext): Observable<StrictHttpResponse<CoursePublicDto>> {
  const rb = new RequestBuilder(rootUrl, getCourse.PATH, 'get');
  if (params) {
    rb.path('courseId', params.courseId, {});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<CoursePublicDto>;
    })
  );
}

getCourse.PATH = '/courses/{courseId}';
