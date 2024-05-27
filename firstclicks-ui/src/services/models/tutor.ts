/* tslint:disable */
/* eslint-disable */
import { GrantedAuthority } from '../models/granted-authority';
export interface Tutor {
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
