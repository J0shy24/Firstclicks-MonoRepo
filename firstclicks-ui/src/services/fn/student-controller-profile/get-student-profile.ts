/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { StudentPrivateProfileDto } from '../../models/student-private-profile-dto';

export interface GetStudentProfile$Params {
}

export function getStudentProfile(http: HttpClient, rootUrl: string, params?: GetStudentProfile$Params, context?: HttpContext): Observable<StrictHttpResponse<StudentPrivateProfileDto>> {
  const rb = new RequestBuilder(rootUrl, getStudentProfile.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<StudentPrivateProfileDto>;
    })
  );
}

getStudentProfile.PATH = '/student/profile';
