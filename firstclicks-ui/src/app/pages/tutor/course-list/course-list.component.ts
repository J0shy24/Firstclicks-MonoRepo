import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CourseCardComponent } from '../../home/shared/course-card/course-card.component';
import { CoursePublicDto } from '../../../../services/models';
import { TutorService } from '../../../services/tutor.service';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [RouterModule, CourseCardComponent],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css',
})
export default class CourseListComponent implements OnInit {
  courses?: Array<CoursePublicDto> = [];
  private tutorService = inject(TutorService);

  ngOnInit(): void {
    this.tutorService.getListCourses().subscribe((tutorCourse) => {
      this.courses = tutorCourse;
    });
  }
}
