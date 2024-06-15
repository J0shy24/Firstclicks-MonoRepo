/* tslint:disable */
/* eslint-disable */
import { CoursePublicDto } from '../models/course-public-dto';
export interface StudentCourseDto {
  courseEnrolled: CoursePublicDto;
  id?: number;
  studentActive?: boolean;
  studentId?: number;
  studentJoinDate?: string;
  studentReview?: string;
  studentStars?: number;
}
