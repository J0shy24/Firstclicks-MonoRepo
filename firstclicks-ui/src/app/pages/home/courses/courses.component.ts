import { Component, OnInit, inject } from '@angular/core';
import { CoursePublicDto, Pageable } from '../../../../services/models';
import { CourseControllerService } from '../../../../services/services';
import { Paginate1$Params } from '../../../../services/fn/course-controller/paginate-1';
import { Observable, Observer } from 'rxjs';
import { CourseService } from '../../../services/course.service';
import { CourseCardComponent } from '../shared/course-card/course-card.component';
import { RouterModule } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CourseCardComponent, RouterModule, InfiniteScrollModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css',
})
export default class CoursesComponent implements OnInit {
  // private courseOpenAPI = inject(CourseControllerService);
  private courseService = inject(CourseService);

  courses2?: Array<CoursePublicDto> = [];
  page?: number = 0;
  last?: Boolean = false;

  ngOnInit(): void {
    // this.courseService.getLastCourses().subscribe((courses) => {
    //   this.courses = courses;
    //   console.log(this.courses);
    // });

    this.courseService.paginate().subscribe((coursePage) => {
      this.courses2 = coursePage.content;
      this.page = coursePage.number;
      this.last = coursePage.last;
      console.log(coursePage.content);
    });
  }

  loadMoreCourses() {
    if (this.last) {
      return;
    }

    if (this.page != undefined) {
      this.courseService.paginate(6, this.page + 1).subscribe((coursePage) => {
        if (coursePage.content != undefined && this.courses2 != undefined) {
          this.courses2.push(...coursePage.content);
        }
        this.page = coursePage.number;
        this.last = coursePage.last;
      });
    }
  }
}
