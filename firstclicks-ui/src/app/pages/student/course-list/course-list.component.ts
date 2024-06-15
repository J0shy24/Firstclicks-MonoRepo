import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CourseCardComponent } from '../../home/shared/course-card/course-card.component';
import { CoursePublicDto, StudentCourseDto } from '../../../../services/models';
import { StudentService } from '../../../services/student.service';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [RouterModule, CourseCardComponent],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css',
})
export default class CourseListComponent implements OnInit {
  private studentService = inject(StudentService);

  studentCourses?: Array<StudentCourseDto> = [];

  ngOnInit(): void {
    this.studentService
      .getListCourses()
      .subscribe((courses: StudentCourseDto[]) => {
        this.studentCourses = courses;
        // this.studentCourses.forEach((student) => {
        //   this.courses?.push(student.courseEnrolled);
        // });
      });
  }
}
