import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CourseService } from '../../../services/course.service';
import { ApiImgPipe } from '../../../shared/api-img.pipe';
import { CoursePublicDto } from '../../../../services/models';
import { CourseCardComponent } from '../../home/shared/course-card/course-card.component';
import { RatingModule } from 'primeng/rating';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { StudentCourseAdminService } from '../../../../services/services';
import { StudentService } from '../../../services/student.service';

@Component({
  selector: 'app-course-enrolled',
  standalone: true,
  imports: [
    RouterModule,
    ApiImgPipe,
    CourseCardComponent,
    RatingModule,
    ReactiveFormsModule,
  ],
  templateUrl: './course-enrolled.component.html',
  styleUrl: './course-enrolled.component.css',
})
export default class CourseEnrolledComponent implements OnInit {
  private studentCourseService = inject(StudentService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private studentAdminCourse = inject(StudentCourseAdminService);

  courseEnrolled!: CoursePublicDto;
  errors: string[] = [];

  form = this.fb.group({
    studentReview: ['', [Validators.required, Validators.maxLength(150)]],
    studentStars: [0, [Validators.required]],
  });

  courseId = this.route.snapshot.paramMap.get('id');
  ngOnInit(): void {
    if (this.courseId) {
      this.studentCourseService
        .getStudentCourseById(parseInt(this.courseId))
        .subscribe((course) => {
          this.courseEnrolled = course.courseEnrolled;
        });
    }
  }

  save() {
    if (this.form!.invalid) {
      return;
    }

    if (this.courseEnrolled) {
      const formValue = this.form!.value;
      this.studentAdminCourse
        .review({
          studentCourseId: parseInt(this.courseId || ''),
          body: formValue,
        })
        .subscribe({
          next: () => this.router.navigate(['/student/courses']),
          error: (error) => {
            this.errors = error.error.errors;
          },
        });
    }
  }
}
