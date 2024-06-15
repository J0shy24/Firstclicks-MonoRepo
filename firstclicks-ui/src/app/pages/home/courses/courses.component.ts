import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { CoursePublicDto, Pageable } from '../../../../services/models';
import { CourseControllerService } from '../../../../services/services';
import { Paginate1$Params } from '../../../../services/fn/course-controller/paginate-1';
import { Observable, Observer } from 'rxjs';
import { CourseService } from '../../../services/course.service';
import { CourseCardComponent } from '../shared/course-card/course-card.component';
import { RouterModule } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    CourseCardComponent,
    RouterModule,
    InfiniteScrollModule,
    FormsModule,
    CommonModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css',
})
export default class CoursesComponent implements OnInit, AfterViewInit {
  @ViewChild('search') searchBar: ElementRef | undefined;
  // private courseOpenAPI = inject(CourseControllerService);
  private courseService = inject(CourseService);

  courses2?: Array<CoursePublicDto> = [];
  page?: number = 0;
  last?: Boolean = false;
  techPass: string = '';
  filterEnable: boolean = false;

  defaultFilter: string = 'tech';
  defaultOrder: string = 'updatedDate';
  defaultSearch: string = '';

  isSmallScreen = false;

  // Cambio de diseño en la portada dependiendo de tamaño de la pantalla
  constructor() {
    // Detectar el tamaño de la pantalla
    this.isSmallScreen = window.innerWidth <= 1272;
    window.addEventListener('resize', () => {
      this.isSmallScreen = window.innerWidth <= 1272;
      this.isSmallScreen = window.innerWidth <= 1272;
    });
  }

  ngOnInit(): void {
    // this.courseService.getLastCourses().subscribe((courses) => {
    //   this.courses = courses;
    //   (this.courses);
    //   (this.courses);
    // });
    this.courseService.getTech.subscribe((tech) => (this.defaultSearch = tech));

    if (this.defaultSearch != '') {
      this.buscar(this.defaultFilter, this.defaultSearch, this.defaultOrder);
      this.filterEnable = true;
    } else {
      this.courseService.paginate().subscribe((coursePage) => {
        this.courses2 = coursePage.content;
        this.page = coursePage.number;
        this.last = coursePage.last;
      });
    }
  }

  ngAfterViewInit(): void {
    this.searchBar!.nativeElement.value = this.defaultSearch;
  }

  loadMoreCourses() {
    if (this.last) {
      return;
    }

    if (this.filterEnable && this.page != undefined) {
      this.courseService
        .paginateByFilter(
          6,
          this.page + 1,
          this.defaultFilter,
          this.defaultSearch,
          this.defaultOrder
        )
        .subscribe((coursePage) => {
          if (coursePage.content != undefined && this.courses2 != undefined) {
            this.courses2.push(...coursePage.content);
          }
          this.page = coursePage.number;
          this.last = coursePage.last;
        });
    } else {
      if (this.page != undefined) {
        this.courseService
          .paginate(6, this.page + 1, this.defaultOrder)
          .subscribe((coursePage) => {
            if (coursePage.content != undefined && this.courses2 != undefined) {
              this.courses2.push(...coursePage.content);
            }
            this.page = coursePage.number;
            this.last = coursePage.last;
          });
      }
    }
  }

  buscar(filter: string, search: string, order: string) {
    if (search == '') {
      this.filterEnable = false;
      this.courses2 = undefined;
      this.defaultOrder = order;
      this.defaultSearch = '';
      this.page = 0;
      this.last = false;
      return this.ngOnInit();
    }

    this.defaultFilter = filter;
    this.defaultSearch = search;
    this.defaultOrder = order;
    this.courses2 = undefined;
    this.filterEnable = true;

    this.courseService
      .paginateByFilter(6, 0, filter, search, order)
      .subscribe((course) => {
        this.courses2 = course.content;
        this.page = course.number;
        this.last = course.last;
      });
  }
}
