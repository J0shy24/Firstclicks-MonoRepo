/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { StudentCourseDto } from '../../models/student-course-dto';
import { StudentReviewDto } from '../../models/student-review-dto';

export interface Review$Params {
  studentCourseId: number;
      body: StudentReviewDto
}

export function review(http: HttpClient, rootUrl: string, params: Review$Params, context?: HttpContext): Observable<StrictHttpResponse<StudentCourseDto>> {
  const rb = new RequestBuilder(rootUrl, review.PATH, 'put');
  if (params) {
    rb.path('studentCourseId', params.studentCourseId, {});
    rb.body(params.body, 'application/json');
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

review.PATH = '/student/courses/{studentCourseId}';
