/* tslint:disable */
/* eslint-disable */
import { GrantedAuthority } from '../models/granted-authority';
import { StudentCourse } from '../models/student-course';
export interface Student {
  accountLocked?: boolean;
  accountNonExpired?: boolean;
  accountNonLocked?: boolean;
  address?: string;
  authorities?: Array<GrantedAuthority>;
  credentialsNonExpired?: boolean;
  dateOfBirth?: string;
  description?: string;
  email?: string;
  enabled?: boolean;
  enrollments?: Array<StudentCourse>;
  firstName?: string;
  fullName?: string;
  gender?: string;
  id?: number;
  lastName?: string;
  lastSession?: string;
  name?: string;
  password?: string;
  photoRoute?: string;
  username?: string;
}
