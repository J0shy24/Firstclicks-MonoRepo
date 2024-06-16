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
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, ApiImgPipe, CommonModule],
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
  contador = 0;
  maxTechStack = true;
  emptyTechStack = true;

  noChange = true;

  createCourse: CourseDto = {
    coverPath: '',
    description: '',
    level: undefined,
    name: '',
    techStack: this.techs,
  };

  courseId = this.route.snapshot.paramMap.get('id');
  imageUrl: string | ArrayBuffer | null = null;

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

          if (Array.isArray(this.form.get('techStack')?.value)) {
            this.form.get('techStack')?.value.forEach((element: any) => {
              let item: string = element.techStack;
              this.techs.push(item);
            });
            this.contador = this.techs.length;
          }
        });
    } else {
      this.form = this.fb.group({
        coverPath: ['Default_Course.jpg', [Validators.required]],
        description: ['', [Validators.required]],
        level: ['', [Validators.required]],
        name: ['', [Validators.required]],
        techStack: [Array<string>, [Validators.required]],
      });
    }
  }

  // uploadFile(event: any, control: string) {
  //   const file = event.target.files[0];

  //   if (file) {
  //     const formData = new FormData();
  //     formData.append('file', file);

  //     this.mediaService.upload(formData).subscribe((response) => {
  //       this.form!.controls[control].setValue(response.path);
  //     });
  //   }
  // }

  //Guarda la imagen y hace una vista previa

  uploadFile(event: any, control: string) {
    this.noChange = false;
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      // Mostrar la vista previa de la imagen
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
      reader.readAsDataURL(file);

      // Subir la imagen al servidor
      this.mediaService.upload(formData).subscribe((response) => {
        this.form!.controls[control].setValue(response.path);
      });
    }
  }

  addTechStack(techInput: HTMLInputElement) {
    this.emptyTechStack = true;
    this.maxTechStack = true;

    if (techInput.value == '') {
      this.emptyTechStack = false;
      return;
    }

    if (this.contador < 3) {
      this.techs.push(techInput.value);
      techInput.value = '';
      this.contador++;
    } else {
      this.maxTechStack = false;
    }
  }

  deleteTechStack(techInput: string) {
    const index = this.techs.indexOf(techInput);
    if (index > -1) {
      this.techs.splice(index, 1);
      this.contador--;
      this.maxTechStack = true;
    }
  }

  save() {
    this.form?.get('techStack')?.setValue(this.techs);

    if (this.form!.invalid) {
      if (this.form?.get('techStack')?.status == 'INVALID') {
        this.errors.push('Debe de introducir al menos una tecnología');
      }

      if (this.form?.get('level')?.status == 'INVALID') {
        this.errors.push('Debe seleccionar un Nivel');
      }

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
  //   (this.createCourse);
  //   (this.createCourse);
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
