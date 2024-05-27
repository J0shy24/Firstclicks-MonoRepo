import { Component, OnInit, inject } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { CourseControllerService } from '../../../../services/services';
import { ActivatedRoute, RouterModule } from '@angular/router';
import {
  CoursePublicDto,
  TutorProfilePublic,
} from '../../../../services/models';
import { Get$Params } from '../../../../services/fn/tutor-course-admin-controller/get';
import { GetCourse$Params } from '../../../../services/fn/course-controller/get-course';
import { map } from 'rxjs';
import { CourseService } from '../../../services/course.service';
import { ApiImgPipe } from '../../../shared/api-img.pipe';
import { CourseCardComponent } from '../shared/course-card/course-card.component';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [CarouselModule, ApiImgPipe, RouterModule, CourseCardComponent],
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
})
export default class CourseComponent implements OnInit {
  private courseService = inject(CourseService);
  private route = inject(ActivatedRoute);

  course!: CoursePublicDto;
  randomTutor?: TutorProfilePublic[];

  ngOnInit(): void {
    const courseId = this.route.snapshot.paramMap.get('id');

    if (courseId) {
      this.courseService.getById(parseInt(courseId)).subscribe((course) => {
        this.course = course;
        this.randTutor(course.tutor?.id);
        console.log(this.course);
      });
    }
  }

  randTutor(turoId: number | undefined) {
    this.courseService.getRandomTutor(turoId || 0).subscribe((tutor) => {
      this.randomTutor = tutor;
      console.log(this.randomTutor);
    });
  }
}
