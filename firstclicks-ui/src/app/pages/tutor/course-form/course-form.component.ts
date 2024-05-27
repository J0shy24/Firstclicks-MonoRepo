import { Component, OnInit, getPlatform, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TutorCourseAdminControllerService } from '../../../../services/services';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Course, CoursePublicDto } from '../../../../services/models';
import { CourseDto } from '../../../../services/models';
import { MediaService } from '../../../services/media.service';
import { ApiImgPipe } from '../../../shared/api-img.pipe';
import { Get$Params } from '../../../../services/fn/tutor-course-admin-controller/get';
import { CourseService } from '../../../services/course.service';
import { Observable, from } from 'rxjs';
import { Delete$Params } from '../../../../services/fn/tutor-course-admin-controller/delete';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, ApiImgPipe],
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.css',
})
export default class CourseFormComponent implements OnInit {
  private courseTutorAdmin = inject(TutorCourseAdminControllerService);
  private mediaService = inject(MediaService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private courseService = inject(CourseService);
  private fb = inject(FormBuilder);

  errors: string[] = [];
  //course?: CourseDto;
  form?: FormGroup;
  courseExists?: CoursePublicDto;

  techs: Array<string> = new Array<string>();

  createCourse: CourseDto = {
    coverPath: 'java.jpg',
    description: '',
    level: 'ENTRY',
    name: '',
    techStack: this.techs,
  };

  courseId = this.route.snapshot.paramMap.get('id');
  ngOnInit(): void {
    if (this.courseId) {
      this.courseService
        .getById(parseInt(this.courseId))
        .subscribe((course) => {
          this.courseExists = course;

          this.form = this.fb.group({
            coverPath: [course.coverPath, [Validators.required]],
            description: [course.description, [Validators.required]],
            level: [course.level, [Validators.required]],
            name: [course.name, [Validators.required]],
            techStack: [course.techStack, [Validators.required]],
          });
          console.log(this.form);
          console.log(this.form.get('techStack')?.value);
          if (Array.isArray(this.form.get('techStack')?.value)) {
            this.form.get('techStack')?.value.forEach((element: any) => {
              let item: string = element.techStack;
              this.techs.push(item);
            });
          }
        });
    } else {
      this.form = this.fb.group({
        coverPath: ['', [Validators.required]],
        description: ['', [Validators.required]],
        level: ['', [Validators.required]],
        name: ['', [Validators.required]],
        techStack: [Array<string>, [Validators.required]],
      });
    }
  }

  uploadFile(event: any, control: string) {
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      this.mediaService.upload(formData).subscribe((response) => {
        this.form!.controls[control].setValue(response.path);
      });
    }
  }

  contador = 0;
  addTechStack(techInput: string) {
    console.log(techInput);
    if (this.contador < 3) {
      this.techs.push(techInput);
      this.contador++;
    }
  }

  deleteTechStack(techInput: string) {
    const index = this.techs.indexOf(techInput);
    if (index > -1) {
      this.techs.splice(index, 1);
      this.contador--;
    }
  }

  save() {
    this.form?.get('techStack')?.setValue(this.techs);
    console.log(this.form);
    if (this.form!.invalid) {
      this.form!.markAllAsTouched();
      return;
    }

    let request: Observable<Course>;

    if (this.courseExists) {
      let id = parseInt(this.courseId || '0');
      request = this.courseTutorAdmin.update({
        id: id,
        body: this.form!.value,
      });
    } else {
      request = this.courseTutorAdmin.create({ body: this.form!.value });
    }
    request.subscribe({
      next: (course) => {
        this.router.navigate(['/tutor/courses']);
      },
      error: (error) => {
        this.errors = error.error.errors;
      },
    });
  }

  deleteCourse() {
    if (this.courseExists) {
      let courseId: Delete$Params = {
        id: this.courseExists.id || 0,
      };
      this.courseTutorAdmin.delete(courseId).subscribe({
        next: (course) => {
          this.router.navigate(['/tutor/courses']);
        },
      });
    }
  }
  // create(form: NgForm) {
  //   if (form.value.techStack1 != '') {
  //     this.techs.push(form.value.techStack1);
  //   }
  //   if (form.value.techStack2 != '') {
  //     this.techs.push(form.value.techStack1);
  //   }
  //   if (form.value.techStack3 != '') {
  //     this.techs.push(form.value.techStack1);
  //   }
  //   console.log(this.createCourse);
  //   this.courseTutorAdmin
  //     .create({
  //       body: this.createCourse,
  //     })
  //     .subscribe({
  //       next: () => {
  //         this.router.navigate(['/courses']);
  //       },
  //       error: (err) => {
  //         this.errors = err.error.validationErrors;
  //       },
  //     });
  // }
}
