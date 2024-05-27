import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { UploadResponse } from '../interfaces/media.interface';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  private http = inject(HttpClient);

  upload(formData: FormData) {
    return this.http.post<UploadResponse>(`${environment.apiBase}/media/upload`, formData);
  }

}
