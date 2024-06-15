import { Component, OnInit, inject } from '@angular/core';
import { CourseService } from '../../../services/course.service';
import { ActivatedRoute } from '@angular/router';
import { CourseCardComponent } from '../shared/course-card/course-card.component';
import {
  CoursePublicDto,
  TutorProfilePublic,
} from '../../../../services/models';
import { ApiImgPipe } from '../../../shared/api-img.pipe';

@Component({
  selector: 'app-tutor-courses-public',
  standalone: true,
  imports: [CourseCardComponent, ApiImgPipe],
  templateUrl: './tutor-courses-public.component.html',
  styleUrl: './tutor-courses-public.component.css',
})
export default class TutorCoursesPublicComponent implements OnInit {
  private courseService = inject(CourseService);
  private route = inject(ActivatedRoute);

  courses: Array<CoursePublicDto> = [];
  tutorProfile?: TutorProfilePublic;

  ngOnInit(): void {
    const tutorId = this.route.snapshot.paramMap.get('tutorId');

    if (tutorId) {
      this.courseService
        .getCoursesByTutorId(parseInt(tutorId))
        .subscribe((courses) => {
          this.courses = courses;
        });

      this.courseService
        .getTutorPublicProfile(parseInt(tutorId))
        .subscribe((tutor) => {
          this.tutorProfile = tutor;
        });
    }
  }
}
