/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CourseDto } from '../../models/course-dto';
import { CoursePublicDto } from '../../models/course-public-dto';

export interface Create$Params {
      body: CourseDto
}

export function create(http: HttpClient, rootUrl: string, params: Create$Params, context?: HttpContext): Observable<StrictHttpResponse<CoursePublicDto>> {
  const rb = new RequestBuilder(rootUrl, create.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
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

create.PATH = '/tutor/courses';
