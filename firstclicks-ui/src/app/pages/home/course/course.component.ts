import { Component, OnInit, inject } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import {
  CourseControllerService,
  StudentCourseAdminService,
} from '../../../../services/services';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
  AuthenticationRequestDto,
  CoursePublicDto,
  TutorProfilePublic,
} from '../../../../services/models';
import { Get$Params } from '../../../../services/fn/tutor-course-admin-controller/get';
import { GetCourse$Params } from '../../../../services/fn/course-controller/get-course';
import { map } from 'rxjs';
import { CourseService } from '../../../services/course.service';
import { ApiImgPipe } from '../../../shared/api-img.pipe';
import { CourseCardComponent } from '../shared/course-card/course-card.component';
import { AuthService } from '../../../services/auth.service';
import { FormsModule, NgForm } from '@angular/forms';
import { StudentService } from '../../../services/student.service';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [
    CarouselModule,
    ApiImgPipe,
    RouterModule,
    CourseCardComponent,
    FormsModule,
  ],
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
})
export default class CourseComponent implements OnInit {
  private courseService = inject(CourseService);
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private router = inject(Router);
  private studenProfile = inject(StudentService);
  private studentCourseAdmin = inject(StudentCourseAdminService);

  isClosed = false;
  errors: string[] = [];
  enrolled: number[] = [];

  authRequest: AuthenticationRequestDto = {
    userName: '',
    password: '',
  };

  clickLogin() {
    this.isClosed = true;
  }

  course!: CoursePublicDto;
  randomTutor?: TutorProfilePublic[];

  get user() {
    return this.authService.auth()?.user;
  }

  ngOnInit(): void {
    const courseId = this.route.snapshot.paramMap.get('id');

    if (courseId) {
      this.courseService.getById(parseInt(courseId)).subscribe((course) => {
        this.course = course;
        this.randTutor(course.tutor?.id);
      });
    }
  }

  randTutor(turoId: number | undefined) {
    this.courseService.getRandomTutor(turoId || 0).subscribe((tutor) => {
      this.randomTutor = tutor;
    });
  }

  login(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authService.login(this.authRequest).subscribe({
      next: (profile) => {
        this.clickLogin();
        this.router.navigate(['/student/courses/' + this.course.id]);
      },
      error: (error) => {
        if (error.error.errorCode) {
          this.errors.push('Error en el email o contraseña');
        }
      },
    });
  }

  showSuccess = false;
  showError = false;

  studentEnroll(courseId: number) {
    // this.studenProfile.getIdsCourse().subscribe((ids: number[]) => {
    //   if (ids.indexOf(courseId) != -1) {
    //     this.studentCourseAdmin.enroll({ courseId: courseId });
    //     this.showSuccess = true;
    //   } else {
    //     this.showError = true;
    //   }
    // });
    this.studentCourseAdmin.enroll({ courseId: courseId }).subscribe({
      next: () => {
        this.showSuccess = true;
      },
      error: () => {
        this.showError = true;
      },
    });
  }

  closeAlert() {
    this.showError = false;
    this.showSuccess = false;
  }

  goToCourse() {}
}
