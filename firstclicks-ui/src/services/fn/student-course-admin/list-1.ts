/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { StudentCourseDto } from '../../models/student-course-dto';

export interface List1$Params {
}

export function list1(http: HttpClient, rootUrl: string, params?: List1$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<StudentCourseDto>>> {
  const rb = new RequestBuilder(rootUrl, list1.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<StudentCourseDto>>;
    })
  );
}

list1.PATH = '/student/courses/list';
