/* tslint:disable */
/* eslint-disable */
import { TechStack } from '../models/tech-stack';
import { TutorProfilePublic } from '../models/tutor-profile-public';
export interface CoursePublicDto {
  coverPath?: string;
  createdDate?: string;
  description?: string;
  id?: number;
  level?: 'ENTRY' | 'INTERMEDIATE' | 'ADVANCE';
  name?: string;
  studentReview?: Array<string>;
  studentStars?: number;
  techStack?: Array<TechStack>;
  tutor?: TutorProfilePublic;
  updatedDate?: string;
}
