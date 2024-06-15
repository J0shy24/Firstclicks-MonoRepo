import { Component, OnInit, inject } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ProfileService } from '../../../services/profile.service';
import {
  CoursePublicDto,
  TutorPrivateProfileDto,
} from '../../../../services/models';
import { CommonModule } from '@angular/common';
import { ApiImgPipe } from '../../../shared/api-img.pipe';

import { CourseCardComponent } from '../../home/shared/course-card/course-card.component';
import { Router, RouterModule } from '@angular/router';
import { TutorService } from '../../../services/tutor.service';
import CourseComponent from '../../home/course/course.component';

interface Course {
  id: string;
  name: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,

  imports: [
    CarouselModule,
    CommonModule,
    ApiImgPipe,
    RouterModule,
    CourseCardComponent,
    RouterModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export default class ProfileComponent {
  private tutorProfileService = inject(ProfileService);

  private courseTutorService = inject(TutorService);
  private router = inject(Router);
  tutorProfile: TutorPrivateProfileDto = {};

  courses: CoursePublicDto[] = [];
  responsiveOptions: any[] = [];
  profileHidden = true;

  ngOnInit() {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1,
      },
    ];

    this.courseTutorService.getListCourses().subscribe((courses) => {
      this.courses = courses;
    });

    this.courseTutorService.getListCourses().subscribe((courses) => {
      this.courses = courses;
    });

    this.tutorProfileService.getProfileTutor().subscribe((tutor) => {
      this.tutorProfile = tutor;
      this.tutorProfile;
    });
  }

  colorEnabled(isActive: boolean | undefined) {
    if (isActive == undefined) {
      return ' text-black hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm';
    }
    if (isActive) {
      return 'bg-info text-black hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm';
    } else {
      return 'bg-error text-black hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm';
    }
  }

  mostrarPerfil() {
    this.profileHidden = false;
  }

  ocultarPerfil() {
    this.profileHidden = true;
  }
}
