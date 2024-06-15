import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoursePublicDto } from '../../../../../services/models';
import { ApiImgPipe } from '../../../../shared/api-img.pipe';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule, RouterModule, ApiImgPipe],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css',
})
export class CourseCardComponent implements OnInit {
  @Input({ required: true }) course!: CoursePublicDto;
  @Input({ required: true }) linkPath!: string;

  disable = false;

  sutdentStars(i: number) {
    return new Array(i);
  }

  blankStars(i: number) {
    let rest: number = 5 - i;
    return new Array(rest);
  }

  ngOnInit(): void {
    if (this.linkPath == '') {
      this.disable = true;
    }
  }

  //studentStarsTrack = new Array(this.course.studentStars);
  // blankStars = new Array(5 - this.course.studentStars!);
}
