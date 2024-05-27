/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { getResource } from '../fn/media-controller/get-resource';
import { GetResource$Params } from '../fn/media-controller/get-resource';
import { upload } from '../fn/media-controller/upload';
import { Upload$Params } from '../fn/media-controller/upload';
import { UploadMediaResponse } from '../models/upload-media-response';

@Injectable({ providedIn: 'root' })
export class MediaControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `upload()` */
  static readonly UploadPath = '/media/upload';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `upload()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  upload$Response(params?: Upload$Params, context?: HttpContext): Observable<StrictHttpResponse<UploadMediaResponse>> {
    return upload(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `upload$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  upload(params?: Upload$Params, context?: HttpContext): Observable<UploadMediaResponse> {
    return this.upload$Response(params, context).pipe(
      map((r: StrictHttpResponse<UploadMediaResponse>): UploadMediaResponse => r.body)
    );
  }

  /** Path part for operation `getResource()` */
  static readonly GetResourcePath = '/media/public/{filename}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getResource()` instead.
   *
   * This method doesn't expect any request body.
   */
  getResource$Response(params: GetResource$Params, context?: HttpContext): Observable<StrictHttpResponse<Blob>> {
    return getResource(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getResource$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getResource(params: GetResource$Params, context?: HttpContext): Observable<Blob> {
    return this.getResource$Response(params, context).pipe(
      map((r: StrictHttpResponse<Blob>): Blob => r.body)
    );
  }

}
