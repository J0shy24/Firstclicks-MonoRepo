/* tslint:disable */
/* eslint-disable */
import { CoursePublicDto } from '../models/course-public-dto';
import { PageableObject } from '../models/pageable-object';
import { SortObject } from '../models/sort-object';
export interface PageCoursePublicDto {
  content?: Array<CoursePublicDto>;
  empty?: boolean;
  first?: boolean;
  last?: boolean;
  number?: number;
  numberOfElements?: number;
  pageable?: PageableObject;
  size?: number;
  sort?: SortObject;
  totalElements?: number;
  totalPages?: number;
}
