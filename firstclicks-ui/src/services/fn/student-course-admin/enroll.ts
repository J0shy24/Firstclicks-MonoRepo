/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { StudentCourseDto } from '../../models/student-course-dto';

export interface Enroll$Params {
  courseId: number;
}

export function enroll(http: HttpClient, rootUrl: string, params: Enroll$Params, context?: HttpContext): Observable<StrictHttpResponse<StudentCourseDto>> {
  const rb = new RequestBuilder(rootUrl, enroll.PATH, 'post');
  if (params) {
    rb.path('courseId', params.courseId, {});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<StudentCourseDto>;
    })
  );
}

enroll.PATH = '/student/courses/enroll/{courseId}';
