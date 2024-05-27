/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { UploadMediaResponse } from '../../models/upload-media-response';

export interface Upload$Params {
      body?: {
'file': Blob;
}
}

export function upload(http: HttpClient, rootUrl: string, params?: Upload$Params, context?: HttpContext): Observable<StrictHttpResponse<UploadMediaResponse>> {
  const rb = new RequestBuilder(rootUrl, upload.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<UploadMediaResponse>;
    })
  );
}

upload.PATH = '/media/upload';
