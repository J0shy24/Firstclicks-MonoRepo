/* tslint:disable */
/* eslint-disable */
import { StudentCourse } from '../models/student-course';
import { TechStack } from '../models/tech-stack';
import { Tutor } from '../models/tutor';
export interface Course {
  coverPath?: string;
  createdDate?: string;
  description?: string;
  enrollments?: Array<StudentCourse>;
  id?: number;
  isActive?: boolean;
  level?: 'ENTRY' | 'INTERMEDIATE' | 'ADVANCE';
  name?: string;
  techStacks?: Array<TechStack>;
  tutorId?: Tutor;
  updatedDate?: string;
}
