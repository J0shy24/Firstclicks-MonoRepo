/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface IdsEnrolledCourses$Params {
}

export function idsEnrolledCourses(http: HttpClient, rootUrl: string, params?: IdsEnrolledCourses$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<number>>> {
  const rb = new RequestBuilder(rootUrl, idsEnrolledCourses.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<number>>;
    })
  );
}

idsEnrolledCourses.PATH = '/student/profile/idCourses';
