/* tslint:disable */
/* eslint-disable */
import { Course } from '../models/course';
import { Student } from '../models/student';
export interface StudentCourse {
  course?: Course;
  id?: number;
  student?: Student;
  studentActive?: boolean;
  studentJoinDate?: string;
  studentReview?: string;
  studentStars?: number;
}
