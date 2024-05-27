/* tslint:disable */
/* eslint-disable */
export interface CourseDto {
  coverPath: string;
  description: string;
  level?: 'ENTRY' | 'INTERMEDIATE' | 'ADVANCE';
  name: string;
  techStack?: Array<string>;
}
