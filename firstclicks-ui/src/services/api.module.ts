/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { TutorCourseAdminControllerService } from './services/tutor-course-admin-controller.service';
import { StudentCourseAdminService } from './services/student-course-admin.service';
import { MediaControllerService } from './services/media-controller.service';
import { AuthenticationService } from './services/authentication.service';
import { TutorProfileControllerService } from './services/tutor-profile-controller.service';
import { StudentControllerProfileService } from './services/student-controller-profile.service';
import { PublicControllerProfileService } from './services/public-controller-profile.service';
import { CourseControllerService } from './services/course-controller.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    TutorCourseAdminControllerService,
    StudentCourseAdminService,
    MediaControllerService,
    AuthenticationService,
    TutorProfileControllerService,
    StudentControllerProfileService,
    PublicControllerProfileService,
    CourseControllerService,
    ApiConfiguration
  ],
})
export class ApiModule {
  static forRoot(params: ApiConfigurationParams): ModuleWithProviders<ApiModule> {
    return {
      ngModule: ApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: params
        }
      ]
    }
  }

  constructor( 
    @Optional() @SkipSelf() parentModule: ApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}
