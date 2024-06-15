/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { StudentCourseDto } from '../../models/student-course-dto';

export interface GetStudentCourseById$Params {
  studentCourseId: number;
}

export function getStudentCourseById(http: HttpClient, rootUrl: string, params: GetStudentCourseById$Params, context?: HttpContext): Observable<StrictHttpResponse<StudentCourseDto>> {
  const rb = new RequestBuilder(rootUrl, getStudentCourseById.PATH, 'get');
  if (params) {
    rb.path('studentCourseId', params.studentCourseId, {});
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

getStudentCourseById.PATH = '/student/courses/{studentCourseId}';
